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
  timeout       = 60

  source_code_hash = data.archive_file.lambda.output_base64sha256

  runtime = "python3.10"

  layers = [
    "arn:aws:lambda:us-east-1:195663387853:layer:requests-python-clerk:2",
    "arn:aws:lambda:us-east-1:195663387853:layer:urllib-python-clerk:1"
  ]

  environment {
    variables = {
      CLERK_BASE_URL   = "https://api.clerk.com/v1/"
      SPOTIFY_BASE_URL = "https://api.spotify.com/v1/"
    }
  }
}