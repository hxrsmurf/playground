terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "4.52.0"
    }
  }
}

provider "aws" {
    region = "us-east-1"
}

terraform {
  cloud {
    organization = "nextjs-spotify-public"

    workspaces {
      name = "nextjs-spotify-public"
    }
  }
}