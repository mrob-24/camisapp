import { Router } from 'express';
const router = Router();
import { obtenerCamisas, obtenerCamisaPorId, crearCamisa, modificarCamisa, eliminarCamisa } from '../controladores/camisetaControlador.js';

router.get('/', obtenerCamisas); // Ruta para obtener todas las camisas
router.get('/:id', obtenerCamisaPorId); // Ruta para obtener una camisa
router.post('/', crearCamisa); // Ruta para crear una nueva camisa
router.put('/:id', modificarCamisa); // Ruta para actualizar una camisa
router.delete('/:id', eliminarCamisa); // Ruta para eliminar una camisa

export default router;