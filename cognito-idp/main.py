import boto3

# Replace with your values
username = "hello@world.com"
password = "password"
client_id = "my-client-id"
account_id = "1234"
identity_pool_id = "us-east-1:123456-1234-123123123"
provider_name = "cognito-idp.us-east-1.amazonaws.com/user_pool_here"

# Python
client = boto3.client("cognito-idp")
response = client.initiate_auth(
    AuthFlow="USER_PASSWORD_AUTH",
    AuthParameters={
        "USERNAME": username,
        "PASSWORD": password
    },
    ClientId= client_id
)

id_token = response["AuthenticationResult"]["IdToken"]
access_token = response["AuthenticationResult"]["AccessToken"]

client = boto3.client("cognito-identity")

response = client.get_id(
    AccountId= account_id
    IdentityPoolId=identity_pool_id
    Logins = {
        provider_name: id_token
    }
)

response = client.get_credentials_for_identity(
    IdentityId=response['IdentityId'],
    Logins = {
        provider_name: id_token
    }
)

print(response['Credentials'])

# Windows CMD
# SET AWS_ACCESS_KEY_ID=
# SET AWS_SECRET_ACCESS_KEY=
# SET AWS_SESSION_TOKEN=