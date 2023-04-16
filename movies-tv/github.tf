resource "aws_iam_role" "iam_for_github" {
  assume_role_policy = jsonencode(
    {
      Statement = [
        {
          Action = "sts:AssumeRoleWithWebIdentity"
          Condition = {
            StringEquals = {
              "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
            }
          }
          Effect = "Allow"
          Principal = {
            Federated = "arn:aws:iam::195663387853:oidc-provider/token.actions.githubusercontent.com"
          }
        },
      ]
      Version = "2012-10-17"
    }
  )
  description          = "GitHub role for playground-repo/movies-tv"
  managed_policy_arns  = []
  max_session_duration = 3600
  name                 = "movies-tv-github"
  path                 = "/"

  inline_policy {
    name = "IAM"
    policy = jsonencode(
      {
        Statement = [
          {
            Action = [
              "iam:GetRole",
              "iam:GetRolePolicy",
              "iam:ListRolePolicies",
              "iam:ListAttachedRolePolicies"
            ]
            Effect = "Allow"
            Resource = [
              "arn:aws:iam::195663387853:role/movies-tv-github",
              "arn:aws:iam::195663387853:role/service-role/movies-tv-twilio-role-vker147g"
            ]
          },
          {
            Action = [
              "iam:Delete*"
            ]
            Effect   = "Deny"
            Resource = ["*"]
          },
        ]
        Version = "2012-10-17"
      }
    )
  }

  inline_policy {
    name = "Lambda"
    policy = jsonencode(
      {
        Statement = [
          {
            Action = [
              "lambda:*",
            ]
            Effect = "Allow"
            Resource = [
              "arn:aws:lambda:us-east-1:195663387853:function:movies-tv-twilio",
            ]
          },
          {
            Action = [
              "lambda:Delete*"
            ]
            Effect   = "Deny"
            Resource = ["*"]
          },
        ]
        Version = "2012-10-17"
      }
    )
  }
}

output "iam_for_github" {
  value = aws_iam_role.iam_for_github.arn
}