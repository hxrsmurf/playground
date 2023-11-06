module "query-database" {
  source     = "./modules/lambda"
  source_dir = "functions/query-database"
  name       = "${var.lambda_function_name}-query-database"
  role       = aws_iam_role.iam_for_lambda.arn
  handler    = "index.handler"
  timeout    = 300
  runtime    = "python3.10"
  layers = [
    "arn:aws:lambda:us-east-1:195663387853:layer:requests-python-clerk:2",
    "arn:aws:lambda:us-east-1:195663387853:layer:urllib-python-clerk:1"
  ]
  environment = {
    CLERK_BASE_URL   = "https://api.clerk.com/v1/"
    SPOTIFY_BASE_URL = "https://api.spotify.com/v1/"
    DYNAMODB_TABLE   = "spotify-tracker-sam-DynamoDB-153V5770W5PY5"
  }
}