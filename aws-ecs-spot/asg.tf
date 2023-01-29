resource "aws_autoscaling_group" "asg" {
  capacity_rebalance        = false
  default_cooldown          = 120
  default_instance_warmup   = 0
  desired_capacity          = var.desired_capacity
  health_check_grace_period = 0
  health_check_type         = "EC2"
  max_size                  = 2
  min_size                  = 0
  name                      = "Infra-ECS-Cluster-nextjs-spotify-public-16b2f8ee-ECSAutoScalingGroup-1DA5MYASPDRA6"
  protect_from_scale_in     = false
  service_linked_role_arn   = "arn:aws:iam::${var.account-id}:role/aws-service-role/autoscaling.amazonaws.com/AWSServiceRoleForAutoScaling"
  vpc_zone_identifier = [
    "subnet-01dff429e17e1250f",
    "subnet-032f181112ad9a659",
    "subnet-04dcef0f98e287f57",
    "subnet-06f20fbf166bf2252",
    "subnet-0d8fa1295c21f9ead",
    "subnet-0f86646f453f0a00f",
  ]

  mixed_instances_policy {
    instances_distribution {
      on_demand_allocation_strategy            = "prioritized"
      on_demand_base_capacity                  = 0
      on_demand_percentage_above_base_capacity = 0
      spot_allocation_strategy                 = "lowest-price"
      spot_instance_pools                      = 2
    }

    launch_template {
      launch_template_specification {
        launch_template_id   = "lt-091dccaa9ee4110ac"
        launch_template_name = "ECSLaunchTemplate_3BJN7wIHWpUR"
        version              = "1"
      }

      override {
        instance_type = "t2.micro"
      }
    }
  }


  tag {
    key                 = "AmazonECSManaged"
    propagate_at_launch = true
    value               = ""
  }

  timeouts {}
}
