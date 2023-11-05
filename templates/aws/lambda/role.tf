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
