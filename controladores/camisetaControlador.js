import bcrypt from 'bcryptjs'; // Importa bcrypt para el hash de contraseñas
import Camisa from '../modelos/camisetaEsquema.js';
import Usuario from '../modelos/usuarioEsquema.js'
import jwt from 'jsonwebtoken'; // Importa jsonwebtoken para manejar autenticación

// Obtener todos los usuarios
export async function obtenerCamisas(req, res) {
  try {
    
// Supongamos que ya tenemos una lista de camisetas obtenida de la base de datos:
const camisetas = await Camisa.find();  // Lista de camisetas desde la coleccion (ejemplo)

// Enriquecer cada camiseta con datos del usuario creador:
const camisetasConUsuario = await Promise.all(
  camisetas.map(async (c) => {
    try {
      // Buscar al usuario por ID (c.creador) y seleccionar solo nombre y correo
      const usuario = await Usuario.findById(c.creador).select('nombre correo');
      return {
        ...c.toObject(),        // Convertir el documento de Mongoose a objeto plano JS
        creador: usuario || null // Reemplazar el campo 'creador' con los datos del usuario (o null si no se encontró)
      };
    } catch (error) {
      // En caso de error al buscar usuario, devolvemos la camiseta con 'creador' null
      return {
        ...c.toObject(),
        creador: null
      };
    }
  })
);

    res.json(camisetasConUsuario);                       // Responde con la lista en formato JSON
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' }); // Error genérico en caso de fallo
  }
}

// Obtener una camiseta por ID
export async function obtenerCamisaPorId(req, res) {
  try {
    const camisa = await Camisa.findById(req.params.id); // Busca camiseta por el ID proporcionado
    if (!camisa) {
      return res.status(404).json({ error: 'Camiseta no encontrada' }); // Si no existe, 404
    }
    res.json(camisa); // Si existe, lo devolvemos en JSON
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
}

// Crear un nuevo usuario
export async function crearCamisa(req, res) {
  try {
    const datos = req.body;

    const nuevaCamisa = new Camisa(datos);

    nuevaCamisa.creador = req.usuarioId

    await nuevaCamisa.save();
    res.status(201).json({ mensaje: 'Camiseta creada con éxito', id: nuevaCamisa._id });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear la camiseta' });
  }
}

// Actualizar una camiseta existente
export async function modificarCamisa(req, res) {
  try {
    const datosActualizados = req.body;
    const camisaActualizada = await Camisa.findByIdAndUpdate(
      req.params.id,
      datosActualizados,
      { new: true }
    );
    if (!camisaActualizada) {
      return res.status(404).json({ error: 'Camiseta no encontrada' });
    }
    res.json(camisaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar la camiseta' });
  }
}

// Actualizar votos
export async function votoCamisa(req, res) {
  const id = req.params.id;
  const { calificacion } = req.body;  // calificacion será 1 o -1 según voto
  try {
    // Buscar la camiseta por ID en la base de datos
    const camiseta = await Camisa.findById(id);
    if (!camiseta) {
      return res.status(404).json({ error: 'Camiseta no encontrada' });
    }
    // Actualizar solo el campo calificacion sumando el valor recibido
    camiseta.calificacion += calificacion;
    await camiseta.save();  // guardar cambios en la BD
    // Devolver la camiseta actualizada (opcionalmente podría devolver solo status)
    return res.json(camiseta);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error de servidor' });
  }

}

// Eliminar una camiseta
export async function eliminarCamisa(req, res) {
  try {
    const camisaEliminada = await Camisa.findByIdAndDelete(req.params.id);
    if (!camisaEliminada) {
      return res.status(404).json({ error: 'Camiseta no encontrada' });
    }
    res.json({ message: 'Camiseta eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
}