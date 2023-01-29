resource "aws_ecs_task_definition" "service" {
    container_definitions    = jsonencode(
        [
            {
                cpu              = 0
                environment      = []
                environmentFiles = []
                essential        = true
                image            = "${aws_ecr_repository.testing.repository_url}:latest"

                mountPoints      = []
                name             = "nextjs-spotify-public"
                portMappings     = [
                    {
                        appProtocol   = "http"
                        containerPort = 3000
                        hostPort      = 80
                        name          = "nextjs-spotify-public-3000-tcp"
                        protocol      = "tcp"
                    },
                ]
                volumesFrom      = []
            },
        ]
    )
    cpu                      = "1024"
    execution_role_arn       = "arn:aws:iam::195663387853:role/ecsTaskExecutionRole"
    family                   = "nextjs-spotify-public"
    memory                   = "512"
    network_mode             = "bridge"
    requires_compatibilities = [
        "EC2",
    ]
    tags                     = {
        "ecs:taskDefinition:createdFrom" = "ecs-console-v2"
    }

    runtime_platform {
        cpu_architecture        = "X86_64"
        operating_system_family = "LINUX"
    }
}