provider "aws" {
  region = "us-east-1"
}

terraform {
  cloud {
    organization = "nextjs-spotify-public"

    workspaces {
      name = "ec2"
    }
  }
}