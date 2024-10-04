from src.depot.projects.users import UsersDepot


class UserLogic(object):
    
    @classmethod
    def delete_user(cls, organization_xid, user_xid):
        payload = UsersDepot.delete_user(organization_xid, user_xid)
        return payload

    @classmethod
    def fetch_all_users(cls, organization_xid):
        payload = UsersDepot.select_all_users(organization_xid)
        return payload

    @classmethod
    def fetch_user_details(cls, organization_xid, user_xid):
        payload = UsersDepot.select_user(organization_xid, user_xid)
        return payload

    @classmethod
    def update_user_details(cls, organization_xid, user_xid, data):
        payload = UsersDepot.update_user(organization_xid, user_xid, data)
        return payload
    
    @classmethod
    def add_timesheet_entry(cls, organization_xid, user_xid, project_xid, data):
        return UsersDepot.add_timesheet_entry(organization_xid, user_xid, project_xid, data)
