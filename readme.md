# React JS

## 1. Instalando JSON-SERVER

> npm i json-server

Luego creamos en la raiz un archivo "db.json"

```json
{
	"posts": [{ "id": 1, "title": "json-server", "author": "typicode" }],
	"comments": [{ "id": 1, "body": "some comment", "postId": 1 }],
	"profile": { "name": "typicode" }
}
```

Para iniciar el servidor Json-server ejecutar el siguiente comando

> json-server --watch db.json --port 4000

Luego para visualizar en explorador web:

> http://localhost:3000/posts/1

Nos muestra el siguiente resultado:

```json
{ "id": 1, "title": "json-server", "author": "typicode" }
```
