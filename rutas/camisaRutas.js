import { Router } from 'express';
const router = Router();
import { obtenerCamisas, obtenerCamisaPorId, crearCamisa, modificarCamisa, eliminarCamisa, votoCamisa } from '../controladores/camisetaControlador.js';
import  verificarToken  from '../seguridad/auth.js';
router.get('/', verificarToken, obtenerCamisas); // Ruta para obtener todas las camisas
router.get('/:id', verificarToken, obtenerCamisaPorId); // Ruta para obtener una camisa
router.post('/', verificarToken, crearCamisa); // Ruta para crear una nueva camisa
router.put('/:id', verificarToken, modificarCamisa); // Ruta para actualizar una camisa
router.put('/vota/:id', verificarToken, votoCamisa); // Ruta para actualizar una camisa
router.delete('/:id', verificarToken, eliminarCamisa); // Ruta para eliminar una camisa

export default router;