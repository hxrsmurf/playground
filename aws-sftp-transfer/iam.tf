resource "aws_iam_role" "role" {
    assume_role_policy    = jsonencode(
        {
            Statement = [
                {
                    Action    = "sts:AssumeRole"
                    Effect    = "Allow"
                    Principal = {
                        Service = "transfer.amazonaws.com"
                    }
                    Sid       = ""
                },
            ]
            Version   = "2012-10-17"
        }
    )
    description           = "Allow AWS Transfer to call AWS services on your behalf."
    force_detach_policies = false
    managed_policy_arns   = []
    max_session_duration  = 3600
    name                  = "aws-transfer-role"
    path                  = "/"

    inline_policy {
        name   = "s3"
        policy = jsonencode(
            {
                Statement = [
                    {
                        Action   = "s3:*"
                        Effect   = "Allow"
                        Resource = [
                            aws_s3_bucket.bucket.arn,
                            "${aws_s3_bucket.bucket.arn}/*",
                        ]

                    },
                ]
                Version   = "2012-10-17"
            }
        )
    }
}