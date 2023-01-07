# aws_launch_template.launch-template:

resource "aws_launch_template" "launch-template" {
    description             = var.launch-template-name
    disable_api_stop        = false
    disable_api_termination = false
    image_id                = var.ami
    instance_type           = var.instance-type
    key_name                = var.keypair
    name                    = var.launch-template-name
    tags                    = {}
    user_data               = var.user-data
    update_default_version  = true
    vpc_security_group_ids  = [
        var.security-group
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
            var.security-group
        ]
        subnet_id                   = var.subnet-id
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