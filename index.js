const express = require('express');

const app = express();
const PORT = 3000;

// Sin esto no podemos leer el body en formato JSON
app.use(express.json());

// ─────────────────────────────────────────────
// DATOS EN MEMORIA
// ─────────────────────────────────────────────

// Lista de videojuegos con sus datos principales
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

// Reseñas vinculadas a cada videojuego mediante videojuegoId
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

// Para comprobar que el servidor arranca bien
app.get('/', (req, res) => {
  res.status(200).send('Servidor funcionando correctamente');
});

// ─────────────────────────────────────────────
// ENDPOINTS - VIDEOJUEGOS
// ─────────────────────────────────────────────

// Devuelve todos los videojuegos
app.get('/videojuegos', (req, res) => {
  try {
    res.status(200).json(videojuegos);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Busca un videojuego por su id en la URL, ej: /videojuegos/2
app.get('/videojuegos/:id', (req, res) => {
  try {
    // Lo convierto a número porque req.params devuelve texto
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

// Busca por nombre con query param, ej: /videojuegos/buscar/nombre?nombre=balatro
app.get('/videojuegos/buscar/nombre', (req, res) => {
  try {
    const nombre = req.query.nombre;
    if (!nombre) {
      return res.status(400).json({ error: 'Debes indicar un nombre para buscar' });
    }
    // Con toLowerCase evito que falle si el usuario escribe en mayúsculas
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
// ENDPOINTS - RESEÑAS
// ─────────────────────────────────────────────

// Devuelve todas las reseñas
app.get('/resenas', (req, res) => {
  try {
    res.status(200).json(reseñas);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Busca una reseña por su id, ej: /resenas/1
app.get('/resenas/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const resena = reseñas.find(r => r.id === id);
    if (!resena) {
      return res.status(404).json({ error: 'Reseña no encontrada' });
    }
    res.status(200).json(resena);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Devuelve todas las reseñas de un videojuego concreto, ej: /resenas/videojuego/1
app.get('/resenas/videojuego/:videojuegoId', (req, res) => {
  try {
    const videojuegoId = parseInt(req.params.videojuegoId);
    // filter devuelve todos los elementos que cumplan la condición, no solo el primero
    const resenasFiltradas = reseñas.filter(r => r.videojuegoId === videojuegoId);
    if (resenasFiltradas.length === 0) {
      return res.status(404).json({ error: 'No se encontraron reseñas para ese videojuego' });
    }
    res.status(200).json(resenasFiltradas);
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