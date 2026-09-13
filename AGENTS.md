# Regras do Repositorio

## Autoria

Todos os commits deste repositorio devem ser feitos exclusivamente por um destes autores:

| Pessoa | E-mail |
|---|---|
| Augusto Campos | `1977campos7@gmail.com` |
| Janayna Nascimento | `janayna.nasc2022@gmail.com` |
| F. Silva | `fsilvasmbg@gmail.com` |
| Mara Rakel | `mara.rakel2016@outlook.com` |

## Como configurar o Git localmente

Cada pessoa deve rodar uma vez dentro da pasta do projeto:

```bash
git config user.name  "Seu Nome"
git config user.email "seu@email.com"
```

A configuracao fica salva em `.git/config` (apenas neste repositorio) e nao afeta outros projetos.

## Como commitar com autor diferente

Se quem esta digitando for uma pessoa, mas o commit precisa sair com o nome de outra (por exemplo, integrou arquivos de um colega via pendrive):

```bash
git add arquivo.jsx
git commit --author="Nome Do Colega <colega@email.com>" -m "feat: descricao do trabalho"
```

## Protecao automatica

Existe um hook em `.git/hooks/pre-commit` que verifica se o `user.email` local corresponde a um dos autores autorizados acima. O hook so funciona para a pessoa que esta rodando os comandos localmente.