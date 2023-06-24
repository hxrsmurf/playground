provider "aws" {
    region = var.region
}

terraform {
  cloud {
    organization = "playground-repo"

    workspaces {
      name = "cognito-idp"
    }
  }
}