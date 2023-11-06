resource "aws_iam_role" "iam_for_lambda" {
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
  managed_policy_arns = [
    "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
  ]
  max_session_duration = 3600
  name                 = var.lambda_function_name
  path                 = "/"

  inline_policy {
    name = "CloudWatch"
    policy = jsonencode(
      {
        Statement = [
          {
            Action = [
              "logs:CreateLogStream",
              "logs:CreateLogGroup",
              "logs:PutLogEvents",
            ]
            Effect   = "Allow"
            Resource = "*"
          },
        ]
        Version = "2012-10-17"
      }
    )
  }

  inline_policy {
    name = "DynamoDB"
    policy = jsonencode(
      {
        Statement = [
          {
            Action = "dynamodb:*"
            Effect = "Allow"
            Resource = [
              "arn:aws:dynamodb:us-east-1:195663387853:table/spotify-tracker-sam-DynamoDB-153V5770W5PY5",
              "arn:aws:dynamodb:us-east-1:195663387853:table/spotify-tracker-sam-DynamoDB-153V5770W5PY5/*/*"
            ]
          },
          {
            Action = [
              "dynamodb:Delete*",
            ]
            Effect   = "Deny"
            Resource = "*"
          },
        ]
        Version = "2012-10-17"
      }
    )
  }
  inline_policy {
    name = "SSM"
    policy = jsonencode(
      {
        Statement = [
          {
            Action   = "ssm:GetParameter"
            Effect   = "Allow"
            Resource = "*"
          },
        ]
        Version = "2012-10-17"
      }
    )
  }
}
