resource "aws_resourcegroups_group" "resource-group" {
    name     = var.project

    resource_query {
        query = jsonencode(
            {
                ResourceTypeFilters = [
                    "AWS::AllSupported",
                ]
                TagFilters          = [
                    {
                        Key    = "project"
                        Values = [
                            var.project
                        ]
                    },
                ]
            }
        )
        type  = "TAG_FILTERS_1_0"
    }
}

output "resource-group" {
    value = "https://${var.region}.console.aws.amazon.com/resource-groups/group/${var.project}?region=${var.region}"
}