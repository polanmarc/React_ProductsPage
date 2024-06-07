import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import usersRoutes from './routes/users.routes.js';
import notesRoutes from './routes/notes.routes.js';

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

// Pruebas

app.get('/', (req, res) => {
    res.send('GET Request')
});

app.post('/', (req, res) => {
    res.send('POST Request')
});

app.put('/', (req, res) => {
    res.send('PUT Request');
});

app.delete('/', (req, res) => {
    res.send('DELETE Request');
});

app.listen(8080, () => {
    console.log('Server is running on port 8080.')
})

// Users

app.use('/users', usersRoutes);

// Notes

app.use('/notes', notesRoutes);