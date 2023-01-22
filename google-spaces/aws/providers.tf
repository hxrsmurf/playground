terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "4.49.0"
    }
  }

  cloud {
    organization = "google-spaces"

    workspaces {
      name = "google-spaces"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}