resource "aws_iam_role" "role" {
  assume_role_policy = jsonencode(
    {
      Statement = [
        {
          Action = "sts:AssumeRole"
          Effect = "Allow"
          Principal = {
            Service = "lambda.amazonaws.com"
          }
        },
      ]
      Version = "2012-10-17"
    }
  )
  description           = var.project
  force_detach_policies = false
  managed_policy_arns   = []
  max_session_duration  = 3600
  name                  = var.project
  path                  = "/"
  tags                  = {}

  inline_policy {
    name = "dynamodb"
    policy = jsonencode(
      {
        Statement = [
          {
            Action   = "dynamodb:*"
            Effect   = "Allow"
            Resource = aws_dynamodb_table.table.arn
          },
        ],
        Version = "2012-10-17"
      }
    )
  }

  inline_policy {
    name = "dynamodb"
    policy = jsonencode(
      {
        Statement = [
          {
            Action   = "dynamodb:Delete*"
            Effect   = "Deny"
            Resource = aws_dynamodb_table.table.arn
          },
        ]
        Version = "2012-10-17"
      }
    )
  }
}
