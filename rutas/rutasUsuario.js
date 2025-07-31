import { Router } from 'express';
const router = Router();
import { ObtenerUsuarios, ObtenerUsuariosxid, CrearUsuario, login, ActualizarUsuario, EliminarUsuario } from '../controladores/usuarioControlador.js';

router.get('', ObtenerUsuarios);
router.get('/:id', ObtenerUsuariosxid);
router.post('/', CrearUsuario);
router.post('/login', login)
router.put('/:id', ActualizarUsuario);
router.delete('/:id', EliminarUsuario);

export default router;