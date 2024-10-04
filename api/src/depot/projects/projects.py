from ..mongo.projects import Project, UserProject


class ProjectsDepot(object):

    @classmethod
    def update_project(cls, organization_xid, project_xid, data):
        xid = Project.update_project(organization_xid, project_xid, data)
        return xid  
    
    @classmethod
    def select_project(cls, organization_xid, user_xid):
        data = Project.select_project(organization_xid, user_xid)
        return data or {}

    @classmethod
    def select_all_projects(cls, organization_xid):
        data = Project.select_all_projects(organization_xid)
        return data or {}

    @classmethod
    def delete_project(cls, organization_xid, user_xid):
        Project.delete_project(organization_xid, user_xid)
    
    @classmethod
    def add_user_to_project(cls, organization_xid, user_xid, project_xid):
        UserProject.create_user_project(organization_xid, user_xid, project_xid)
