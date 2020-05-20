# questions-app

Projeto criado para cadastrar perguntas e respostas.

Para executar localmente esta aplicação você deverá baixar o repositório em https://github.com/rlcocate/questions-app.
Existem duas pastas no projeto:

# frontend (React Js)
# backend  (Node Js)

Abrir em um editor de sua preferência (Visual Studio Code por exemplo). Abrir o terminal ou um PowerShell e, em cada diretório, executar o comando abaixo para instalar as dependências:

## 'npm install'

Será necessário subir uma imagem no docker para o banco de dados. Foi utilizada a imagem MongoDB.

Ainda no terminal, você deverá executar os seguintes comandos:

## 1 'docker pull mongo:3.5.7'
## 2 'docker run --name bexs -it -p 5002:27017 mongo:3.5.7'

As portas foram definas da seguinte forma:

# frontend --> porta 5000
# backend  --> porta 5001
# database --> porta 5002

Execute o aplicativo em modo de desenvolvimento.

# http://localhost:5000

Existe um arquivo de coleções das requisições. Para realização de testes poderá ser importado este arquivo no Postman:

# backend\postman-collection.json