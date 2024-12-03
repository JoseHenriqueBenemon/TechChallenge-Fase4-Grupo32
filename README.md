# Projeto Postagem
Este é o código de um projeto mobile feito em React Native, consumindo o [Back-END](http://github.com/JoseHenriqueBenemon/TechChallenge-Fase2-Grupo32) e fazendo um CRUD simples.

# Setup Inicial 

O projeto usa 3 principais bibliotecas para funcionar:

  - [Async Storage](https://www.npmjs.com/package/@react-native-async-storage/async-storage) - Biblioteca para armazenamento assíncrono e persistente de dados chave-valor.
  - [Native Stack](https://www.npmjs.com/package/@react-navigation/native-stack) - Native Stack fornece navegação nativa baseada em pilha para transições rápidas e fluidas entre telas.
  - [styled-components](https://www.npmjs.com/package/styled-components) - O Styled Components é utilizado quando você quer estilizar suas páginas a base de Tags dentro de arquivos .ts ou .tsx.
  - [Vector Icons](https://www.npmjs.com/package/react-native-vector-icons) - Conjunto de ícones vetoriais personalizáveis para uma aplicação em React Native.
  - [axios](https://www.npmjs.com/package/axios) - Para conseguir integrar o back-end com o front-end do projeto o Axios faz a requisições HTTP com os métodos do CRUD.

# Arquitetura da Aplicação

```
src/
|
├── components/
├── screens/
├── types/
├── utils/
|
└── App.tsx
```

Components: Nesta pasta, todos os componentes do sistema são definidos dentro da páginas.
Screens: Todas as telas que são renderizadas para o usuário, tanto dos professores quanto dos alunos.
types: Define os arquivos de interface para auxiliar na organização dos códigos.
Utils: Arquivos que são utilizados como padrões dentro do types.

App.jsx: Tela onde todos os components são carregados para renderização.

# Guia de Uso

Para conseguir rodar o projeto você precisa estar com o backend e o banco de dados rodando na porta 3000.

Quando o lado do servidor estiver ligado podemos dar os primeiros passos no projeto.

  - Instale os pacotes: Devemos utilizar o comando `npm install` dentro do cmd do Visual Studio Code.
  - Rodando a aplicação: Com os pacotes instalados podemos utilizar o comando `npx expo start` para visualizar a aplicação no dispositivo desejado.
