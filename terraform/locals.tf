locals {
  # Common tags
  common_tags = merge(var.common_tags, {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
    Owner       = "devops-team"
    CostCenter  = "vpn-infrastructure"
  })
  
  # Name prefixes
  name_prefix = "${var.project_name}-${var.environment}"
  
  # Resource naming
  vpc_name                    = "${local.name_prefix}-vpc"
  cluster_name                = "${local.name_prefix}-cluster"
  node_group_name             = "${local.name_prefix}-node-group"
  db_name                     = "${local.name_prefix}-db"
  redis_name                  = "${local.name_prefix}-redis"
  alb_name                    = "${local.name_prefix}-alb"
  route53_zone_name           = var.domain_name
  
  # Security group names
  eks_sg_name                 = "${local.name_prefix}-eks-sg"
  rds_sg_name                 = "${local.name_prefix}-rds-sg"
  redis_sg_name               = "${local.name_prefix}-redis-sg"
  alb_sg_name                 = "${local.name_prefix}-alb-sg"
  
  # Subnet names
  public_subnet_names         = [for i, az in var.availability_zones : "${local.name_prefix}-public-${az}"]
  private_subnet_names        = [for i, az in var.availability_zones : "${local.name_prefix}-private-${az}"]
  
  # Route table names
  public_rt_name              = "${local.name_prefix}-public-rt"
  private_rt_name             = "${local.name_prefix}-private-rt"
  
  # IAM role names
  eks_cluster_role_name       = "${local.name_prefix}-eks-cluster-role"
  eks_node_group_role_name    = "${local.name_prefix}-eks-node-group-role"
  
  # Subnet group names
  db_subnet_group_name        = "${local.name_prefix}-db-subnet-group"
  redis_subnet_group_name     = "${local.name_prefix}-redis-subnet-group"
  
  # Target group names
  tg_name                     = "${local.name_prefix}-tg"
  
  # Listener names
  http_listener_name          = "${local.name_prefix}-http-listener"
  https_listener_name         = "${local.name_prefix}-https-listener"
  
  # Record names
  route53_record_name         = var.domain_name
  
  # Health check settings
  health_check_path           = "/health"
  health_check_port           = "traffic-port"
  health_check_protocol       = "HTTP"
  health_check_timeout        = 5
  health_check_interval       = 30
  health_check_healthy_threshold   = 2
  health_check_unhealthy_threshold = 2
  
  # Load balancer settings
  alb_deletion_protection     = false
  alb_internal                = false
  
  # SSL settings
  ssl_policy                  = "ELBSecurityPolicy-TLS-1-2-2017-01"
  
  # Database settings
  db_engine                   = "postgres"
  db_engine_version           = "15.4"
  db_storage_type             = "gp3"
  db_storage_encrypted        = true
  db_backup_window            = "03:00-04:00"
  db_maintenance_window       = "sun:04:00-sun:05:00"
  db_skip_final_snapshot      = true
  
  # Redis settings
  redis_engine                = "redis"
  redis_port                  = 6379
  redis_parameter_group_name  = "default.redis7"
  redis_num_cache_nodes       = 1
  
  # EKS settings
  eks_endpoint_private_access = true
  eks_endpoint_public_access  = true
  
  # Scaling settings
  hpa_min_replicas            = 3
  hpa_max_replicas            = 10
  hpa_cpu_target              = 70
  hpa_memory_target           = 80
  
  # Resource limits
  container_memory_request     = "256Mi"
  container_cpu_request        = "250m"
  container_memory_limit       = "512Mi"
  container_cpu_limit          = "500m"
  
  # Probe settings
  liveness_probe_initial_delay_seconds = 30
  liveness_probe_period_seconds        = 10
  liveness_probe_timeout_seconds       = 5
  liveness_probe_failure_threshold     = 3
  
  readiness_probe_initial_delay_seconds = 5
  readiness_probe_period_seconds        = 5
  readiness_probe_timeout_seconds       = 3
  readiness_probe_failure_threshold     = 3
}
