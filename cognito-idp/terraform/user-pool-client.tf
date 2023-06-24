resource "aws_cognito_user_pool_client" "userpool-client" {
  name                                 = "cognito"
  user_pool_id                         = aws_cognito_user_pool.user-pool.id
  callback_urls                        = ["http://localhost:3000"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows                  = ["code"]
  allowed_oauth_scopes                 = ["email", "openid", "phone"]
  supported_identity_providers         = ["COGNITO"]
  explicit_auth_flows = [
    "ALLOW_CUSTOM_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_SRP_AUTH",
    "ALLOW_USER_PASSWORD_AUTH"
  ]

  token_validity_units {
    access_token  = "minutes"
    id_token      = "minutes"
    refresh_token = "days"
  }
}
