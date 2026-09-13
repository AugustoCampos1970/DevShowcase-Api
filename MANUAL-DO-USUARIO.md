# 📖 Manual Prático do Usuário - DevShowcase API

Bem-vindo ao manual da **DevShowcase API**! Este documento foi feito para quem quer entender, ligar e usar a API passo a passo de forma simples, visual e direta.

---

## 🧭 1. Entendendo o que é este Projeto

Este projeto é uma **API (Backend)**. 
- Ele **não é um site visual comum** com botões coloridos e páginas HTML tradicionais.
- Ele funciona como o **cérebro e banco de dados** que guarda informações sobre **Desenvolvedores, Projetos, Tecnologias e Avaliações (Feedbacks)**.
- O formato de texto cheio de chaves `{ ... }` que você vê no navegador se chama **JSON** (a linguagem que os computadores usam para trocar dados).

Para você não ter que digitar códigos complexos para usar a API, nós temos o **Swagger**: uma tela interativa e visual pronta no seu navegador.

---

## ⚡ 2. Como Ligar o Servidor

Toda vez que você quiser usar a API, o servidor precisa estar ligado.

### Passo a passo no Terminal (Prompt de Comando ou PowerShell):

1. Abra o terminal na pasta do projeto:
   ```powershell
   cd C:\Users\Sabino\Desktop\devshowcase-node-api
   ```

2. Digite o comando:
   ```bash
   npm run dev
   ```

3. Você verá mensagens parecidas com estas:
   ```text
   🚀 Server is running on port 3000
   🌐 Base URL: http://localhost:3000
   🏥 Health check: http://localhost:3000/health
   📚 API: http://localhost:3000/api
   📖 Documentation: http://localhost:3000/docs
   ```

> 💡 **Dica:** Para desligar o servidor quando terminar de usar, basta clicar no terminal e apertar as teclas **`Ctrl + C`**.

---

## 🖥️ 3. Acessando a Interface Visual (Swagger)

Com o servidor rodando, abra o seu navegador e acerte neste endereço:

👉 **[http://localhost:3000/docs](http://localhost:3000/docs)**

---

## 🎨 4. Como Usar o Swagger Passo a Passo

No Swagger, as operações são organizadas por categorias (**Profiles**, **Projects**, **Technologies**, **Feedbacks**, **Health**).

### Significado das Cores:
- 🔵 **Azul (GET):** Consulta/busca informações já salvas.
- 🟢 **Verde (POST):** Cadastra novas informações no banco.
- 🟠 **Laranja (PUT):** Altera/atualiza informações existentes (ex: dar like).
- 🔴 **Vermelho (DELETE):** Apaga um registro.

---

### 🧪 Exemplo 1: Como Consultar Dados (GET)

Vamos listar todos os projetos já cadastrados:

1. Clique na linha **`Projects`** para expandir a lista de rotas.
2. Clique no bloco azul **`GET /api/projects`**.
3. No canto direito do bloco, clique no botão cinza **`Try it out`** *(Experimentar)*.
4. Clique no botão grande azul **`Execute`**.
5. Role um pouco a tela para baixo: em **Responses**, você verá a resposta **Code 200** com todos os projetos do banco em formato JSON.

---

### 🧪 Exemplo 2: Como Cadastrar um Novo Desenvolvedor (POST)

1. Clique na linha **`Profiles`**.
2. Clique no bloco verde **`POST /api/profiles`**.
3. Clique no botão **`Try it out`**.
4. Você verá uma caixinha com um texto editável. Altere com seus dados, por exemplo:
   ```json
   {
     "name": "Seu Nome Aqui",
     "bio": "Desenvolvedor Apaixonado por Tecnologia",
     "githubUrl": "https://github.com/seuperfil",
     "avatarUrl": "https://github.com/seuperfil.png"
   }
   ```
5. Clique no botão azul **`Execute`**.
6. Se der certo, aparecerá **Code 201 (Created)** com o seu perfil salvo e o número do seu `id`!

---

### 🧪 Exemplo 3: Como Dar um Like em um Projeto (PUT)

1. Clique na linha **`Projects`**.
2. Clique no bloco laranja **`PUT /api/projects/{id}/upvote`**.
3. Clique em **`Try it out`**.
4. No campo `id`, digite o número do projeto (por exemplo: `1`).
5. Clique em **`Execute`**. O contador de `likes` daquele projeto aumentará em +1!

---

### 🧪 Exemplo 4: Como Avaliar um Projeto (Feedback)

1. Clique na linha **`Feedbacks`**.
2. Clique no bloco verde **`POST /api/projects/{id}/feedbacks`**.
3. Clique em **`Try it out`**.
4. No campo `id`, informe o ID do projeto (ex: `1`).
5. No corpo (body), digite sua avaliação:
   ```json
   {
     "rating": 5,
     "comment": "Excelente projeto, parabéns!",
     "authorName": "Seu Nome"
   }
   ```
6. Clique em **`Execute`**. A média de estrelas (`averageRating`) do projeto será recalculada automaticamente!

---

## 🗄️ 5. Como Ver o Banco de Dados como uma Planilha (Prisma Studio)

Se você preferir ver todas as tabelas, usuários e projetos numa tela tipo **Excel** onde você pode clicar e editar com o mouse:

1. No seu terminal, execute:
   ```bash
   npx prisma studio
   ```
2. O navegador abrirá automaticamente em **[http://localhost:5555](http://localhost:5555)**.
3. Você poderá ver as tabelas `Profile`, `Project`, `Technology` e `Feedback`, alterar dados com dois cliques e adicionar linhas com o botão **`Add record`**.

---

## 🔄 6. Como Resetar o Banco e Restaurar os Dados Iniciais

Se você fizer muitos testes e quiser zerar tudo de volta para o estado original com os 4 projetos de exemplo:

```powershell
node prisma/seed.js
```

---

## ❓ 7. Perguntas Frequentes & Solução de Dúvidas

#### P: O link `localhost:3000` diz que o site não pode ser alcançado.
- **Motivo:** O servidor não está ligado no terminal.
- **Solução:** Abra o terminal na pasta do projeto e execute `npm run dev`.

#### P: Onde fica salvo o banco de dados?
- O banco agora é **SQLite local**, salvo no próprio arquivo `prisma/dev.db`. Não requer instalar nenhum programa pesado de banco externo.

#### P: Como usar essa API em um site ou aplicativo no futuro?
- Qualquer aplicativo frontend (React, Vue, Flutter, Next.js, HTML/JS) pode fazer requisições HTTP (`fetch` ou `axios`) para `http://localhost:3000/api/...` para obter ou salvar dados.
