# Champions League Manager - Desenvolvimento Web I
 
## Descrição do Projeto
 
Este projeto consiste no desenvolvimento de uma solução "Full Stack" para a gestão da Liga dos Campeões. O sistema permite operar sobre equipas, jogadores, grupos e jogos, bem como registar eventos em tempo real (golos, cartões, assistências).
 
A arquitetura baseia-se numa API REST desenvolvida em **LoopBack 4** (Node.js/TypeScript), consumida por um Backoffice administrativo moderno em **React Admin**. A persistência de dados é garantida por uma base de dados **MySQL**, tirando partido de *Triggers* para cálculos automáticos de classificação. Todo o ambiente está preparado para execução em contentores **Docker**.
 
## Organização do Repositório
 
A estrutura do repositório está organizada da seguinte forma:
 
- **Código Fonte**:
    - **[api/](api/)**: Backend da aplicação (REST API) desenvolvido em LoopBack 4.
    - **[backoffice/](backoffice/)**: Frontend administrativo desenvolvido em React Admin.
    - **[mysql/](mysql/)** e **[mysql-init/](mysql-init/)**: Scripts de inicialização e configuração da Base de Dados.
    - **Dockerfiles**:
        - [Dockerfile da API](api/Dockerfile)
        - [Dockerfile do Backoffice](backoffice/Dockerfile)
        - [Dockerfile da Base de Dados](mysql/Dockerfile)
- **Documentação** na pasta **[doc/](doc/)**:
    - Capítulo 1: [Apresentação do Projeto](doc/c1.md)
    - Capítulo 2: [Recursos](doc/c2.md)
    - Capítulo 3: [Produto](doc/c3.md)
    - Capítulo 4: [Apresentação](doc/c4.md)
 
## Galeria de Resultados
 
| Image  | Description | Image´s preview |
| :---    |    :----:   |          ---: |
| DashBoard | Final result in browser | <img src="doc\images\Dashboard.JPG">   |
| Postman | Final result in Postman | <img src="">  |
| Docker  | Multicontainer-App final result in Docker | <img src="doc\images\Docker_App.JPG" width="300">    |
 
## Tecnologias Utilizadas
 
As principais tecnologias e bibliotecas utilizadas neste projeto foram:
 
### Backend & Base de Dados
- **[Node.js](https://nodejs.org/)**
- **[LoopBack 4](https://loopback.io/)**
- **[MySQL](https://www.mysql.com/)**
 
### Frontend
- **[React Admin](https://marmelab.com/react-admin/)**
- **[React.js](https://reactjs.org/)**
- **[Material UI](https://mui.com/)**
 
### DevOps & Ferramentas
- **[Docker](https://www.docker.com/)**
- **[OpenAPI](https://www.openapis.org/)**

## Como Executar 

### Pré-requisitos
- Node.js e npm
- Docker
 
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
 
* **Capítulo 1**: [Descrição do Projeto](doc/c1.md)
* **Capítulo 2**: [Recursos](doc/c2.md)
* **Capítulo 3**: [Produto](doc/c3.md) 
* **Capítulo 4**: [Apresentação](doc/c4.md)
 
## Equipa
 
* Rodrigo Esteves [@Rodrigo-Esteves13](https://github.com/Rodrigo-Esteves13)
* Ricardo Dias [@ricardodias06](https://github.com/ricardodias06)
* Romeu Pinto  [@a047610](https://github.com/a047610)