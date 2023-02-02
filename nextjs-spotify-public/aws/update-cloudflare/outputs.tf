output "function" {
  value = {
    arn        = aws_lambda_function.function.arn,
    invoke_arn = aws_lambda_function.function.invoke_arn,
    invoke_arn = aws_lambda_function.function.invoke_arn,
    url        = "https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions/${aws_lambda_function.function.function_name}"
  }
}

output "role" {
  value = aws_iam_role.role.arn
}