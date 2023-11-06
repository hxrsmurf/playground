output "api" {
  value = aws_apigatewayv2_api.api.api_endpoint
}

resource "aws_apigatewayv2_api" "api" {
  api_key_selection_expression = "$request.header.x-api-key"
  description                  = var.lambda_function_name
  disable_execute_api_endpoint = false
  name                         = var.lambda_function_name
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

resource "aws_apigatewayv2_stage" "api" {
  api_id = aws_apigatewayv2_api.api.id
  name   = "api"
}

resource "aws_lambda_permission" "api" {
  action        = "lambda:InvokeFunction"
  function_name = module.lambda.arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api.execution_arn}/*/$default"
}

module "route-main" {
  source          = "./modules/api-route"
  api_id          = aws_apigatewayv2_api.api.id
  route_key       = "$default"
  integration_uri = module.lambda.arn
  function_name   = module.lambda.arn
  execution_arn   = "${aws_apigatewayv2_api.api.execution_arn}/*/$default"
}

module "route-query-database" {
  source          = "./modules/api-route"
  api_id          = aws_apigatewayv2_api.api.id
  route_key       = "GET /api/query-database"
  integration_uri = module.query-database.arn
  function_name   = module.query-database.arn
  execution_arn   = "${aws_apigatewayv2_api.api.execution_arn}/*/*/api/query-database"
}