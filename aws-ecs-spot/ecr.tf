resource "aws_ecr_repository" "testing" {
  name                 = var.name
  image_tag_mutability = "MUTABLE"
}