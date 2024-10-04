from flask import request

from src import projects_api_v1_bp
from src.helpers import api_response
from src.helpers.constants import Reason
from src.helpers.token_auth import user_auth_token_required
from src.micro_services.projects import logic


##################################################################
# REST: User
#
# Create: POST /api/{model_name}, you should pass the data of that model.
# Read a record: GET /api/{model_name}/{id}, it brings all the data from the select record.
# Read all records: GET /api/{model_name}, it brings all the records of that model
# Update: POST /api/{model_name}/{id}, it updates the record, you should pass the record id and updated data.
# Delete: DELETE /api/{model_name}/{id}, you should pass the id of the record you need to delete, it should delete the timesheets records related to him.
#
##################################################################
@projects_api_v1_bp.route('/users', methods=['POST'])
@user_auth_token_required
def post_user_details(payload):
    organization_xid = payload['organization_xid']
    # user_xid = payload['user_xid']

    data = request.json['data']

    user_xid = logic.UserLogic.update_user_details(organization_xid, None, data)
    payload = logic.UserLogic.fetch_user_details(organization_xid, user_xid)
    
    return api_response.return_packet_success(payload)


@projects_api_v1_bp.route('/users', methods=['GET'])
@user_auth_token_required
def get_users(payload):
    organization_xid = payload['organization_xid']
    # user_xid = payload['user_xid']
    
    payload = logic.UserLogic.fetch_all_users(organization_xid)

    return api_response.return_packet_success(payload)


@projects_api_v1_bp.route('/users/<user_xid>', methods=['GET'])
@user_auth_token_required
def get_single_user(payload, user_xid):
    organization_xid = payload['organization_xid']
    # user_xid = payload['user_xid']
        
    payload = logic.UserLogic.fetch_user_details(organization_xid, user_xid)

    return api_response.return_packet_success(payload)


@projects_api_v1_bp.route('/users/<user_xid>', methods=['POST'])
@user_auth_token_required
def post_user_update(payload, user_xid):
    organization_xid = payload['organization_xid']
    # user_xid = payload['user_xid']
    
    data = request.json['data']

    payload = logic.UserLogic.update_user_details(organization_xid, user_xid, data)
    return api_response.return_packet_success(payload)


@projects_api_v1_bp.route('/users/<user_xid>', methods=['DELETE'])
@user_auth_token_required
def delete_user(payload, user_xid):
    organization_xid = payload['organization_xid']
    # user_xid = payload['user_xid']
    
    payload = logic.UserLogic.delete_user(organization_xid, user_xid)
    return api_response.return_packet_success(payload)
