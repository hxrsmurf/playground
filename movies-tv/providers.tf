terraform {
  cloud {
    organization = "playground-repo"

    workspaces {
      name = "movies-tv"
    }
  }
}