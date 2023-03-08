const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

// Configurar la conexión con la base de datos MySQL
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

// Variable global para almacenar el token activo
let activeToken = null;

// Endpoint para validar un usuario y contraseña y retornar un token
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(req.body)

  // Consultar la base de datos para verificar el usuario y la contraseña
  connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al consultar la base de datos' });
    } else if (results.length == 0) {
      res.status(401).json({ error: 'Usuario y/o contraseña incorrectos' });
    } else {
      // Si ya hay un token activo, invalidarlo
      if (activeToken) {
        jwt.verify(activeToken, 'secret_key', (err, user) => {
          if (!err) {
            activeToken = null;
          }
        });
      }

      // Generar un nuevo token con JWT
      const token = jwt.sign({ username: username }, 'secret_key',{ expiresIn: '24h' });
      activeToken = token;
      res.json({ token: token });
    }
  });
});

// Middleware para validar el token en todas las solicitudes que requieran autenticación
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    res.status(401).json({ error: 'Token de autenticación requerido' });
  } else {
    // Comprobar si el token es el activo
    if (token !== activeToken) {
      res.status(403).json({ error: 'Token de autenticación inválido' });
      return;
    }
    jwt.verify(token, 'secret_key', (err, user) => {
      if (err) {
        res.status(403).json({ error: 'Token de autenticación inválido' });
      } else {
        req.user = user;
        next();
      }
    });
  }
}

// Endpoint para obtener los productos (requiere autenticación con token)
app.get('/productos', authenticateToken, (req, res) => {
  connection.query('SELECT * FROM products', (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al consultar la base de datos' });
    } else {
      res.json(results);
    }
  });
});

// Iniciar el servidor
app.listen(3000, () => console.log('Servidor iniciado en el puerto 3000'));
