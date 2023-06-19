resource "aws_resourcegroups_group" "resource-group" {
  name = var.project

  resource_query {
    query = <<JSON
{
  "ResourceTypeFilters": [
    "AWS::AllSupported"
  ],
  "TagFilters": [
    {
      "Key": "project",
      "Values": ["${var.project}"]
    }
  ]
}
JSON
  }
}

output "resource-group" {
    value = "https://${var.region}.console.aws.amazon.com/resource-groups/group/${aws_resourcegroups_group.resource-group.name}?region=${var.region}"
}