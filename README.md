<h1 align="center">
  nestjs-boilerplate
</h1>
<p align="center">
    <a href="https://nodejs.org/en/" target="blank">
        <img src="https://img.shields.io/badge/nodejs-v20.x-green" alt="Node.js" />
    </a>
    <a href="https://www.typescriptlang.org/" target="blank">
        <img src="https://img.shields.io/badge/typescript-5.1.3-blue" alt="Typescript"/>
    </a>
    <a href="https://nestjs.com/" target="blank">
        <img src="https://img.shields.io/badge/nestjs-v10.0.10-red" alt="NestJS"/>
    </a>
</p>
<p align="justify">
    Projeto boilerplate para uma API usando NestJs.
</p>

## Pré-requisito

Para iniciar a aplicação, certifique-se de que os requisitos abaixo sejam atendidos:

- instalação do docker;
- instalação do docker-compose;

## Instalação

```bash
$ docker-compose build
```

## Executando a aplicação

```bash
$ docker-compose up
```

A aplicação é executada em:

- http://localhost:3000/

## Testes

Para executar os testes, execute os comandos abaixo:

```bash
# acessando o container:
$ docker-compose exec node sh
# rodando os testes
$ yarn test
```
