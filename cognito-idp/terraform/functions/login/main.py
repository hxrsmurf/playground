import boto3
import os


def handler(event, context):
    username = os.environ['username']
    password = os.environ['password']
    client_id = os.environ['client_id']
    account_id = os.environ['account_id']
    identity_pool_id = os.environ['identity_pool_id']
    provider_name = os.environ['provider_name']

    client = boto3.client("cognito-idp")

    response = client.initiate_auth(
        AuthFlow="USER_PASSWORD_AUTH",
        AuthParameters={
            "USERNAME": username,
            "PASSWORD": password
        },
        ClientId=client_id
    )

    id_token = response["AuthenticationResult"]["IdToken"]

    client = boto3.client("cognito-identity")

    response = client.get_id(
        AccountId=account_id,
        IdentityPoolId=identity_pool_id,
        Logins={
            provider_name: id_token
        }
    )

    response = client.get_credentials_for_identity(
        IdentityId=response['IdentityId'],
        Logins={
            provider_name: id_token
        }
    )

    print(response['Credentials'])