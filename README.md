# Contacts App

Uma aplicação web simples para gerênciar contatos. Cada contato pode possuir as seguintes informações: nome, gênero, data de nascimento, email e telefone.

## Front-end

TODO

## Back-end

O módulo back-end dessa aplicação utiliza [Spring Boot](https://spring.io/projects/spring-boot/) e [Spring Data Rest](https://projects.spring.io/spring-data-rest/) para gerar uma API Rest que persiste os dados em um banco de dados [H2](http://www.h2database.com/) em memória.

O código da aplicação é feito em [Kotlin](https://kotlinlang.org/), que roda em cima da JVM. A build da aplicação, assim como o gerênciamento das suas dependências, e feita pelo [Gradle](https://gradle.org/). Para rodar a aplicação, execute o comando abaixo dentro do diretório `backend`:

```bash
./gradlew bootRun
```

Ou no Windows, a seguinte variação:

```bash
gradlew bootRun
```

Quando iniciada com sucesso a aplicação estará disponível na porta `8080`.

Como uma API Rest tradicional, as seguintes opções estão disponíveis:

| Método | URL                                 | Descrição                                 |
|--------|-------------------------------------|-------------------------------------------|
| GET    | http://localhost:8080/contacts      | Lista os contatos cadastrados             |
| GET    | http://localhost:8080/contacts/{id} | Retorna os dados de um contato            |
| POST   | http://localhost:8080/contacts      | Permite cadastrar um novo contato         |
| PUT    | http://localhost:8080/contacts/{id} | Atualiza os dados completos de um contato |
| PATCH  | http://localhost:8080/contacts/{id} | Permite atualizar os dados parcialmente   |
| DELETE | http://localhost:8080/contacts/{id} | Apaga um contato cadastrado               |
