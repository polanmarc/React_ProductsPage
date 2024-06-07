import "../db/connection.js";
import Notas from "../db/models/notes.schema.js";

const notesManagement = {};

// Search by Author
notesManagement.searchByAuthor = async (req, res) => {
    try {
        const email = req.user;
        const nota = await Notas.find({author : email});
        if (!nota) {
            return res.status(404).json({ message: "La nota no se encontró" });
        }
        res.json(nota);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read All
notesManagement.readAll = async (req, res) => {
    try {
        const notas = await Notas.find();
        res.json(notas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create
notesManagement.create = async (req, res) => {
    try {
        const { title, content, status, author } = req.body;

        if (author !== req.user) {
            return res.status(404).json({ message: "Usuario no valido" });
        }

        const existingNote = await Notas.findOne({ title: title, author: author });
        if (existingNote) {
            return res.status(400).json({ error: "Ya existe una nota con este título" });
        }

        const nuevaNota = new Notas({ title, content, status, author });
        const nota = await nuevaNota.save();
        res.status(201).json(nota);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update
notesManagement.update = async (req, res) => {
    try {
        const { title, content, status, author, _id } = req.body;

        if (author !== req.user) {
            return res.status(404).json({ message: "Usuario no valido" });
        }

        const nota = await Notas.findByIdAndUpdate(_id, {title, content, status, author}, { new: true });
        if (!nota) {
            return res.status(404).json({ message: "La nota no se encontró" });
        }
        nota.title = title;
        nota.content = content;
        nota.status = status;
        nota.author = author;
        const notaActualizada = await nota.save();
        res.status(200).json(notaActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete
notesManagement.delete = async (req, res) => {
    try {
        const titulo = req.body.title;
        const notaEliminada = await Notas.findOneAndDelete({ title: titulo });
        if (!notaEliminada) {
            return res.status(404).json({ message: "La nota no se encontró" });
        }
        res.status(200).json({ message: "Nota eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default notesManagement;