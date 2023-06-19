terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.4.0"
    }
  }
  cloud {
    organization = "nextjs-journal"

    workspaces {
      name = "nextjs-journal"
    }
  }
}

provider "aws" {
  region = var.region
}
