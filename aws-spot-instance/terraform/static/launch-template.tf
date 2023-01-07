# aws_launch_template.launch-template:

resource "aws_launch_template" "launch-template" {
    description             = var.launch-template-name
    disable_api_stop        = false
    disable_api_termination = false
    image_id                = data.aws_ssm_parameter.ami.value
    instance_type           = var.instance-type
    key_name                = var.keypair
    name                    = var.launch-template-name
    tags                    = {}
    user_data               = base64encode(data.local_file.user-data.content)
    update_default_version  = true
    vpc_security_group_ids  = [
        aws_security_group.security-group.id
    ]

    instance_market_options {
        market_type = "spot"

        spot_options {
            block_duration_minutes         = 0
            instance_interruption_behavior = "terminate"
            spot_instance_type             = "one-time"
        }
    }

    network_interfaces {
        associate_public_ip_address = "true"
        delete_on_termination       = "true"
        description                 = var.launch-template-name
        device_index                = 0
        network_card_index          = 0
        security_groups             = [
            aws_security_group.security-group.id
        ]
        subnet_id                   = aws_subnet.main.id
    }

    tag_specifications {
        resource_type = "instance"
        tags          = {
            "Name" = var.launch-template-name
        }
    }
    tag_specifications {
        resource_type = "volume"
        tags          = {
            "Name" = var.launch-template-name
        }
    }
    tag_specifications {
        resource_type = "spot-instances-request"
        tags          = {
            "Name" = var.launch-template-name
        }
    }
}