data "archive_file" "lambda" {
  type        = "zip"
  source_dir  = "./code"
  output_path = "lambda_function_payload.zip"
}

resource "aws_lambda_function" "function" {
  architectures = [
    "x86_64",
  ]
  function_name                  = "movies-tv-twilio"
  handler                        = "lambda_function.lambda_handler"
  layers                         = []
  memory_size                    = 128
  package_type                   = "Zip"
  reserved_concurrent_executions = -1
  role                           = aws_iam_role.iam_for_lambda.arn
  runtime                        = "python3.9"
  filename                       = "lambda_function_payload.zip"
  source_code_hash               = data.archive_file.lambda.output_base64sha256
  timeout                        = 15
}

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
    "arn:aws:iam::195663387853:policy/service-role/AWSLambdaBasicExecutionRole-fbdf01e0-f351-41f8-90e3-f0d4ab269891",
  ]

  max_session_duration = 3600
  name                 = "movies-tv-twilio-role-vker147g"
  path                 = "/service-role/"

  inline_policy {
    name = "DynamoDB"
    policy = jsonencode(
      {
        Statement = [
          {
            Action   = "dynamodb:UpdateItem"
            Effect   = "Allow"
            Resource = "arn:aws:dynamodb:us-east-1:195663387853:table/moveies-tv"
          },
        ]
        Version = "2012-10-17"
      }
    )
  }
}
