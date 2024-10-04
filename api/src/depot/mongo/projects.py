import os 
import datetime
import pymongo
from pymongo import MongoClient
from flask import current_app

from src import mongo

from .base import TableEnum, mongo_db
from .mixin import BaseMixin


import bcrypt

def hash_password(password):
    password_bytes = password.encode('utf-8')
    
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password_bytes, salt)
    
    return hashed_password


def verify_password(stored_hash, input_password):
    return bcrypt.checkpw(input_password.encode('utf-8'), stored_hash)


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
# Used for running transactions across multiple tables 
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
_client = None
class UserTransaction():

    @classmethod
    def transfer_balance(cls, organization_xid, user_xid, beneficiary_xid, amount, fees):
        
        def callback(
            session,
            organization_xid=None, 
            user_xid=None, 
            beneficiary_xid=None, 
            amount=None,
            fees=None,
        ):
            db_name = os.environ.get('MONGO_DB', 'skeleton-dev')
            tus_coll = session.client.get_database(db_name).topup_user_state
            b_coll = session.client.get_database(db_name).topup_beneficiary

            resp = tus_coll.update_one(
                {
                    "organization_xid": organization_xid,
                    "user_xid": user_xid,
                },
                {
                    "$inc": {"data.balance": -(amount+fees)},
                },
                session=session,
                upsert=True,
            )

            b_coll.update_one(
                {
                    "organization_xid": organization_xid,
                    "user_xid": user_xid,
                    "xid": beneficiary_xid,
                },
                {
                    "$inc": {"data.balance": amount},
                },
                session=session,
                upsert=True,
            )
            return

        def callback_wrapper(s):
            callback(
                s,
                organization_xid=organization_xid, 
                user_xid=user_xid, 
                beneficiary_xid=beneficiary_xid, 
                amount=amount,
                fees=fees,
            )

        global _client
        if not _client:
            _client = MongoClient(current_app.config["MONGO_URI"])
        with _client.start_session() as session:
            session.with_transaction(callback_wrapper)


class User(BaseMixin):

    pattern = 'xxxx_xxxxxxxx'

    _table_name = TableEnum.PROJECTS_USER.name

    @classmethod
    def indexes_create(cls):
        mongo_db(cls._table_name).create_index([
            ('organization_xid', pymongo.ASCENDING),
        ], name='oxid_1')

    @classmethod
    def update_user(cls, organization_xid, user_xid, data):
        search_criteria = {
            'organization_xid': organization_xid,
        }
        user_xid = data['user_xid'] if 'user_xid' in data else user_xid
        if not user_xid:
            search_criteria.update(cls._gen_insert_base())
        
        if 'password' in data:
            data['password'] = hash_password(data['password'])
        
        keys = 'first_name', 'last_name', 'dob', 'gender', 'email', 'password'
        updated_data = {k: data.get(k, None) for k in keys}
        update = {"$set": updated_data,}

        mongo_db(cls._table_name).update_one(search_criteria, update, upsert=True)

    @classmethod
    def delete_user(cls, organization_xid, user_xid):
        search_criteria = {
            'organization_xid': organization_xid,
            'xid': user_xid,
        }
        update = {
            "$set": {"data": {}},
        }
        mongo_db(cls._table_name).update_one(search_criteria, update)

    @classmethod
    def select_user(cls, organization_xid, user_xid):
        search_criteria = {
            'organization_xid': organization_xid, 
            'xid': user_xid,
        }
     
        results = [a for a in mongo_db(cls._table_name).find(search_criteria, {"_id": 0})]
        return results[0] if results else None

    @classmethod
    def select_all_users(cls, organization_xid, search_dict=None):
        search_criteria = {
            'organization_xid': organization_xid, 
        }

        for k,v in search_dict:
            search_criteria[k] = search_dict[v]

        results = [a for a in mongo_db(cls._table_name).find(search_criteria, {"_id": 0})]
        return results


