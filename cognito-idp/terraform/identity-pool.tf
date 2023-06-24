resource "aws_cognito_identity_pool" "identity-pool" {
  allow_classic_flow               = false
  allow_unauthenticated_identities = false
  identity_pool_name               = "cognito"
  openid_connect_provider_arns     = []
  saml_provider_arns               = []
  supported_login_providers        = {}
  tags = {
    project = var.project
  }

  cognito_identity_providers {
    client_id               = aws_cognito_user_pool_client.userpool-client.id
    provider_name           = aws_cognito_user_pool.user-pool.endpoint
    server_side_token_check = false
  }

  depends_on = [
    aws_cognito_user_pool_client.userpool-client,
    aws_cognito_user_pool.user-pool
  ]
}
