resource "aws_lambda_function" "function" {
    architectures                  = [
        "x86_64",
    ]
    function_name                  = "python-spotify-RefreshToken-Lwk5LrL82LoO"
    handler                        = "index.handler"
    layers                         = [ "arn:aws:lambda:us-east-1:195663387853:layer:requests-tf:8" ]
    memory_size                    = 128
    package_type                   = "Zip"
    role                           = "arn:aws:iam::195663387853:role/python-spotify-RefreshTokenRole-TZDMHK9BE12C"
    runtime                        = "python3.9"
    filename                       = data.archive_file.lambda.output_path
    source_code_hash               = filebase64sha256(data.archive_file.lambda.output_path)
    tags                           = {
        "lambda:createdBy" = "SAM"
    }
    timeout                        = 120

    environment {
        variables = {
            "SpotifyClientId" = var.SpotifyClientId
            "Table"           = "python-spotify"
        }
    }

    ephemeral_storage {
        size = 512
    }

    timeouts {}

    tracing_config {
        mode = "PassThrough"
    }
}

data "archive_file" "lambda" {
  type             = "zip"
  source_dir      = "."
  output_file_mode = "0666"
  output_path      = "function.zip"
  excludes = ["terraform.tfstate", "terraform.tfstate.backup", ".terraform", ".terraform.lock.hcl", "function.zip"]
}