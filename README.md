questions-app
===============

Projeto criado para cadastrar perguntas e respostas.

Para executar localmente esta aplicação você deverá baixar o repositório em https://github.com/rlcocate/questions-app.
Existem duas pastas no projeto:

- frontend (React Js)
- backend  (Node Js)

Abrir em um editor de sua preferência (Visual Studio Code por exemplo). Abrir o terminal ou um PowerShell e, em cada diretório, executar o comando abaixo para instalar as dependências:

- <i>'npm install'</i>

Para armazenamento dos dados foi utilizado o MongoDB dentro de um container (Docker).
Ainda no terminal, você deverá executar os seguintes comandos:

1. <i>'docker pull mongo:3.5.7'</i>
2. <i>'docker run --name bexs -it -p 5002:27017 mongo:3.5.7'</i>

As portas foram definas da seguinte forma:
>
> <i>frontend » porta 5000</i>
>
>     src\config\api.js
>
>     variáveis: 
>
>       baseUrl » url para executar a API.
>
> <i>backend  » porta 5001</i>
>
>     src\main\config\env.js 
>
>     variáveis: 
>
>       mongoUrl » url do banco de dados MongoDB.
>
>       port     » porta utilizada pela API.
>
> <i>database » porta 5002</i>
>

Execute o aplicativo em modo de desenvolvimento.
------------------------------------------------

Abra o terminal de comandos (Windows ou PoweShell):

1. Certifique-se de que o Docker esteja executando localmente;
2. Caso não esteja executando o Docker, execute o comando <i>'docker start bexs'</i>;
3. Acesse a pasta do backend e execute o comando <i>'npm start'</i>;
4. Após informar que está em funcionamento, abra um novo terminal de comandos;
5. Acesse a pasta do frontend e execute o comando <i>'npm start'</i>;
6. Por fim poderá ser acessado pelo endereço abaixo:

http://localhost:5000


Existe um arquivo de coleções das requisições. Para realização de testes poderá ser importado este arquivo no Postman:

- backend\postman_environment.json
- backend\postman-collection.json
