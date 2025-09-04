# AWS Provider
provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = local.common_tags
  }
  
  # Assume role if specified
  dynamic "assume_role" {
    for_each = var.assume_role_arn != "" ? [1] : []
    content {
      role_arn = var.assume_role_arn
    }
  }
}

# Kubernetes Provider
provider "kubernetes" {
  host                   = data.aws_eks_cluster.main.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.main.certificate_authority[0].data)
  token                  = data.aws_eks_cluster_auth.main.token
  
  exec {
    api_version = "client.authentication.k8s.io/v1beta1"
    command     = "aws"
    args        = ["eks", "get-token", "--cluster-name", aws_eks_cluster.main.name]
  }
}

# Helm Provider
provider "helm" {
  kubernetes {
    host                   = data.aws_eks_cluster.main.endpoint
    cluster_ca_certificate = base64decode(data.aws_eks_cluster.main.certificate_authority[0].data)
    token                  = data.aws_eks_cluster_auth.main.token
    
    exec {
      api_version = "client.authentication.k8s.io/v1beta1"
      command     = "aws"
      args        = ["eks", "get-token", "--cluster-name", aws_eks_cluster.main.name]
    }
  }
}

# Random Provider
provider "random" {}

# Local Provider
provider "local" {}

# Null Provider
provider "null" {}

# TLS Provider (if needed for certificates)
provider "tls" {}

# External Provider (if needed for external data)
provider "external" {}

# HTTP Provider (if needed for HTTP requests)
provider "http" {}

# Time Provider (if needed for time-based resources)
provider "time" {}

# Archive Provider (if needed for file archiving)
provider "archive" {}

# Template Provider (if needed for template rendering)
provider "template" {}

# External Provider (if needed for external data sources)
provider "external" {}

# HTTP Provider (if needed for HTTP data sources)
provider "http" {}

# Time Provider (if needed for time-based data sources)
provider "time" {}

# Archive Provider (if needed for archive data sources)
provider "archive" {}

# Template Provider (if needed for template data sources)
provider "template" {}
