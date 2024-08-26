# Desafio Técnico Pomar

Este é um projeto desenvolvido para o desafio técnico Pomar, utilizando NestJS, TypeORM, MySQL e Docker.

## Tecnologias Utilizadas

- **NestJS**: Framework para construção de aplicações backend eficientes e escaláveis.
- **TypeORM**: Biblioteca ORM para TypeScript e JavaScript.
- **MySQL**: Sistema de gerenciamento de banco de dados relacional.
- **Docker**: Plataforma para desenvolvimento e execução de aplicações em contêineres.

## Modelo Entidade Relacional

![Modelo Entidade Relacional](https://i.imgur.com/76ocWlh.png)

## Requisitos

- **Node** (testado na versão v20.16.0)
- **CLI do NestJS Global**: Instale com `npm install -g @nestjs/cli`
- **Docker**

## Instalação

Siga as etapas abaixo para instalar e configurar o projeto:

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITÓRIO>
   ```

2. Crie um arquivo `.env` na raiz do projeto com as seguintes propriedades, preenchendo com os valores apropriados:
   ```
   MYSQL_ROOT_USER=<valor>
   MYSQL_ROOT_PASSWORD=<valor>
   MYSQL_LOCAL_PORT=<valor>
   MYSQL_DOCKER_PORT=<valor>
   ```

3. Execute o arquivo `docker-compose` para instanciar o banco de dados MySQL:
   ```bash
   docker-compose up -d
   ```

4. Conecte-se à instância recém-criada do MySQL e crie o schema, executando os comandos do arquivo `create-database.sql`, localizado na raiz do projeto.

5. Após a execução dos comandos anteriores, instale as dependências necessárias do projeto:
   ```bash
   cd app
   npm install
   ```

6. Execute a aplicação:
   ```bash
   npm run start:dev
   ```

## Acesso à Aplicação

- **API**: [http://localhost:3000/api](http://localhost:3000/api)
- **Documentação do Swagger**: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
