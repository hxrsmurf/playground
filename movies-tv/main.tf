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
  role                           = "arn:aws:iam::195663387853:role/service-role/movies-tv-twilio-role-vker147g"
  runtime                        = "python3.9"
  filename                       = "lambda_function_payload.zip"
  source_code_hash               = data.archive_file.lambda.output_base64sha256
  timeout                        = 15
}
