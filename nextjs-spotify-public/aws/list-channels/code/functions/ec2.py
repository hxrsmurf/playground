import boto3

client = boto3.client('ec2')

def describe_instances(instance_id):
    response = client.describe_instances(
        InstanceIds = [instance_id]
    )

    return(response)