class Project(BaseMixin):

    pattern = 'xxxx_xxxx_xxxx'

    _table_name = TableEnum.PROJECTS_PROJECT.name

    @classmethod
    def indexes_create(cls):
        mongo_db(cls._table_name).create_index([
            ('organization_xid', pymongo.ASCENDING),
        ], name='oxid_1')

    @classmethod
    def update_project(cls, organization_xid, project_xid, data):
        search_criteria = {
            'organization_xid': organization_xid,
            'xid': project_xid,
        }
        if not project_xid:
            search_criteria.update(cls._gen_insert_base())

        keys = 'name', 'department', 'start_date', "end_date", 'status'
        updated_data = {k: data.get(k, None) for k in keys}
        update = {"$set": updated_data,}

        mongo_db(cls._table_name).update_one(search_criteria, update, upsert=True)

    @classmethod
    def delete_project(cls, organization_xid, user_xid):
        search_criteria = {
            'organization_xid': organization_xid,
            'xid': user_xid,
        }
        update = {
            "$set": {"data": {}},
        }
        mongo_db(cls._table_name).update_one(search_criteria, update)

    @classmethod
    def select_project(cls, organization_xid, user_xid):
        search_criteria = {
            'organization_xid': organization_xid, 
            'xid': user_xid,
        }
     
        results = [a for a in mongo_db(cls._table_name).find(search_criteria, {"_id": 0})]
        return results[0] if results else None

    @classmethod
    def select_all_projects(cls, organization_xid, search_dict=None):
        search_criteria = {
            'organization_xid': organization_xid, 
        }

        for k,v in search_dict:
            search_criteria[k] = search_dict[v]

        results = [a for a in mongo_db(cls._table_name).find(search_criteria, {"_id": 0})]
        return results


class UserProject(BaseMixin):

    pattern = 'xxxx_xxxx_xxxx_xxxx_xxxx_xxxx'

    _table_name = TableEnum.PROJECTS_USER_PROJECT.name

    @classmethod
    def indexes_create(cls):
        mongo_db(cls._table_name).create_index([
            ('organization_xid', pymongo.ASCENDING),
            ('user_xid', pymongo.ASCENDING),
            ('project_xid', pymongo.ASCENDING),
        ], name='oxid_u_p_1')

    @classmethod
    def create_user_project(cls, organization_xid, user_xid, project_xid):

        insert_data = cls._gen_insert_base()
        insert_data.update({
            'organization_xid': organization_xid,
            'user_xid': user_xid,
            'project_xid': project_xid,
        })

        mongo_db(cls._table_name).insert_one(insert_data)
        return insert_data['xid']

    @classmethod
    def select_projects_for_user(cls, organization_xid, user_xid):
        search_criteria = {
            'organization_xid': organization_xid, 
            'user_xid': user_xid,
        }
        results = [a for a in mongo_db(cls._table_name).find(search_criteria, {"_id": 0})]
        return results
    
    @classmethod
    def select_users_for_project(cls, organization_xid, project_xid):
        search_criteria = {
            'organization_xid': organization_xid, 
            'project_xid': project_xid,
        }
        results = [a for a in mongo_db(cls._table_name).find(search_criteria, {"_id": 0})]
        return results


class Timesheet(BaseMixin):

    pattern = 'xxxx_xxxx_xxxx_xxxx_xxxx'

    _table_name = TableEnum.PROJECTS_TIMESHEET.name

    @classmethod
    def indexes_create(cls):
        mongo_db(cls._table_name).create_index([
            ('organization_xid', pymongo.ASCENDING),
            ('user_xid', pymongo.ASCENDING),
            ('project_xid', pymongo.ASCENDING),
        ], name='oxid_u_p_1')

    @classmethod
    def create_timesheet(cls, organization_xid, user_xid, project_xid, data):

        insert_data = cls._gen_insert_base()
        insert_data.update({
            'organization_xid': organization_xid,
            'user_xid': user_xid,
            'project_xid': project_xid,
        })

        keys = 'task_name', 'date', 'hours'
        for k in keys:
            insert_data[k] = data.get(k, None)

        mongo_db(cls._table_name).insert_one(insert_data)
        return insert_data['xid']
    
    @classmethod
    def delete_timesheet(cls, organization_xid, timesheet_xid):
        search_criteria = {
            'organization_xid': organization_xid, 
            'xid': timesheet_xid,
        }
        return mongo_db(cls._table_name).delete_many(search_criteria)
