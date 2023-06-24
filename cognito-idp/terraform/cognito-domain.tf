resource "aws_cognito_user_pool_domain" "main" {
  domain       = random_id.server.dec
  user_pool_id = aws_cognito_user_pool.user-pool.id
}

resource "random_id" "server" {
  keepers = {
    # Generate a new id each time we switch to a new AMI id
    cognito = "cognito"
  }

  byte_length = 8
}
