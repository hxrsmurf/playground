module "amazon-linux" {
    source = "./modules/launch-template"
    launch-template-name = "amazon-linux"
    instance-type = "t2.micro"
    ami = data.aws_ssm_parameter.amazon-linux.value
    user-data = base64encode(data.local_file.user-data.content)
    security-group = var.security-group
    subnet-id = var.subnet-id
    keypair = var.keypair
}

data "aws_ssm_parameter" "amazon-linux" {
    name = "/aws/service/ami-amazon-linux-latest/amzn2-ami-hvm-x86_64-gp2"
}