resource "aws_cloudwatch_log_group" "log-group" {
  name              = "/aws/lambda/${var.lambda_function_name}"
  retention_in_days = var.log_group_retention
}