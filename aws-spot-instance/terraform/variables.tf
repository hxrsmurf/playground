variable "launch-template-name" {
    default = "aws-spot-instance"
}

variable "instance-type" {
    default = "t2.micro"
}

data "aws_ssm_parameter" "ami" {
    name = "/aws/service/ami-amazon-linux-latest/amzn2-ami-hvm-x86_64-gp2"
}

data "local_file" "user-data" {
    filename = "${path.module}/user-data.sh"
}