from flask import request

from src import projects_api_v1_bp
from src.helpers import api_response
from src.helpers.constants import Reason
from src.helpers.token_auth import user_auth_token_required
from src.micro_services.projects import logic


##################################################################
# REST: Projects
#
# Create: POST /api/{model_name}, you should pass the data of that model.
# Read a record: GET /api/{model_name}/{id}, it brings all the data from the select record.
# Read all records: GET /api/{model_name}, it brings all the records of that model
# Update: PUT /api/{model_name}/{id}, it updates the record, you should pass the record id and updated data.
# Delete: DELETE /api/{model_name}/{id}, you should pass the id of the record you need to delete, it should delete the timesheets records related to him.
#
##################################################################
@projects_api_v1_bp.route('/projects', methods=['POST'])
@user_auth_token_required
def post_project_details(payload):
    organization_xid = payload['organization_xid']
    # project_xid = payload['project_xid']

    data = request.json['data']

    project_xid = logic.ProjectLogic.update_project_details(organization_xid, None, data)
    payload = logic.ProjectLogic.fetch_project_details(organization_xid, project_xid)
    
    return api_response.return_packet_success(payload)


@projects_api_v1_bp.route('/projects', methods=['GET'])
@user_auth_token_required
def get_projects(payload):
    organization_xid = payload['organization_xid']
    # project_xid = payload['project_xid']
    
    payload = logic.ProjectLogic.fetch_all_projects(organization_xid)

    return api_response.return_packet_success(payload)


@projects_api_v1_bp.route('/projects/<project_xid>', methods=['GET'])
@user_auth_token_required
def get_single_project(payload, project_xid):
    organization_xid = payload['organization_xid']
    # project_xid = payload['project_xid']
        
    payload = logic.ProjectLogic.fetch_project_details(organization_xid, project_xid)

    return api_response.return_packet_success(payload)


@projects_api_v1_bp.route('/projects/<project_xid>', methods=['POST'])
@user_auth_token_required
def post_project_update(payload, project_xid):
    organization_xid = payload['organization_xid']
    # project_xid = payload['project_xid']
    
    data = request.json['data']

    payload = logic.ProjectLogic.update_project_details(organization_xid, project_xid, data)
    return api_response.return_packet_success(payload)


@projects_api_v1_bp.route('/projects/<project_xid>', methods=['DELETE'])
@user_auth_token_required
def delete_project(payload, project_xid):
    organization_xid = payload['organization_xid']
    # project_xid = payload['project_xid']
    
    payload = logic.ProjectLogic.delete_project(organization_xid, project_xid)
    return api_response.return_packet_success(payload)
