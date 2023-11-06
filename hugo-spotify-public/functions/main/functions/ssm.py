import boto3

def get_ssm_parameter(name):
    client = boto3.client('ssm')

    response = client.get_parameter(
        Name="clerk-secret-key"
    )

    return response['Parameter']['Value']