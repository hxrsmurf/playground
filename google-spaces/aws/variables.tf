variable "name" {
  default = "google-spaces"
}

variable "layers" {
  default = [
    "arn:aws:lambda:us-east-1:195663387853:layer:requests-tf:8"
  ]
}

variable "memory" {
  default = "256"
}

variable "timeout" {
  default = "30"
}

variable "runtime" {
  default = "python3.9"
}

variable "environment" {
  default = {
    Space = "test"
    Key   = "test"
    Token = "test"
  }
}

variable "policy-arn" {
  default = [
    "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  ]
}

variable "log-retention-days" {
  default = 3
}
