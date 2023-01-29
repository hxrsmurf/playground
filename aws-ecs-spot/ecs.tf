resource "aws_ecs_service" "service" {
  deployment_maximum_percent         = 200
  deployment_minimum_healthy_percent = 100
  desired_count                      = 1
  enable_ecs_managed_tags            = true
  enable_execute_command             = false
  health_check_grace_period_seconds  = 0
  launch_type                        = "EC2"
  name                               = var.task-name
  propagate_tags                     = "NONE"
  scheduling_strategy                = "REPLICA"
  cluster                            = "arn:aws:ecs:us-east-1:${var.account-id}:cluster/${var.task-name}"

  task_definition = "${var.task-name}:${aws_ecs_task_definition.service.revision}"
  triggers        = {}

  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }

  deployment_controller {
    type = "ECS"
  }

  ordered_placement_strategy {
    field = "host"
    type  = "spread"
  }

  timeouts {}
}

resource "aws_ecs_task_definition" "service" {
  container_definitions = jsonencode(
    [
      {
        cpu              = 0
        environment      = []
        environmentFiles = []
        essential        = true
        image            = "${aws_ecr_repository.testing.repository_url}:latest"

        mountPoints = []
        name        = var.task-name
        portMappings = [
          {
            appProtocol   = "http"
            containerPort = 3000
            hostPort      = 80
            name          = "${var.task-name}-80-tcp"
            protocol      = "tcp"
          },
          {
            appProtocol   = "http"
            containerPort = 3000
            hostPort      = 3000
            name          = "${var.task-name}-3000-tcp"
            protocol      = "tcp"
          },
        ]
        volumesFrom = []
      },
    ]
  )
  cpu                = "1024"
  execution_role_arn = "arn:aws:iam::${var.account-id}:role/ecsTaskExecutionRole"
  family             = var.task-name
  memory             = "512"
  network_mode       = "bridge"
  requires_compatibilities = [
    "EC2",
  ]
  tags = {
    "ecs:taskDefinition:createdFrom" = "ecs-console-v2"
  }

  runtime_platform {
    cpu_architecture        = "X86_64"
    operating_system_family = "LINUX"
  }
}