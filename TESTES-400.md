# Passo a passo: Como testar a API no Swagger

## Passo 1 - Abra o site
Abra no navegador: https://devshowcase-api-4skh.onrender.com/docs/

## Passo 2 - Clique em um endpoint
Clique na barra que diz "POST /api/profiles" (ela expande)

## Passo 3 - Clique em "Try it out"
Botao azul no canto inferior direito

## Passo 4 - Cole o codigo
Apague tudo que tem na caixa e cole:
{"name": ""}

## Passo 5 - Clique em "Execute"
Botao azul abaixo da caixa

## Passo 6 - Veja o resultado
Abaixo aparece "Server response" com codigo 400 e a mensagem de erro

---

## Exemplos para copiar e colar

### Teste 1 - Erro 400 (Perfil sem nome)
Endpoint: POST /api/profiles
Codigo:
{"name": ""}

### Teste 2 - Erro 400 (URL invalida)
Endpoint: POST /api/profiles
Codigo:
{"name": "Teste", "githubUrl": "nao-e-uma-url"}

### Teste 3 - Erro 400 (Rating invalido)
Endpoint: POST /api/projects/1/feedbacks
Codigo:
{"rating": 10, "authorName": "Joao"}

### Teste 4 - Erro 404 (Projeto nao existe)
Endpoint: GET /api/projects/999
Codigo: (nenhum, so clica em Execute)

### Teste 5 - Sucesso 200 (Health check)
Endpoint: GET /health
Codigo: (nenhum, so clica em Execute)
