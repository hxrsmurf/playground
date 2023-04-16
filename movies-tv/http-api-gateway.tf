resource "aws_apigatewayv2_api" "api-gateway" {
  api_key_selection_expression = "$request.header.x-api-key"
  description                  = "Created by AWS Lambda"
  disable_execute_api_endpoint = false
  name                         = "movies-tv-twilio-API"
  protocol_type                = "HTTP"
  route_selection_expression   = "$request.method $request.path"
  cors_configuration {
    allow_credentials = false
    allow_headers     = []
    allow_methods     = []
    allow_origins     = []
    expose_headers    = []
    max_age           = 0
  }
}

resource "aws_apigatewayv2_integration" "lambda" {
  api_id                 = aws_apigatewayv2_api.api-gateway.id
  connection_type        = "INTERNET"
  integration_method     = "POST"
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.function.arn
  payload_format_version = "1.0"
  request_parameters     = {}
  request_templates      = {}
  timeout_milliseconds   = 30000
}

resource "aws_apigatewayv2_route" "any" {
  api_id               = aws_apigatewayv2_api.api-gateway.id
  api_key_required     = false
  authorization_scopes = []
  authorization_type   = "NONE"
  request_models       = {}
  route_key            = "ANY /"
  target               = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}