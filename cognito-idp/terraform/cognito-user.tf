resource "aws_cognito_user" "user" {
  attributes = {
    "email"          = var.user
    "email_verified" = "true"
  }
  enabled      = true
  user_pool_id = aws_cognito_user_pool.user-pool.id
  username     = var.user
  depends_on = [
    aws_cognito_user_pool.user-pool
  ]
}

resource "random_id" "user" {
  keepers = {
    # Generate a new id each time we switch to a new AMI id
    password = "user"
  }

  byte_length = 8
}

output "user" {
  value = random_id.user.id
}
