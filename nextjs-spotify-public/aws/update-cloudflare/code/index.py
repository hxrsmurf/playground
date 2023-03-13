import json

from functions.ec2 import describe_instances
from functions.cloudflare import update_dns_record

def lambda_handler(event, context):
    # Parse Auto Scaling Event
    print(event)
    run = True
    if run:
        # Parse EC2 Information
        instance_id = event['detail']['EC2InstanceId']
        instance_information = describe_instances(instance_id)['Reservations'][0]['Instances'][0]
        public_ip = instance_information['PublicIpAddress']
        update_dns_record(ip_address=public_ip)