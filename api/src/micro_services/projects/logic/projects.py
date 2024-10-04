from src.depot.projects.projects import ProjectsDepot


class ProjectLogic(object):
    
    @classmethod
    def delete_project(cls, organization_xid, project_xid):
        payload = ProjectsDepot.delete_project(organization_xid, project_xid)
        return payload

    @classmethod
    def fetch_all_projects(cls, organization_xid):
        payload = ProjectsDepot.select_all_projects(organization_xid)
        return payload

    @classmethod
    def fetch_project_details(cls, organization_xid, project_xid):
        payload = ProjectsDepot.select_project(organization_xid, project_xid)
        return payload

    @classmethod
    def update_project_details(cls, organization_xid, project_xid, data):
        payload = ProjectsDepot.update_project(organization_xid, project_xid, data)
        return payload
