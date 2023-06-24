data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "iam_for_lambda" {
  name               = "iam_for_lambda"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

data "archive_file" "lambda" {
  type        = "zip"
  source_dir  = "./functions/login"
  output_path = "login.zip"
}

resource "aws_lambda_function" "login" {
  filename      = "login.zip"
  function_name = "cognito-login"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "main.handler"

  source_code_hash = data.archive_file.lambda.output_base64sha256

  runtime = "python3.10"

  environment {
    variables = {
      username         = aws_cognito_user.user.username
      password         = "${random_id.user.id}#"
      client_id        = aws_cognito_user_pool_client.userpool-client.id
      account_id       = local.account_id
      identity_pool_id = aws_cognito_identity_pool.identity-pool.id
      provider_name    = "cognito-idp.${var.region}.amazonaws.com/${aws_cognito_user_pool.user-pool.id}"
    }
  }

  tags = {
    project = var.project
  }
}

resource "aws_cloudwatch_log_group" "example" {
  name              = "/aws/lambda/${aws_lambda_function.login.id}"
  retention_in_days = 14
  tags = {
    project = var.project
  }
}
