resource "aws_sns_topic" "topic" {
  name = var.name
  tags = {
    Project = var.name
  }
}