terraform {
  cloud {
    organization = "playground-repo"

    workspaces {
      name = "movies-tv"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}