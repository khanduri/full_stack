from flask import request

from src import projects_api_v1_bp
from src.helpers import api_response
from src.helpers.constants import Reason
from src.helpers.token_auth import user_auth_token_required
from src.micro_services.projects import logic


##################################################################
# REST: Timesheet API
##################################################################
@projects_api_v1_bp.route('/users/<user_xid>/timesheets', methods=['GET'])
@user_auth_token_required
def get_user_timesheets(payload, user_xid):
    organization_xid = payload['organization_xid']

    payload = logic.UserLogic.fetch_all_timesheets(organization_xid, user_xid)
    
    return api_response.return_packet_success(payload)


@projects_api_v1_bp.route('/projects/<project_xid>/timesheets', methods=['GET'])
@user_auth_token_required
def get_project_timesheets(payload, project_xid):
    organization_xid = payload['organization_xid']

    payload = logic.ProjectLogic.fetch_all_timesheets(organization_xid, project_xid)
    
    return api_response.return_packet_success(payload)


@projects_api_v1_bp.route('/users/<user_xid>/projects/<project_xid>/timesheets', methods=['POST'])
@user_auth_token_required
def post_timesheet(payload, user_xid, project_xid):
    organization_xid = payload['organization_xid']

    data = request.json['data']

    payload = logic.UserLogic.add_timesheet_entry(organization_xid, user_xid, project_xid, data)

    return api_response.return_packet_success(payload)
