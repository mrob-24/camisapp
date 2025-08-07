// Ejemplo de esquema Camiseta (simplificado)
import { Schema, model } from 'mongoose';

const camisetaSchema = new Schema({
  creador: { type: Schema.Types.ObjectId, ref: 'Usuario' },
  torso: String,
  mangaizq: String,
  mangader: String,
  cuelloizq: String,
  cuelloder: String,
  fechaCreacion: { type: Date, default: Date.now },
  votos: [  ],       // (ver siguiente sección)
  calificacion: { type: Number, default: 0 }
});

export default model('Camiseta', camisetaSchema); // Exportar el modelo para usarlo en otras partes de la aplicación