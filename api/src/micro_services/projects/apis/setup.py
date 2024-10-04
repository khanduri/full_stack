from flask import request

from src import projects_api_v1_bp
from src.helpers import api_response
from src.helpers.constants import Reason
from src.helpers.token_auth import user_auth_token_required
from src.micro_services.projects import logic


##################################################################
# Setup
##################################################################

@projects_api_v1_bp.route('/cleanslate', methods=['GET'])
@user_auth_token_required
def get_clean_slate(payload):
    organization_xid = payload['organization_xid']
    user_xid = payload['user_xid']
    
    payload = logic.SetupLogic.run_clean_slate(organization_xid, user_xid)

    return api_response.return_packet_success(payload)


@projects_api_v1_bp.route('/bootstrap', methods=['GET'])
# @user_auth_token_required
# def get_bootstrap(payload):
def get_bootstrap():
    organization_xid = "payload['organization_xid']"
    user_xid = "payload['user_xid']"
    
    payload = logic.SetupLogic.run_bootstrap(organization_xid, user_xid)

    return api_response.return_packet_success(payload)
