output "instance_public_ip" {
  description = "IP publica de la instancia EC2"
  value       = aws_instance.todo_ec2.public_ip
}

output "app_url" {
  description = "URL de la aplicacion"
  value       = "http://${aws_instance.todo_ec2.public_ip}:3000"
}

output "ssh_command" {
  description = "Comando SSH para conectarse"
  value       = "ssh -i ~/.ssh/id_rsa ubuntu@${aws_instance.todo_ec2.public_ip}"
}