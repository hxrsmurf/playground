module "windows-2022" {
    source = "./modules/launch-template"
    launch-template-name = "windows-2022"
    instance-type = "t2.large"
    ami = data.aws_ssm_parameter.windows-2022.value
    user-data = base64encode(data.local_file.user-data.content)
    security-group = var.security-group
    subnet-id = var.subnet-id
    keypair = var.keypair
}

data "aws_ssm_parameter" "windows-2022" {
    name = "/aws/service/ami-windows-latest/Windows_Server-2022-English-Full-Base"
}