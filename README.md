# API REST de Videojuegos

**Autor:** Yerko Angulo Ruiz  
**Curso:** 1º DAM - LMSGI  
**Centro:** Staff Formación

---

## ¿Qué es esto?

Es un servidor backend que hice para gestionar un catálogo de videojuegos y sus reseñas. Básicamente guardas información de juegos (nombre, precio, puntuación, etc.) y la gente puede escribir opiniones sobre ellos.

Funciona sin base de datos complicada, todo en memoria, así que es perfecto para practicar y entender cómo funcionan las APIs REST sin tocarse la cabeza.

## Cómo ponerlo a funcionar

### Lo que necesitas
- Node.js instalado (si no lo tienes, lo descargas de nodejs.org)
- Una terminal

### Pasos

1. Clona o descarga este repositorio
2. Abre la terminal en la carpeta del proyecto
3. Instala Express (si no lo tienes):
   ```
   npm install express
   ```
4. Arranca el servidor:
   ```
   node index.js
   ```
5. Si todo va bien, verás esto:
   ```
   Servidor iniciado en http://localhost:3000
   ```

Listo, el servidor está corriendo. Ahora puedes hacer peticiones HTTP contra él.

## Endpoints — Lo que puedes hacer

### Con los Videojuegos

**Traer todos los juegos**
```
GET /videojuegos
```
Devuelve la lista completa de todos los videojuegos guardados.

**Buscar un juego por ID**
```
GET /videojuegos/1
```
Te devuelve solo el juego con id 1.

**Buscar por nombre**
```
GET /videojuegos/buscar/nombre?nombre=balatro
```
Busca cualquier juego que tenga "balatro" en el nombre. No importa si escribes mayúsculas.

**Añadir un juego nuevo**
```
POST /videojuegos
```
Necesitas mandar estos datos en el body (en JSON):
- nombre (obligatorio)
- género (obligatorio)
- plataforma (obligatorio)
- estudio (obligatorio)
- fechaLanzamiento (opcional)
- precio (opcional)
- puntuacion (opcional)
- disponible (opcional, por defecto true)

Ejemplo:
```json
{
  "nombre": "The Legend of Zelda",
  "genero": "Aventura",
  "plataforma": "Nintendo Switch",
  "estudio": "Nintendo",
  "precio": 59.99,
  "puntuacion": 9.2
}
```

**Modificar un juego**
```
PUT /videojuegos/1
```
Cambias solo lo que quieras de ese juego. No tienes que mandar todos los campos, solo los que modificas.

Ejemplo (solo cambiar el precio):
```json
{
  "precio": 49.99
}
```

**Eliminar un juego**
```
DELETE /videojuegos/1
```
Borra el juego con id 1 de la lista.

### Filtros y búsquedas

**Filtrar por disponibilidad**
```
GET /videojuegos/filtrar/disponible?disponible=true
```
Te devuelve solo los juegos disponibles. Si pones `false` devuelve los no disponibles.

**Filtrar por rango de precio**
```
GET /videojuegos/filtrar/precio?precioMin=10&precioMax=60
```
Te trae los juegos que cuesten entre 10 y 60 euros. Puedes poner solo `precioMin` o solo `precioMax` si quieres.

**Ordenar por puntuación**
```
GET /videojuegos/ordenar/puntuacion?direccion=desc
```
Ordena todos los juegos de mejor a peor puntuación. Si pones `asc` los ordena de peor a mejor.

### Estadísticas

**Puntuación media**
```
GET /videojuegos/stats/media
```
Te calcula la puntuación promedio de todos los juegos.

**El mejor y el peor**
```
GET /videojuegos/stats/extremos
```
Te dice cuál es la máxima puntuación y cuál es la mínima.

**Top N juegos**
```
GET /videojuegos/stats/top?n=3
```
Te devuelve los 3 mejores juegos. Cambia el 3 por el número que quieras.

**Total de cosas**
```
GET /stats/totales
```
Te cuenta cuántos videojuegos y cuántas reseñas hay en total.

### Con las Reseñas

**Ver todas las reseñas**
```
GET /resenas
```
Lista completa de todas las reseñas de todos los juegos.

**Ver una reseña específica**
```
GET /resenas/1
```
Solo la reseña con id 1.

**Reseñas de un juego**
```
GET /resenas/videojuego/balatro
```
Todas las reseñas que la gente escribió del juego "balatro".

**Buscar reseñas por palabra clave**
```
GET /resenas/buscar?texto=adictivo
```
Encuentra todas las reseñas que contengan la palabra "adictivo" en el comentario.

**Escribir una reseña**
```
POST /resenas
```
Necesitas mandar:
- videojuegoId (cuál es el juego que reseñas)
- autor (quién eres)
- comentario (qué piensas)
- nota (puntuación, de 1 a 10)
- fecha (opcional, se genera automáticamente)

Ejemplo:
```json
{
  "videojuegoId": 1,
  "autor": "Carlos",
  "comentario": "Muy bueno, me enganchó",
  "nota": 9
}
```

**Borrar una reseña**
```
DELETE /resenas/1
```
Elimina la reseña con id 1.

## Códigos HTTP — ¿Qué significa cada número?

- **200 OK** = Todo perfecto, la petición funcionó
- **201 Created** = Se creó algo nuevo correctamente
- **400 Bad Request** = Metiste mal los datos o falta algo obligatorio
- **404 Not Found** = No existe lo que buscas
- **500 Internal Server Error** = Algo se rompió en el servidor

## Estructura de los datos

### Un videojuego tiene:
- id (número único)
- nombre
- género
- plataforma
- estudio
- fechaLanzamiento (formato dd-mm-yyyy)
- precio
- puntuación (de 0 a 10)
- disponible (true o false)

### Una reseña tiene:
- id (número único)
- videojuegoId (a qué juego le pertenece)
- autor (quién la escribió)
- comentario (el texto)
- nota (puntuación de 1 a 10)
- fecha (cuándo se escribió)

## Importante — Los datos no se guardan

Los datos se almacenan en memoria, así que cuando reinicias el servidor todo desaparece. Es solo para testing y aprender. Si quisieras algo permanente, necesitarías una base de datos de verdad.

## Cómo probar esto

Usa Bruno (o Postman, o lo que prefieras) para hacer peticiones HTTP a `http://localhost:3000`. Ya tiene una colección lista con todos los endpoints para que no tengas que crear nada manualmente.

## Tecnología

- **Node.js** — El runtime para ejecutar JavaScript en el servidor
- **Express** — El framework que simplifica crear APIs REST

---

**Trabajo final de LMSGI 1º DAM**  
Desarrollo de una API REST completa con Node.js y Express