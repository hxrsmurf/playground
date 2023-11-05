data "archive_file" "lambda" {
  type        = "zip"
  source_dir  = "function"
  output_path = "lambda_function_payload.zip"
}

resource "aws_lambda_function" "function" {
  filename      = "lambda_function_payload.zip"
  function_name = var.lambda_function_name
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "index.handler"
  timeout       = var.lambda_execution_timeout

  source_code_hash = data.archive_file.lambda.output_base64sha256

  runtime = "python3.10"

  layers = [
  ]

  environment {
    variables = {
      EXAMPLE_URL   = "https://example.com"
    }
  }
}