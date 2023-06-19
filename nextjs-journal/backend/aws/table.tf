
resource "aws_dynamodb_table" "table" {
    billing_mode                = "PAY_PER_REQUEST"
    deletion_protection_enabled = true
    hash_key                    = "user_id"
    name                        = var.project
    range_key                   = "title"
    read_capacity               = 0
    stream_enabled              = false
    table_class                 = "STANDARD"
    tags                        = {
        "project" = "nextjs-journal"
    }
    write_capacity              = 0

    attribute {
        name = "user_id"
        type = "S"
    }

    attribute {
        name = "year"
        type = "S"
    }

    attribute {
        name = "month"
        type = "S"
    }

    attribute {
        name = "title"
        type = "S"
    }

    attribute {
        name = "tag"
        type = "S"
    }

    local_secondary_index {
        name  = "user_id-month"
        projection_type = "ALL"
        range_key = "month"
    }

    local_secondary_index {
        name  = "user_id-title"
        projection_type = "ALL"
        range_key = "title"
    }

    local_secondary_index {
        name  = "user_id-tag"
        projection_type = "ALL"
        range_key = "tag"
    }

    local_secondary_index {
        name  = "user_id-year"
        projection_type = "ALL"
        range_key = "year"
    }

    point_in_time_recovery {
        enabled = false
    }
}