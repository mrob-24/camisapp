import jwt from 'jsonwebtoken';

const secreto = 'SECRETO_SUPER_SEGUR0'; // define tu secreto aquí

// Middleware para verificar JWT
function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization']; // esta línea faltaba en tu código
  const token = req.query.token || (authHeader && authHeader.split(' ')[1]);  // Espera formato "Bearer token"
  
  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  console.log(token);

  try {
    const decoded = jwt.verify(token, secreto);
    req.usuarioId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
}

export default verificarToken;
