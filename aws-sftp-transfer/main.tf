resource "aws_s3_bucket" "bucket" {
  bucket = "aws-sftp-transfer-test-zm5uvkfp"
}

resource "aws_transfer_server" "transfer" {
}