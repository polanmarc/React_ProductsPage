import bcrypt from "bcrypt";
import "../db/connection.js";
import User from "../db/models/user.schema.js";
import jwt from 'jsonwebtoken';

const userManagement = {};

// Login

userManagement.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(404).json({ message: "El usuario no se ha registrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "La contraseña no coincide con el usuario " + user.name + " " + user.surname });
    }

    const token = jwt.sign({ userEmail: user.email }, process.env.JWP_SECRET_KEY);
    res.cookie('token', token, { httpOnly: true});

    res.status(200).json({ 
      message: "El usuario " + user.name + " " + user.surname + " se ha logeado perfectamente.",
      user: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: email,
        token
      }

    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Register

userManagement.registerUser = async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;

    /*
      Validación del formato del password. Esta validacion consiste en:
      - Minimo 8 digitos
      - Letra mayuscula
      - Letra minuscula
      - Un numero
      - Puede contener caracteres especiales
    */

    const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!validPassword.test(password)) {
      throw { password: "El password debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una letra minúscula y un número."};
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw { register: 'User already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      surname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(409).json(error);
  }
};

// Log Out

userManagement.logOut = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: "Usuario desconectado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default userManagement;

/*

Codigos de res.status()

200 - OK: La solicitud ha tenido éxito.
201 - Created: La solicitud ha tenido éxito y se ha creado un nuevo recurso.
204 - No Content: La solicitud ha tenido éxito, pero no hay contenido para devolver.
400 - Bad Request: La solicitud del cliente es incorrecta o no se puede procesar.
401 - Unauthorized: El cliente debe autenticarse para obtener la respuesta solicitada.
403 - Forbidden: El servidor entiende la solicitud, pero se niega a cumplirla.
404 - Not Found: El recurso solicitado no se ha encontrado en el servidor.
405 - Method Not Allowed: El método de la solicitud no está permitido para el recurso solicitado.
500 - Internal Server Error: El servidor ha encontrado una situación que no sabe cómo manejar.
503 - Service Unavailable: El servidor no está listo para manejar la solicitud.

*/