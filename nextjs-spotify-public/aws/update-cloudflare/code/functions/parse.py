from .ec2 import describe_instances

def parse_sns(record):
    # Parse EC2 Information
    instance_id = event['detail']['EC2InstanceId']
    instance_information = describe_instances(instance_id)['Reservations'][0]['Instances'][0]
    public_ip = instance_information['PublicIpAddress']
    return public_ip