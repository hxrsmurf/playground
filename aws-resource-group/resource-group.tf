resource "aws_resourcegroups_group" "test" {
  name = var.name

  resource_query {
    query = <<JSON
{
  "ResourceTypeFilters": [
    "AWS::AllSupported"
  ],
  "TagFilters": [
    {
      "Key": "Project",
      "Values": [
          "resource-group-testing"
      ]
    }
  ]
}
JSON
  }
}