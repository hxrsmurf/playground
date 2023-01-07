module "windows-2016" {
    source = "./modules/launch-template"
    launch-template-name = "windows-2016"
    instance-type = "t2.large"
    ami = data.aws_ssm_parameter.windows-2016.value
    user-data = base64encode(data.local_file.user-data.content)
    security-group = var.security-group
    subnet-id = var.subnet-id
    keypair = var.keypair
}

data "aws_ssm_parameter" "windows-2016" {
    name = "/aws/service/ami-windows-latest/Windows_Server-2016-English-Full-Base"
}