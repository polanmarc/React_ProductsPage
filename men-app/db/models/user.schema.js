import {Schema, model} from "mongoose"

const UserSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = model('User', UserSchema);

export default User;

// {
//   "name": "joel",
//   "surname": "hola",
//   "email": "thos.joel@gmail.com",
//   "password": "Marc1234_"
// }

// {
//   "email": "thos.alae.harrak@gmail.com",
//   "password": "Marc1234_"
// }