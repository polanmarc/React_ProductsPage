import {Schema, model} from "mongoose"

const NotesSchema = new Schema({
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  status: { type: Number, required: true },
  author: { type: String, required: true }
});

const Notas = model('Notas', NotesSchema);

export default Notas;

// {
//     "title": "Nueva 1",
//     "content": "esto es la primera nota de ejmplo",
//     "status": 1,
//     "author": "thos.alae.harrak@gmail.com"
// }