resource "aws_dynamodb_table" "table" {
  billing_mode                = "PAY_PER_REQUEST"
  deletion_protection_enabled = false
  hash_key                    = "id"
  name                        = "moveies-tv" # Yeah I spelled it wrong.
  read_capacity               = 0
  stream_enabled              = false
  table_class                 = "STANDARD"
  write_capacity              = 0

  attribute {
    name = "id"
    type = "S"
  }

  point_in_time_recovery {
    enabled = false
  }
}

output "table" {
  value = aws_dynamodb_table.table.arn
}