provider "aws" {
    region = var.region
}

terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "4.67.0"
    }
  }

  cloud {
    organization = "playground-repo"

    workspaces {
      name = "resource-group-testing"
    }
  }
}