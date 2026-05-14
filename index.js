const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

// ─────────────────────────────────────────────
// DATOS EN MEMORIA
// ─────────────────────────────────────────────

const videojuegos = [
  {
    id: 1,
    nombre: "Assassin's Creed Shadows",
    genero: 'Aventura / Sigilo',
    plataforma: 'PS5',
    estudio: 'Ubisoft',
    fechaLanzamiento: '20-03-2025',
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
    fechaLanzamiento: '20-02-2024',
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
    fechaLanzamiento: '27-02-2026',
    precio: 79.99,
    puntuacion: 9,
    disponible: true
  }
];

const reseñas = [
  {
    id: 1,
    videojuegoId: 1,
    autor: 'Fran',
    comentario: 'Me enganché desde el primer momento. El sigilo y la historia son brutales.',
    nota: 9,
    fecha: '10-04-2025'
  },
  {
    id: 2,
    videojuegoId: 2,
    autor: 'Javi',
    comentario: 'No puedo parar de jugar. Es muy adictivo para echar partidas cortas.',
    nota: 10,
    fecha: '22-06-2025'
  },
  {
    id: 3,
    videojuegoId: 3,
    autor: 'Adrián',
    comentario: 'El mejor survival horror en años. Capcom lo ha vuelto a hacer.',
    nota: 9,
    fecha: '05-03-2026'
  }
];

// ─────────────────────────────────────────────
// RUTA PRINCIPAL
// ─────────────────────────────────────────────

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

// Busca un videojuego por id
// Convertimos a número porque la URL siempre envía texto
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

// Busca por nombre con query param
// Esta ruta va aquí porque si va después de :id, Express se confunde
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

// Filtra videojuegos por disponibilidad
// Si pasas ?disponible=true devuelve los disponibles, si pasas false devuelve los no disponibles
app.get('/videojuegos/filtrar/disponible', (req, res) => {
  try {
    const disponible = req.query.disponible === 'true';
    const juegosFiltrados = videojuegos.filter(v => v.disponible === disponible);
    
    if (juegosFiltrados.length === 0) {
      return res.status(404).json({ error: 'No se encontraron videojuegos con ese criterio' });
    }
    res.status(200).json(juegosFiltrados);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Crea un videojuego nuevo
// Los campos obligatorios son nombre, genero, plataforma y estudio
// El resto pueden ser null si no los envías
app.post('/videojuegos', (req, res) => {
  try {
    const { nombre, genero, plataforma, estudio, fechaLanzamiento, precio, puntuacion, disponible } = req.body;

    if (!nombre || !genero || !plataforma || !estudio) {
      return res.status(400).json({ error: 'Faltan campos obligatorios: nombre, genero, plataforma y estudio' });
    }

    const nuevoJuego = {
      id: videojuegos[videojuegos.length - 1].id + 1,
      nombre,
      genero,
      plataforma,
      estudio,
      fechaLanzamiento: fechaLanzamiento || null,
      precio: precio || null,
      puntuacion: puntuacion || null,
      disponible: disponible !== undefined ? disponible : true
    };

    videojuegos.push(nuevoJuego);
    res.status(201).json(nuevoJuego);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Modifica un videojuego que ya existe
// Solo cambia los campos que le envíes, el resto se mantienen como estaban
app.put('/videojuegos/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = videojuegos.findIndex(v => v.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Videojuego no encontrado' });
    }
    videojuegos[index] = { ...videojuegos[index], ...req.body };
    res.status(200).json(videojuegos[index]);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Elimina un videojuego del array
app.delete('/videojuegos/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = videojuegos.findIndex(v => v.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Videojuego no encontrado' });
    }
    videojuegos.splice(index, 1);
    res.status(200).json({ mensaje: `Videojuego con id ${id} eliminado correctamente` });
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

// Busca una reseña por id
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

// Devuelve las reseñas de un videojuego buscando por nombre
// Primero encuentra el juego, luego busca todas sus reseñas
app.get('/resenas/videojuego/:nombre', (req, res) => {
  try {
    const nombre = req.params.nombre;
    const juego = videojuegos.find(v => v.nombre.toLowerCase().includes(nombre.toLowerCase()));
    if (!juego) {
      return res.status(404).json({ error: 'No se encontró ningún videojuego con ese nombre' });
    }
    const resenasFiltradas = reseñas.filter(r => r.videojuegoId === juego.id);
    if (resenasFiltradas.length === 0) {
      return res.status(404).json({ error: 'Este videojuego no tiene reseñas' });
    }
    res.status(200).json(resenasFiltradas);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Crea una nueva reseña
// videojuegoId, autor, comentario y nota son obligatorios
// Si no envías fecha, se genera automáticamente con la de hoy
app.post('/resenas', (req, res) => {
  try {
    const { videojuegoId, autor, comentario, nota, fecha } = req.body;

    if (!videojuegoId || !autor || !comentario || !nota) {
      return res.status(400).json({ error: 'Faltan campos obligatorios: videojuegoId, autor, comentario y nota' });
    }

    const nuevaResena = {
      id: reseñas[reseñas.length - 1].id + 1,
      videojuegoId,
      autor,
      comentario,
      nota,
      fecha: fecha || new Date().toLocaleDateString('es-ES')
    };

    reseñas.push(nuevaResena);
    res.status(201).json(nuevaResena);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Elimina una reseña por id
app.delete('/resenas/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = reseñas.findIndex(r => r.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Reseña no encontrada' });
    }
    reseñas.splice(index, 1);
    res.status(200).json({ mensaje: `Reseña con id ${id} eliminada correctamente` });
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