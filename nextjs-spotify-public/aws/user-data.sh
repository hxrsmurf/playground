#!/bin/bash
yum install docker jq -y
export AWS_DEFAULT_REGION=us-east-1
systemctl start docker
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 195663387853.dkr.ecr.us-east-1.amazonaws.com
sha=`aws ecr list-images --repository-name testing | jq -r ".imageIds [0] .imageDigest"`
docker run -p 80:3000 195663387853.dkr.ecr.us-east-1.amazonaws.com/testing@$sha