# Description

This handles the EC2 Auto Scaling Notification and updated the Cloudflare DNS Record.

I have the website on a t3.micro Spot EC2 Instance with ECS.

# Docs
- https://api.cloudflare.com/#dns-records-for-a-zone-update-dns-record

# Flow

1. EC2 Instance is `terminated`
2. EC2 Auto Scaling Group launches a new instance
3. EC2 Auto Scaling Group sends SNS Notification
4. SNS Notification triggers Lambda function
5. Lambda Function parses SNS
    - Gets EC2 Instance Id
    - Describes EC2 Instance, gets Public IP
    - Updates CloudFlare
6. ECS Replaces Task on new EC2
7. Website Back Online in about `5 minutes`