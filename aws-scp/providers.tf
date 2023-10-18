terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.21.0"
    }
  }
  cloud {
    organization = "playground-repo"

    workspaces {
      name = "aws-scp-testing"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}