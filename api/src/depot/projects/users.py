from ..mongo.projects import User, UserProject, Timesheet


class UsersDepot(object):

    @classmethod
    def update_user(cls, organization_xid, user_xid, data):
        xid = User.update_user(organization_xid, user_xid, data)
        return xid  
    
    @classmethod
    def select_user(cls, organization_xid, user_xid):
        data = User.select_user(organization_xid, user_xid)
        return data or {}

    @classmethod
    def select_all_users(cls, organization_xid):
        data = User.select_all_users(organization_xid)
        return data or {}

    @classmethod
    def delete_user(cls, organization_xid, user_xid):
        User.delete_user(organization_xid, user_xid)
    
    @classmethod
    def add_user_to_project(cls, organization_xid, user_xid, project_xid):
        UserProject.create_user_project(organization_xid, user_xid, project_xid)

    @classmethod
    def add_timesheet_entry(cls, organization_xid, user_xid, project_xid, data):
        Timesheet.create_timesheet(organization_xid, user_xid, project_xid, data)

    @classmethod
    def remove_timesheet_entry(cls, organization_xid, timesheet_xid):
        Timesheet.delete_timesheet(organization_xid, timesheet_xid)