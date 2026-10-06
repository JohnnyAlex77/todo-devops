variable "aws_region" {
  description = "Region de AWS (Learner Lab usa us-west-2)"
  type        = string
  default     = "us-west-2"
}

variable "instance_type" {
  description = "Tipo de instancia EC2 (t2.micro es elegible para capa gratuita)"
  type        = string
  default     = "t2.micro"
}

variable "key_name" {
  description = "Nombre del key pair en AWS"
  type        = string
  default     = "todo-key"
}

variable "public_key_path" {
  description = "Ruta local a la clave publica SSH"
  type        = string
  default     = "~/.ssh/id_rsa.pub"
}

variable "instance_profile_name" {
  description = "Nombre del instance profile preexistente en Learner Lab"
  type        = string
  default     = "LabInstanceProfile"
}