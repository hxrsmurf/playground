resource "aws_iam_role" "unauthenticated" {
  assume_role_policy = jsonencode(
    {
      Statement = [
        {
          Action = "sts:AssumeRoleWithWebIdentity"
          Condition = {
            "ForAnyValue:StringLike" = {
              "cognito-identity.amazonaws.com:amr" = "unauthenticated"
            }
            StringEquals = {
              "cognito-identity.amazonaws.com:aud" = aws_cognito_identity_pool.identity-pool.id
            }
          }
          Effect = "Allow"
          Principal = {
            Federated = "cognito-identity.amazonaws.com"
          }
        },
      ]
      Version = "2012-10-17"
    }
  )
  force_detach_policies = false
  managed_policy_arns   = []
  max_session_duration  = 3600
  name                  = "Cognito_Unauth_Role"
  path                  = "/"

  inline_policy {
    name = "oneClick_Cognito_Unauth_Role"
    policy = jsonencode(
      {
        Statement = [
          {
            Action = [
              "mobileanalytics:PutEvents",
              "cognito-sync:*",
            ]
            Effect = "Allow"
            Resource = [
              "*",
            ]
          },
        ]
        Version = "2012-10-17"
      }
    )
  }
}
