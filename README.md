# DevShowcase API - Node.js/Express + Prisma + PostgreSQL

API REST completa para vitrine de projetos de desenvolvedores, construída com Node.js, Express, Prisma ORM e SQLite.

> 📖 **Procurando um passo a passo simples?** Veja o [MANUAL-DO-USUARIO.md](MANUAL-DO-USUARIO.md) para aprender a ligar o servidor e usar o Swagger interativo no navegador!

## 📋 Requisitos

- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

## 🚀 Como Rodar Localmente

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd devshowcase-node-api
```

### 2. Configure as variáveis de ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o .env com suas configurações
# DATABASE_URL="postgresql://usuario:senha@localhost:5432/devshowcase_db"
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure o banco de dados

```bash
# Crie o banco de dados PostgreSQL
createdb devshowcase_db

# Execute as migrations do Prisma
npx prisma migrate dev --name init
```

### 5. Inicie o servidor

```bash
# Modo desenvolvimento (com nodemon)
npm run dev

# Modo produção
npm start
```

## 📊 Banco de Dados

### Diagrama de Entidades

```
Profile (1) ──── (N) Project (N) ──── (N) Technology
                       │
                      (1)
                       │
                      (N)
                    Feedback
```

### Tabelas

- **profiles**: Perfis de desenvolvedores
- **projects**: Projetos cadastrados
- **technologies**: Tecnologias utilizadas
- **feedbacks**: Avaliações dos projetos
- **project_technologies**: Relacionamento muitos-para-muitos entre projetos e tecnologias

## 🔧 Endpoints da API

### Perfis (Profiles)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/profiles` | Cadastrar perfil |
| GET | `/api/profiles` | Listar todos os perfis |
| GET | `/api/profiles/:id` | Buscar perfil por ID |

### Tecnologias (Technologies)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/technologies` | Cadastrar tecnologia |
| GET | `/api/technologies` | Listar todas as tecnologias |
| GET | `/api/technologies/:id` | Buscar tecnologia por ID |

### Projetos (Projects)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/projects` | Cadastrar projeto |
| GET | `/api/projects` | Listar projetos (com filtros e paginação) |
| GET | `/api/projects/:id` | Buscar projeto por ID |
| PUT | `/api/projects/:id/upvote` | Curtir/upvote em projeto |

### Feedbacks

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/projects/:id/feedbacks` | Adicionar feedback a projeto |
| GET | `/api/projects/:projectId/feedbacks` | Listar feedbacks de um projeto |
| GET | `/api/feedbacks/:id` | Buscar feedback por ID |
| GET | `/api/projects/:projectId/average-rating` | Obter média de avaliações |

## 🧪 Validações Implementadas

### Profile
- Nome obrigatório
- URL do avatar e GitHub devem ser URLs válidas

### Technology
- Nome obrigatório e único

### Project
- Título obrigatório
- URLs de repositório e deploy devem ser válidas
- ID do perfil obrigatório
- Pelo menos uma tecnologia obrigatória

### Feedback
- Avaliação entre 1-5
- Nome do autor obrigatório

## 🚀 Deploy em Produção

### 1. Banco de dados em nuvem (Supabase/Render)

```bash
# Configure a DATABASE_URL no .env de produção
DATABASE_URL="postgresql://user:password@host:5432/database"
```

### 2. Deploy na Render

1. Conecte seu repositório GitHub ao Render
2. Configure as variáveis de ambiente
3. Configure o comando de build: `npm install && npx prisma generate`
4. Configure o comando de start: `npm start`

### 3. Migrations em produção

```bash
npx prisma migrate deploy
```

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia com nodemon

# Produção
npm start           # Inicia o servidor
npm run build       # Compila TypeScript (se aplicável)

# Banco de dados
npm run prisma:generate  # Gera cliente Prisma
npm run prisma:migrate   # Executa migrations
npm run prisma:studio    # Abre Prisma Studio
npm run prisma:deploy    # Executa migrations em produção

# Testes
npm test            # Executa testes
npm run test:watch  # Executa testes em modo watch
```

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Prisma** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **Zod** - Validação de dados
- **Helmet** - Segurança HTTP
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Gerenciamento de variáveis de ambiente

## 📁 Estrutura do Projeto

```
devshowcase-node-api/
├── src/
│   ├── controllers/     # Controladores das rotas
│   ├── services/        # Lógica de negócio
│   ├── repositories/    # Camada de acesso a dados
│   ├── dtos/           # Objetos de transferência de dados
│   ├── middlewares/    # Middlewares customizados
│   ├── routes/         # Definição de rotas
│   └── server.js       # Ponto de entrada da aplicação
├── prisma/
│   ├── schema.prisma   # Schema do banco de dados
│   └── migrations/     # Migrations do banco
├── .env.example        # Exemplo de variáveis de ambiente
├── .gitignore          # Arquivos ignorados pelo Git
├── package.json        # Dependências e scripts
└── README.md           # Documentação
```

## 🔍 Testando a API

### Health Check

```bash
curl http://localhost:3000/health
```

### Criar um perfil

```bash
curl -X POST http://localhost:3000/api/profiles \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "bio": "Desenvolvedor Full Stack",
    "githubUrl": "https://github.com/joaosilva"
  }'
```

### Criar uma tecnologia

```bash
curl -X POST http://localhost:3000/api/technologies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Node.js"
  }'
```

### Criar um projeto

```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "API de Portfólio",
    "description": "API REST para portfólio de desenvolvedores",
    "repositoryUrl": "https://github.com/joaosilva/devshowcase-api",
    "profileId": 1,
    "technologyIds": [1, 2]
  }'
```

## 📄 Licença

Este projeto é parte de um trabalho acadêmico.