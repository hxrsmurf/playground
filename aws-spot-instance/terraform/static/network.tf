# aws_vpc.vpc:
resource "aws_vpc" "vpc" {
    cidr_block                           = "172.30.0.0/16"
    enable_dns_hostnames                 = true
    enable_dns_support                   = true
    enable_network_address_usage_metrics = false
    instance_tenancy                     = "default"
    tags                                 = {
        Name = "default"
    }
}

# aws_subnet.main:
resource "aws_subnet" "main" {
    availability_zone                              = "us-east-1e"
    cidr_block                                     = "172.30.4.0/24"
    enable_dns64                                   = false
    enable_resource_name_dns_a_record_on_launch    = false
    enable_resource_name_dns_aaaa_record_on_launch = false
    ipv6_native                                    = false
    map_public_ip_on_launch                        = false
    private_dns_hostname_type_on_launch            = "ip-name"
    tags                                           = {
        Name = "us-east-1e"
    }
    vpc_id                                         = aws_vpc.vpc.id

    timeouts {}
}