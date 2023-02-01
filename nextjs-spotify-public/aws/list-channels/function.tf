data "archive_file" "archive" {
  type             = "zip"
  source_dir       = "./code"
  output_file_mode = "0666"
  output_path      = "./${var.name}.zip"
}

resource "aws_lambda_function" "function" {
  function_name = var.name

  architectures = [
    "x86_64",
  ]

  handler = "index.lambda_handler"
  layers = [
    "arn:aws:lambda:us-east-1:195663387853:layer:requests-tf:8"
  ]

  environment {
    variables = {
      "api"             = var.cloudflare-api
      "email"           = var.cloudflare-email
      "zone_identifier" = var.cloudflare-zone
      "fqdn"            = var.fqdn
    }
  }

  memory_size                    = 128
  package_type                   = "Zip"
  reserved_concurrent_executions = -1
  role                           = aws_iam_role.role.arn
  runtime                        = "python3.9"
  filename                       = data.archive_file.archive.output_path
  source_code_hash               = filebase64sha256(data.archive_file.archive.output_path)
  timeout                        = 30

  ephemeral_storage {
    size = 512
  }

  timeouts {}

  tracing_config {
    mode = "PassThrough"
  }
}
