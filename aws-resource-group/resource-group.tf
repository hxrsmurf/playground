resource "aws_resourcegroups_group" "test" {
  name = "resource-group-testing"

  resource_query {
    query = <<JSON
{
  "ResourceTypeFilters": [
    "AWS::AllSupported"
  ],
  "TagFilters": [
    {
      "Key": "Project",
      "Values": ["resource-group-testing"]
    }
  ]
}
JSON
  }
}
