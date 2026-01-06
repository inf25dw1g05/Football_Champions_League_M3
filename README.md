# Champions League Manager - Desenvolvimento Web I
 
## Descrição do Projeto
 
Este projeto consiste no desenvolvimento de uma solução "Full Stack" para a gestão da Liga dos Campeões. O sistema permite operar sobre equipas, jogadores, grupos e jogos, bem como registar eventos em tempo real (golos, cartões, assistências).
 
A arquitetura baseia-se numa API REST desenvolvida em **LoopBack 4** (Node.js/TypeScript), consumida por um Backoffice administrativo moderno em **React Admin**. A persistência de dados é garantida por uma base de dados **MySQL**, tirando partido de *Triggers* para cálculos automáticos de classificação. Todo o ambiente está preparado para execução em contentores **Docker**.
 
## Organização do Repositório
 
A estrutura do repositório está organizada da seguinte forma:
 
* **Código Fonte**:
    * **[api/](api/)**: Backend da aplicação (REST API) desenvolvido em LoopBack 4.
    * **[backoffice/](backoffice/)**: Frontend administrativo desenvolvido em React Admin.
    * **[mysql/](mysql/)** e **[mysql-init/](mysql-init/)**: Scripts de inicialização e configuração da Base de Dados.
    * **Dockerfiles**:
        * [Dockerfile da API](api/Dockerfile)
        * [Dockerfile do Backoffice](backoffice/Dockerfile)
        * [Dockerfile da Base de Dados](mysql/Dockerfile)
* **Documentação** na pasta **[doc/](doc/)**:
    * Capítulo 1: [Apresentação do Projeto](doc/c1.md)
    * Capítulo 2: [Recursos](doc/c2.md)
    * Capítulo 3: [Produto](doc/c3.md)
    * Capítulo 4: [Apresentação](doc/c4.md)
 
## Galeria de Resultados
 
| Contexto | Descrição | Pré-visualização |
| :--- | :---: | ---: |
| **Backoffice** | Dashboard Geral (React Admin) | <img src="doc/images/dashboard_preview.png" width="300"> |
| **API** | API Explorer (OpenAPI/Swagger) | <img src="doc/images/api_explorer.png" width="300"> |
| **Mobile** | Interface Responsiva | <img src="doc/images/mobile_view.png" width="300"> |
 
*(Nota: As imagens acima são ilustrativas, certifica-te de que existem na pasta doc/images)*
 
## Tecnologias Utilizadas
 
As principais tecnologias e bibliotecas utilizadas neste projeto foram:
 
### Backend & Base de Dados
* **[Node.js](https://nodejs.org/)**: Ambiente de execução JavaScript.
* **[LoopBack 4](https://loopback.io/)**: Framework TypeScript para construção de APIs e Microserviços.
* **[MySQL](https://www.mysql.com/)**: Sistema de gestão de base de dados relacional.
 
### Frontend
* **[React Admin](https://marmelab.com/react-admin/)**: Framework para construção de aplicações B2B sobre APIs REST.
* **[React.js](https://reactjs.org/)**: Biblioteca para construção de interfaces de utilizador.
* **[Material UI](https://mui.com/)**: Biblioteca de componentes visuais.
 
### DevOps & Ferramentas
* **[Docker](https://www.docker.com/)**: Plataforma de contentorização.
* **[OpenAPI](https://www.openapis.org/)**: Especificação para documentação da API.
 
## Como Executar
 
### Pré-requisitos
* Node.js e npm
* Docker (opcional, mas recomendado)
 
### Instalação Rápida (Local)
 
1.  **Base de Dados**: Importar os scripts da pasta `mysql-init/` para o teu servidor MySQL.
2.  **API**:
    ```bash
    cd api
    npm install
    npm start
    ```
3.  **Backoffice**:
    ```bash
    cd backoffice
    npm install
    npm start
    ```
 
## Relatório
 
O relatório completo do projeto encontra-se dividido nos seguintes capítulos:
 
* **Capítulo 1**: [Apresentação do Projeto](doc/c1.md) - Enquadramento e objetivos.
* **Capítulo 2**: [Recursos](doc/c2.md) - Análise de requisitos e tecnologias.
* **Capítulo 3**: [Produto](doc/c3.md) - Desenvolvimento, instalação e detalhes técnicos.
* **Capítulo 4**: [Apresentação](doc/c4.md) - Conclusões e trabalho futuro.
 
## Equipa
 
* Rodrigo Esteves [@Rodrigo-Esteves13](https://github.com/Rodrigo-Esteves13)
* Ricardo Dias [@ricardodias06](https://github.com/ricardodias06)
* Romeu Pinto  [@a047610](https://github.com/a047610)