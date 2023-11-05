variable "lambda_function_name" {
  default = "hugo-spotify-public"
}

variable "lambda_execution_timeout" {
  default = 60
}

variable "lambda_function_runtime" {
  default = "python3.10"
}

variable "log_group_retention" {
  default = 5
}

variable "region" {
  default = "us-east-1"
}