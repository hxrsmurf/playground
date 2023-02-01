import json

from functions.ec2 import describe_instances
from functions.cloudflare import verify, zone_record_update, list_dns_records

def lambda_handler(event, context):
    record = event['Records'][0]
    sns_message = record['Sns']
    subject = sns_message['Subject']
    message = sns_message['Message']

    if subject == 'Auto Scaling: launch':
        instance_id = message['EC2InstanceId']
        instance_information = describe_instances(instance_id)['Reservations'][0]['Instances'][0]
        public_ip = instance_information['PublicIpAddress']
        print(public_ip)
