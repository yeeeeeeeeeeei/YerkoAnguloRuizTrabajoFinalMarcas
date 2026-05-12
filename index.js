const express = require('express');

const app = express();
const PORT = 3000;

// Activamos express.json() para que el servidor pueda leer el body de las peticiones en formato JSON
app.use(express.json());

// ─────────────────────────────────────────────
// DATOS EN MEMORIA
// ─────────────────────────────────────────────

// Array con los videojuegos (recurso principal)
// Cada videojuego tiene 9 campos: id, nombre, genero, plataforma, estudio, fechaLanzamiento, precio, puntuacion y disponible
const videojuegos = [
  {
    id: 1,
    nombre: "Assassin's Creed Shadows",
    genero: 'Aventura / Sigilo',
    plataforma: 'PS5',
    estudio: 'Ubisoft',
    fechaLanzamiento: '2025-03-20',
    precio: 79.99,
    puntuacion: 8.5,
    disponible: true
  },
  {
    id: 2,
    nombre: 'Balatro',
    genero: 'Cartas / Roguelike',
    plataforma: 'PC',
    estudio: 'LocalThunk',
    fechaLanzamiento: '2024-02-20',
    precio: 14.99,
    puntuacion: 9.5,
    disponible: true
  },
  {
    id: 3,
    nombre: 'Resident Evil Requiem',
    genero: 'Survival Horror',
    plataforma: 'PS5',
    estudio: 'Capcom',
    fechaLanzamiento: '2026-02-27',
    precio: 79.99,
    puntuacion: 9,
    disponible: true
  }
];

// Array con las reseñas (recurso secundario)
// Cada reseña tiene un campo videojuegoId que la vincula con un videojuego del array anterior
const reseñas = [
  {
    id: 1,
    videojuegoId: 1,
    autor: 'Fran',
    comentario: 'Me enganché desde el primer momento. El sigilo y la historia son brutales.',
    nota: 9,
    fecha: '2025-04-10'
  },
  {
    id: 2,
    videojuegoId: 2,
    autor: 'Javi',
    comentario: 'No puedo parar de jugar. Es muy adictivo para echar partidas cortas.',
    nota: 10,
    fecha: '2025-06-22'
  },
  {
    id: 3,
    videojuegoId: 3,
    autor: 'Adrián',
    comentario: 'El mejor survival horror en años. Capcom lo ha vuelto a hacer.',
    nota: 9,
    fecha: '2026-03-05'
  }
];

// ─────────────────────────────────────────────
// RUTA PRINCIPAL
// ─────────────────────────────────────────────

// Ruta base para comprobar que el servidor funciona
app.get('/', (req, res) => {
  res.status(200).send('Servidor funcionando correctamente');
});

// ─────────────────────────────────────────────
// ENDPOINTS - VIDEOJUEGOS
// ─────────────────────────────────────────────

// Obtener todos los videojuegos
// Método: GET | Ruta: /videojuegos
app.get('/videojuegos', (req, res) => {
  try {
    res.status(200).json(videojuegos);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener un videojuego por su ID usando route param (:id)
// Método: GET | Ruta: /videojuegos/:id | Ejemplo: /videojuegos/1
app.get('/videojuegos/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const juego = videojuegos.find(v => v.id === id);
    if (!juego) {
      return res.status(404).json({ error: 'Videojuego no encontrado' });
    }
    res.status(200).json(juego);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener un videojuego por nombre usando query param
// Método: GET | Ruta: /videojuegos/buscar/nombre | Ejemplo: /videojuegos/buscar/nombre?nombre=balatro
app.get('/videojuegos/buscar/nombre', (req, res) => {
  try {
    const nombre = req.query.nombre;
    if (!nombre) {
      return res.status(400).json({ error: 'Debes indicar un nombre para buscar' });
    }
    const juego = videojuegos.find(v =>
      v.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
    if (!juego) {
      return res.status(404).json({ error: 'Videojuego no encontrado' });
    }
    res.status(200).json(juego);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// ─────────────────────────────────────────────
// ARRANQUE DEL SERVIDOR
// ─────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});