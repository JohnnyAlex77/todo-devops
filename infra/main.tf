terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Security Group: SSH + App
resource "aws_security_group" "todo_sg" {
  name        = "todo-sg"
  description = "Permite SSH y trafico de la app"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "App"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "todo-sg"
  }
}

# Key pair (se sube la clave publica local)
resource "aws_key_pair" "todo_key" {
  key_name   = var.key_name
  public_key = file(var.public_key_path)
}

# AMI Ubuntu 22.04 (us-west-2)
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# Instancia EC2 con LabInstanceProfile (preexistente en Learner Lab)
resource "aws_instance" "todo_ec2" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type
  key_name               = aws_key_pair.todo_key.key_name
  vpc_security_group_ids = [aws_security_group.todo_sg.id]
  iam_instance_profile   = var.instance_profile_name

  user_data = <<-EOF
    #!/bin/bash
    apt-get update -y
    apt-get install -y docker.io docker-compose-plugin git
    systemctl start docker
    systemctl enable docker
    usermod -aG docker ubuntu
    mkdir -p /home/ubuntu/todo-devops
    chown ubuntu:ubuntu /home/ubuntu/todo-devops
  EOF

  tags = {
    Name = "todo-ec2"
  }
}