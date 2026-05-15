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

// GET /videojuegos → devuelve todos los videojuegos
app.get('/videojuegos', (req, res) => {
  try {
    res.status(200).json(videojuegos);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /videojuegos/:id → busca un videojuego por id
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

// GET /videojuegos/buscar/nombre?nombre=... → búsqueda por nombre
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

// POST /videojuegos → crea un videojuego nuevo
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

// PUT /videojuegos/:id → modifica un videojuego existente
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

// DELETE /videojuegos/:id → elimina un videojuego
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

// GET /videojuegos/filtrar/disponible?disponible=... → filtra por disponibilidad
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

// GET /videojuegos/filtrar/precio?precioMin=...&precioMax=... → filtra por rango de precio
app.get('/videojuegos/filtrar/precio', (req, res) => {
  try {
    let precioMin = req.query.precioMin ? parseFloat(req.query.precioMin) : 0;
    let precioMax = req.query.precioMax ? parseFloat(req.query.precioMax) : Infinity;

    const juegosFiltrados = videojuegos.filter(v => v.precio >= precioMin && v.precio <= precioMax);

    if (juegosFiltrados.length === 0) {
      return res.status(404).json({ error: 'No se encontraron videojuegos en ese rango de precio' });
    }
    res.status(200).json(juegosFiltrados);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /videojuegos/ordenar/puntuacion?direccion=... → ordena por puntuación
app.get('/videojuegos/ordenar/puntuacion', (req, res) => {
  try {
    const direccion = req.query.direccion || 'desc';
    const juegosOrdenados = [...videojuegos];

    if (direccion === 'asc') {
      juegosOrdenados.sort((a, b) => a.puntuacion - b.puntuacion);
    } else {
      juegosOrdenados.sort((a, b) => b.puntuacion - a.puntuacion);
    }

    res.status(200).json(juegosOrdenados);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// ─────────────────────────────────────────────
// ENDPOINTS - RESEÑAS
// ─────────────────────────────────────────────

// GET /resenas → devuelve todas las reseñas
app.get('/resenas', (req, res) => {
  try {
    res.status(200).json(reseñas);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /resenas/:id → busca una reseña por id
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

// GET /resenas/videojuego/:nombre → devuelve reseñas de un videojuego por nombre
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

// POST /resenas → crea una nueva reseña
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

// DELETE /resenas/:id → elimina una reseña
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

// GET /resenas/buscar?texto=... → busca reseñas por texto en comentarios
app.get('/resenas/buscar', (req, res) => {
  try {
    const texto = req.query.texto;
    if (!texto) {
      return res.status(400).json({ error: 'Debes indicar un texto para buscar' });
    }
    const resenasFiltradas = reseñas.filter(r =>
      r.comentario.toLowerCase().includes(texto.toLowerCase())
    );
    if (resenasFiltradas.length === 0) {
      return res.status(404).json({ error: 'No se encontraron reseñas con ese texto' });
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