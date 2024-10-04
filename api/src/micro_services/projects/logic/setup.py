from faker import Faker
import random

fake = Faker()


class SetupLogic(object):

    @classmethod
    def run_clean_slate(cls, organization_xid, user_xid):
        cls.run_full_reset(organization_xid, user_xid)

    @classmethod
    def run_full_reset(cls, organization_xid, user_xid):
        pass
    
    @classmethod
    def run_bootstrap(cls, organization_xid, user_xid):
        cls.run_full_reset(organization_xid, user_xid)

        users = cls.generate_users(157)
        print("---- COMPLETE Users")
        projects = cls.generate_projects(72)
        print("---- COMPLETE projects")
        timesheets = cls.generate_timesheets(users, 5)
        print("---- COMPLETE timesheet")

        data = {
            'users': users,
            'projects': projects,
            'timesheets': timesheets,
        }
        return data

    @classmethod
    def generate_users(cls, num):
        users = []
        for _ in range(num):
            user = {
                # 'first_name': fake.first_name(),
                # 'last_name': fake.last_name(),
                # 'date_of_birth': fake.date_of_birth(minimum_age=18, maximum_age=65).isoformat(),
                # 'gender': random.choice(['Male', 'Female']),
                # 'email': fake.email(),
                'profile': fake.profile(),
            }
            users.append(user)
        return users

    @classmethod
    def generate_projects(cls, num):
        projects = []
        for _ in range(num):
            project = {
                'department': fake.bs(),
                'name': fake.catch_phrase(),
                'primary_office': fake.location_on_land(),
                'primary_contact': fake.basic_phone_number(),
                'start_date': fake.date_between(start_date='-2y', end_date='today').isoformat(),
                'end_date': fake.date_between(start_date='today', end_date='+2y').isoformat(),
                'status': random.choice(['Not Started', 'In Progress', 'Completed', 'On Hold']),
            }
            projects.append(project)
        return projects

    @classmethod
    def generate_timesheets(cls, users, num_per_user):
        timesheets = []
        for user in users:
            for _ in range(num_per_user):
                timesheet = {
                    'user_email': user['profile']['mail'],
                    'task_name': fake.sentence(nb_words=4),
                    'date': fake.date_this_year().isoformat(),
                    'hours': random.randint(1, 8),  # Random hours between 1 and 8
                }
                timesheets.append(timesheet)
        return timesheets
