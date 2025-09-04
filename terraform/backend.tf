terraform {
  backend "s3" {
    bucket         = "hysteria2-vpn-client-terraform-state"
    key            = "terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "hysteria2-vpn-client-terraform-locks"
    kms_key_id     = "alias/terraform-bucket-key"
  }
}
