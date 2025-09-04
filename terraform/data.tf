# Get current AWS region
data "aws_region" "current" {}

# Get current AWS account ID
data "aws_caller_identity" "current" {}

# Get available availability zones
data "aws_availability_zones" "available" {
  state = "available"
}

# Get default VPC (if needed)
data "aws_vpc" "default" {
  count = var.use_default_vpc ? 1 : 0
  default = true
}

# Get default VPC subnets (if needed)
data "aws_subnets" "default" {
  count = var.use_default_vpc ? 1 : 0
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default[0].id]
  }
}

# Get latest Amazon Linux 2 AMI
data "aws_ami" "amazon_linux_2" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# Get latest EKS optimized AMI
data "aws_ami" "eks_optimized" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amazon-eks-node-${var.kubernetes_version}-v*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# Get EKS cluster auth config
data "aws_eks_cluster_auth" "main" {
  name = aws_eks_cluster.main.name
}

# Get EKS cluster endpoint
data "aws_eks_cluster" "main" {
  name = aws_eks_cluster.main.name
}

# Get EKS cluster certificate authority
data "aws_eks_cluster_certificate_authority" "main" {
  name = aws_eks_cluster.main.name
}

# Get EKS node group
data "aws_eks_node_group" "main" {
  cluster_name    = aws_eks_cluster.main.name
  node_group_name = aws_eks_node_group.main.node_group_name
}

# Get RDS instance
data "aws_db_instance" "main" {
  db_instance_identifier = aws_db_instance.main.identifier
}

# Get ElastiCache cluster
data "aws_elasticache_cluster" "main" {
  cluster_id = aws_elasticache_cluster.main.cluster_id
}

# Get Application Load Balancer
data "aws_lb" "main" {
  name = aws_lb.main.name
}

# Get ALB target group
data "aws_lb_target_group" "main" {
  name = aws_lb_target_group.main.name
}

# Get Route53 zone
data "aws_route53_zone" "main" {
  name = aws_route53_zone.main.name
}

# Get SSL certificate (if using ACM)
data "aws_acm_certificate" "main" {
  count  = var.certificate_arn != "" ? 1 : 0
  domain = var.domain_name
  statuses = ["ISSUED"]
}

# Get VPC endpoints (if needed)
data "aws_vpc_endpoint_service" "s3" {
  service = "s3"
}

data "aws_vpc_endpoint_service" "ecr" {
  service = "ecr.api"
}

data "aws_vpc_endpoint_service" "ecr_dkr" {
  service = "ecr.dkr"
}

data "aws_vpc_endpoint_service" "logs" {
  service = "logs"
}

# Get CloudWatch log group (if needed)
data "aws_cloudwatch_log_group" "eks" {
  count = var.enable_cloudwatch_logging ? 1 : 0
  name  = "/aws/eks/${aws_eks_cluster.main.name}/cluster"
}

# Get IAM policy documents
data "aws_iam_policy_document" "eks_cluster_assume_role" {
  statement {
    effect = "Allow"
    principals {
      type        = "Service"
      identifiers = ["eks.amazonaws.com"]
    }
    actions = ["sts:AssumeRole"]
  }
}

data "aws_iam_policy_document" "eks_node_group_assume_role" {
  statement {
    effect = "Allow"
    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
    actions = ["sts:AssumeRole"]
  }
}

# Get subnet data
data "aws_subnet" "public" {
  count = length(var.public_subnets)
  id    = aws_subnet.public[count.index].id
}

data "aws_subnet" "private" {
  count = length(var.private_subnets)
  id    = aws_subnet.private[count.index].id
}

# Get security group data
data "aws_security_group" "eks" {
  id = aws_security_group.eks.id
}

data "aws_security_group" "rds" {
  id = aws_security_group.rds.id
}

data "aws_security_group" "redis" {
  id = aws_security_group.redis.id
}

data "aws_security_group" "alb" {
  id = aws_security_group.alb.id
}
