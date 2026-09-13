# 📚 Guia Completo: Como Usar a DevShowcase API

Este guia explica passo a passo como configurar, executar e usar a API DevShowcase.

## 📋 Índice
1. [Pré-requisitos](#pré-requisitos)
2. [Configuração Inicial](#configuração-inicial)
3. [Banco de Dados](#banco-de-dados)
4. [Executando a API](#executando-a-api)
5. [Testando a API](#testando-a-api)
6. [Exemplos Práticos](#exemplos-práticos)
7. [Troubleshooting](#troubleshooting)
8. [Deploy em Produção](#deploy-em-produção)

---

## 🛠️ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

### Software Necessário
- **Node.js 18+** - [Download Node.js](https://nodejs.org/)
- **PostgreSQL 14+** - [Download PostgreSQL](https://www.postgresql.org/download/)
- **Git** - [Download Git](https://git-scm.com/)
- **npm** (vem com Node.js)

### Verificando as Instalações
```bash
# Verifique se estão instalados
node --version      # Deve mostrar v18+ 
npm --version       # Deve mostrar v8+
psql --version      # Deve mostrar PostgreSQL 14+
git --version       # Qualquer versão funciona
```

---

## 🚀 Configuração Inicial

### Passo 1: Acesse o Diretório do Projeto
```bash
# Navegue até a pasta do projeto
cd "C:\Users\Sabino\Desktop\devshowcase-node-api"

# Verifique os arquivos
dir  # No Windows
# ou
ls -la  # No Linux/Mac
```

### Passo 2: Instale as Dependências
```bash
# Instale todas as dependências
npm install

# Aguarde a conclusão da instalação
# Isso pode levar alguns minutos
```

### Passo 3: Configure as Variáveis de Ambiente
```bash
# 1. Copie o arquivo de exemplo
copy .env.example .env
# ou no Linux/Mac:
# cp .env.example .env

# 2. Edite o arquivo .env
# Abra o arquivo .env no editor de sua preferência
```

**Conteúdo do arquivo `.env`:**
```env
# Configuração do PostgreSQL
DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/devshowcase_db"

# Configuração do Servidor
PORT=3000
NODE_ENV="development"

# Segurança
JWT_SECRET="sua-chave-secreta-aqui-para-producao"
```

**⚠️ Importante:**
- Substitua `sua_senha` pela senha do seu PostgreSQL
- Se usar usuário diferente de `postgres`, ajuste a URL
- Mantenha `devshowcase_db` como nome do banco

---

## 🗄️ Banco de Dados

### Passo 1: Crie o Banco de Dados
```bash
# Conecte ao PostgreSQL
psql -U postgres

# No prompt do psql, execute:
CREATE DATABASE devshowcase_db;
\q  # Para sair
```

**Alternativa para Windows:**
1. Abra o **SQL Shell (psql)**
2. Pressione Enter para todas as opções padrão
3. Execute:
```sql
CREATE DATABASE devshowcase_db;
```

### Passo 2: Execute as Migrations
```bash
# Execute as migrations do Prisma
npx prisma migrate dev --name init

# Você verá uma mensagem como:
# ✔ The database is now in sync with the schema.
```

### Passo 3: (Opcional) Popule com Dados de Exemplo
```bash
# Execute o script de seed
node prisma/seed.js

# Você verá:
# 🌱 Starting seed...
# ✅ Seed completed successfully!
```

---

## 🚀 Executando a API

### Opção A: Modo Desenvolvimento (Recomendado)
```bash
# Inicie o servidor com reinício automático
npm run dev

# Saída esperada:
# 🚀 Server is running on port 3000
# 📝 Environment: development
# 🌐 Base URL: http://localhost:3000
# 🏥 Health check: http://localhost:3000/health
# 📚 API: http://localhost:3000/api
# 📖 Documentation: http://localhost:3000/docs
```

### Opção B: Modo Produção
```bash
# Inicie o servidor em modo produção
npm start
```

### Verifique se a API está Funcionando
Abra seu navegador ou use cURL:

```bash
# Teste o endpoint de saúde
curl http://localhost:3000/health

# Ou abra no navegador:
# http://localhost:3000/health
```

**Resposta esperada:**
```json
{
  "status": "ok",
  "message": "DevShowcase API is running",
  "timestamp": "2026-09-08T20:15:00.000Z",
  "version": "1.0.0",
  "environment": "development"
}
```

---

## 🧪 Testando a API

### Opção A: Script de Teste Automatizado
```bash
# Execute o script de teste completo
node test-api.js

# O script testará todos os endpoints principais
# e mostrará um relatório no final
```

### Opção B: Teste Manual com Documentação Swagger

1. **Acesse a documentação:**
   - Abra: `http://localhost:3000/docs`
   - Você verá uma interface interativa do Swagger UI

2. **Explore os endpoints:**
   - Clique em cada seção (Profiles, Projects, etc.)
   - Clique em "Try it out" para testar
   - Preencha os dados de exemplo
   - Clique em "Execute"

### Opção C: Teste com cURL

```bash
# 1. Criar um perfil
curl -X POST http://localhost:3000/api/profiles \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ana Developer",
    "bio": "Desenvolvedora Full Stack",
    "githubUrl": "https://github.com/anadev"
  }'

# 2. Criar uma tecnologia
curl -X POST http://localhost:3000/api/technologies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "React"
  }'

# 3. Listar tecnologias
curl http://localhost:3000/api/technologies
```

---

## 📝 Exemplos Práticos

### Fluxo Completo: Criar um Projeto

#### Passo 1: Criar Perfil
```bash
curl -X POST http://localhost:3000/api/profiles \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Carlos Silva",
    "bio": "Especialista em Node.js e APIs REST",
    "githubUrl": "https://github.com/carlossilva",
    "avatarUrl": "https://avatars.githubusercontent.com/u/123456"
  }'
```

**Guarde o ID retornado:** `"id": 1`

#### Passo 2: Criar Tecnologias
```bash
# Crie algumas tecnologias
curl -X POST http://localhost:3000/api/technologies \
  -H "Content-Type: application/json" \
  -d '{"name": "Node.js"}'

curl -X POST http://localhost:3000/api/technologies \
  -H "Content-Type: application/json" \
  -d '{"name": "TypeScript"}'

curl -X POST http://localhost:3000/api/technologies \
  -H "Content-Type: application/json" \
  -d '{"name": "PostgreSQL"}'
```

**Guarde os IDs:** Ex: `[1, 2, 3]`

#### Passo 3: Criar Projeto
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "API de E-commerce",
    "description": "API completa para loja virtual com carrinho, pagamentos e pedidos",
    "repositoryUrl": "https://github.com/carlossilva/ecommerce-api",
    "liveUrl": "https://api-ecommerce.example.com",
    "profileId": 1,
    "technologyIds": [1, 2, 3]
  }'
```

#### Passo 4: Curtir o Projeto
```bash
curl -X PUT http://localhost:3000/api/projects/1/upvote
```

#### Passo 5: Adicionar Feedback
```bash
curl -X POST http://localhost:3000/api/projects/1/feedbacks \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 5,
    "comment": "Excelente projeto! Muito bem estruturado.",
    "authorName": "Maria Santos"
  }'
```

#### Passo 6: Consultar Dados
```bash
# Ver projeto com detalhes
curl http://localhost:3000/api/projects/1

# Listar todos projetos com paginação
curl "http://localhost:3000/api/projects?page=1&limit=10"

# Filtrar por tecnologia
curl "http://localhost:3000/api/projects?technology=Node.js"
```

---

## 🔧 Troubleshooting

### Problema 1: Erro de Conexão com PostgreSQL
```
Error: P1001: Can't reach database server at `localhost:5432`
```
**Solução:**
```bash
# 1. Verifique se PostgreSQL está rodando
# Windows: Serviços → PostgreSQL
# Linux: sudo systemctl status postgresql

# 2. Verifique credenciais no .env
# DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/devshowcase_db"

# 3. Teste a conexão manualmente
psql -U postgres -h localhost -d devshowcase_db
```

### Problema 2: "Prisma not found"
```
'prisma' não é reconhecido como comando interno
```
**Solução:**
```bash
# Reinstale as dependências
npm install

# Ou instale o Prisma globalmente
npm install -g prisma
```

### Problema 3: Erro de Migração
```
Error: Database `devshowcase_db` does not exist
```
**Solução:**
```bash
# 1. Crie o banco manualmente
psql -U postgres -c "CREATE DATABASE devshowcase_db;"

# 2. Execute as migrations novamente
npx prisma migrate dev --name init
```

### Problema 4: Porta em Uso
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solução:**
```bash
# 1. Mude a porta no .env
# PORT=3001

# 2. Ou mate o processo na porta 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID [PID] /F

# Linux/Mac:
lsof -i :3000
kill -9 [PID]
```

---

## 🌐 Deploy em Produção

### Para Deploy na Render.com

1. **Siga o guia completo:** Leia o arquivo `DEPLOY.md`
2. **Resumo rápido:**
   - Crie conta no [Render.com](https://render.com)
   - Conecte repositório GitHub
   - Configure PostgreSQL na Render
   - Defina variáveis de ambiente
   - Deploy automático

### Variáveis de Ambiente para Produção
```env
DATABASE_URL="postgresql://user:senha@host-render:5432/database"
PORT=3000
NODE_ENV="production"
JWT_SECRET="chave-secreta-forte-e-longa"
```

---

## 📱 Usando com Ferramentas Externas

### Postman/Insomnia
1. Importe a documentação: `http://localhost:3000/docs.json`
2. Configure Environment:
   ```json
   {
     "base_url": "http://localhost:3000",
     "api_key": "se necessário"
   }
   ```

### Frontend (React/Angular/Vue)
```javascript
// Exemplo com fetch
const createProfile = async (profileData) => {
  const response = await fetch('http://localhost:3000/api/profiles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
  });
  return response.json();
};
```

---

## 🎯 Comandos Rápidos de Referência

```bash
# Desenvolvimento
npm run dev                    # Inicia servidor
npm run prisma:studio         # Interface visual do banco
npm run prisma:seed           # Popula dados de exemplo

# Banco de Dados
npx prisma migrate dev        # Executa migrations
npx prisma generate          # Gera cliente Prisma
npx prisma db push           # Atualiza schema

# Testes
node test-api.js              # Teste completo
curl http://localhost:3000/health  # Verifica saúde

# Produção
npm start                     # Inicia em produção
npm run prisma:deploy        # Migrations em produção
```

---

## 📞 Suporte

### Logs e Debug
```bash
# Verifique os logs do servidor
# (aparecem no terminal onde npm run dev está rodando)

# Para mais detalhes, ative debug:
NODE_ENV=development npm run dev
```

### Recursos Adicionais
- **Documentação Swagger:** `http://localhost:3000/docs`
- **Prisma Studio:** `npx prisma studio` (interface do banco)
- **GitHub:** [Link do repositório]

---

## 🎉 Próximos Passos

1. ✅ **API funcionando localmente**
2. 🔄 **Teste todos endpoints**
3. 🌐 **Configure deploy em produção**
4. 🔒 **Adicione autenticação JWT** (se necessário)
5. 📊 **Monitore com métricas**

**A API está pronta para uso!** 🚀