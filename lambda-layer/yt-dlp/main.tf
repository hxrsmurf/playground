data "archive_file" "yt-dlp" {
  type        = "zip"
  source_dir  = "yt-dlp"
  output_path = "yt-dlp.zip"
}

resource "aws_lambda_layer_version" "yt-dlp" {
  compatible_architectures = []
  compatible_runtimes = [
    "python3.9",
  ]
  description      = "YouTube-DLP (Python)"
  layer_name       = "yt-dlp"
  filename         = "yt-dlp.zip"
  source_code_hash = filebase64sha256(data.archive_file.yt-dlp.output_path)
  depends_on = [
    data.archive_file.yt-dlp
  ]
}