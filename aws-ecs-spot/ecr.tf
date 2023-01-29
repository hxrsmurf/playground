resource "aws_ecr_repository" "testing" {
  name                 = "testing"
  image_tag_mutability = "MUTABLE"
}