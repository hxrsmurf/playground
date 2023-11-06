data "archive_file" "lambda" {
  type        = "zip"
  source_dir  = var.source_dir
  output_path = "${var.name}.zip"
}

resource "aws_lambda_function" "function" {
  filename      = "${var.name}.zip"
  function_name = var.name
  role          = var.role
  handler       = var.handler
  timeout       = var.timeout

  source_code_hash = data.archive_file.lambda.output_base64sha256

  runtime = var.runtime

  layers = var.layers

  environment {
    variables = var.environment
  }
}
