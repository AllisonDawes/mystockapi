# MYSTOCK API

<br>

## Descrição

API de cadastro de produtos, entrada e saída de estoque, com funções simples usando SQL puro para fins de estudo e portfólio.

<br>

## Tecnologias

- NodeJS v20.12.2 <br>
- Express v4.19.2 <br>
- dotenv v16.4.5 <br>
- pg v8.11.5

<br>

## Instrução de instalação e uso

1 - Tenha instalado NodeJS em sua máquina:

https://nodejs.org/en

<br>

2 - Clone o repositório:

```
git clone https://github.com/AllisonDawes/mystockapi
```

<br>

3 - Entre no diretório do projeto e instale as dependências:

```
npm install
```

<br>

4 - Crie um arquivo .env na raiz do projeto para inserir as informações sensiveis de acesso ao banco de dados.

HOST_DB=<br>
PORT_DB=<br>
USER_DB=<br>
PASS_DB=<br>
DATABASE_DB=<br>

<b>Obs: Você deve ter em sua máquina, um banco de dados Postgres.</b>

<br><br>

5 - Após garatir a conexão com o banco de dados, rode o comando abaixo para iniciar a API em modo desenvolvedor:

```
npm run dev
```

<br>

### Rodando a aplicação em modo de produção

<br>

1 - Rode o comando abaixo para compilar o projeto:

```
npm run build
```

<br>

2 - Iniciar API em modo de produção:

```
node ./dist/server.js
```

<br><br><br>

<div align="center">
  <h6>Develpment by DWSoft<h6>
</div>
