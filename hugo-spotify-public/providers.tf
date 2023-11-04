provider "aws" {
  region = var.region
}

terraform {
  cloud {
    organization = "hugo-spotify-public"

    workspaces {
      name = "hugo-spotify-public"
    }
  }
}