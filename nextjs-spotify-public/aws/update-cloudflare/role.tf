resource "aws_iam_role" "role" {
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
    "arn:aws:iam::195663387853:policy/service-role/AWSLambdaBasicExecutionRole-8de2398e-10a0-43e2-a902-87e7af8c2097",
    "arn:aws:iam::aws:policy/AmazonEC2ReadOnlyAccess"
  ]

  name = var.name
  path = "/"
}