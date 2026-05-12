const express = require('express');

const app = express();
const PORT = 505;

// Middleware para que Express entienda JSON en el body
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

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// ─────────────────────────────────────────────
// ARRANQUE DEL SERVIDOR
// ─────────────────────────────────────────────

app.listen(PORT, () => {
  console.log('Servidor iniciado en http://localhost:0505');
});