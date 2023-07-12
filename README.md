# TP-Personajes-Ort
Utiliza **Nodemon**, **Express**, **SQL**, **Swagger**

Requisitos: Tener Instaladas las tecnologias mencionadas anteriormente

Autenticacion: Bearer token mediante [jwt](https://jwt.io/) strategy.  

1. Clonar / Descargar el Repositorio
   
```bash
 git clone https://github.com/FedeChediex/TP-Personajes-Ort.git
```
2. Instalar las dependencias
```bash
npm i 
```

3. Abir sql, conectar y copiar el  **Server Name**

![](/ReadmeImg/Sql-Server-Name.PNG)

4. Abir el archivo **.env** y *pegar* el server name en ***DB_SERVER***
5. En el sql Correr el script "***TP-Personajes.sql***" y luego el "***01 - CreateLoginAndUser.sql***"

6. Correr el proyecto
```bash
npm run watch
```	
7. Si queres probar el proyecto hay un archivo [Swagger](./SwaggerPersonajes.yaml) de swagger y otro de [Postman](./TP_PERSONAJES.postman_collection.json)


    
