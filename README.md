# Lista de Tareas Simple - Proyecto DevOps

Aplicación web mínima que permite crear, listar, actualizar y eliminar tareas.
Implementa un flujo DevOps completo: Git, CI/CD, contenedores Docker e Infraestructura como Código (Terraform + AWS).

## Tecnologías

- Node.js 18 + Express
- PostgreSQL 15
- Docker + Docker Compose
- GitHub Actions (CI/CD)
- Terraform (AWS EC2)

## Estructura del proyecto

\`\`\`
/
├── app/                  # Código fuente
├── tests/                # Pruebas automatizadas
├── .github/workflows/    # Pipeline CI/CD
├── docker/               # Dockerfile y docker-compose
├── infra/                # Terraform (IaC)
└── README.md
\`\`\`

## Ejecución local

1. Clonar el repositorio.
2. Crear archivo `.env` con las variables:
   \`\`\`
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=todo_user
   DB_PASSWORD=todo_pass
   DB_NAME=todo_db
   PORT=3000
   \`\`\`
3. Levantar con Docker Compose:
   \`\`\`bash
   docker-compose -f docker/docker-compose.yml up -d
   \`\`\`
4. Acceder a http://localhost:3000/tareas

## Pipeline CI/CD

- **CI:** se ejecuta en cada push y pull request a `main`. Corre lint, tests y build de imagen.
- **CD:** se ejecuta al crear un tag `v*`. Publica la imagen en Docker Hub y despliega en EC2 vía SSH.

## Infraestructura como Código

\`\`\`bash
cd infra
terraform init
terraform plan
terraform apply
\`\`\`

Para destruir el ambiente:

\`\`\`bash
terraform destroy
\`\`\`

## Secretos necesarios en GitHub

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`
- `SSH_HOST`
- `SSH_USER`
- `SSH_PRIVATE_KEY`

## Roles del equipo

- **[Integrante 1]**: Líder DevOps / IaC
- **[Integrante 2]**: Desarrollo / Contenedores
- **[Integrante 3]**: QA / Documentación