resource "aws_organizations_policy" "policy" {
  content = jsonencode(
    {
      Statement = [
        {
          Action = "*"
          Condition = {
            ArnNotLike = {
              "aws:PrincipalArn" = [
                "arn:aws:iam::*:role/aws-reserved/sso.amazonaws.com/AWSReservedSSO_AWSAdministratorAccess_*",
                "arn:aws:iam::*:role/aws-reserved/sso.amazonaws.com/AWSReservedSSO_AdministratorAccess-Custom_*",
                "arn:aws:iam::*:role/aws-scp-testing-sns"
              ]
            }
            Bool = {
              "aws:ViaAWSService" = "false"
            }
            NotIpAddress = {
              "aws:SourceIp" = [
                "1.1.1.1/32",
              ]
            }
          }
          Effect   = "Deny"
          Resource = "*"
        },
      ]
      Version = "2012-10-17"
    }
  )
  name = "IP-Block"
}
