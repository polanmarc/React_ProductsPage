import React, { useState, useEffect, useContext, useRef } from "react";
import AuthContext from "./AuthContext";
import Modal from "./Modal";
import Nota from "./Nota";
import Button from "./Button";

function NotaManage() {
    const [modalOpenCreate, setModalOpenCreate] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [notes, setNotes] = useState([]);
    const { isLoggedIn } = useContext(AuthContext);
    const [idNotaDelete, setIdNotaDelete] = useState([])

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        status: "0",
        author: isLoggedIn ? isLoggedIn.user.email : ""
    });

    const notesRef = useRef([]);

    const notesRefEjercicio = useRef();

    const openModal = () => {
        setModalOpenCreate(true);
    };

    const closeModal = () => {
        setModalOpenCreate(false);
    };

    useEffect(() => {
        if (isLoggedIn) {
            readNotes();
        }
    }, []);

    const validateForm = () => {
        const errors = {};

        if (!notesRefEjercicio.current.title.trim()) {
            errors.title = "Title is required";
        }

        if (!notesRefEjercicio.current.content.trim()) {
            errors.content = "Content is required";
        }

        setFormErrors(errors);
        return errors;
    };  

    const readNotes = async () => {
        try {
            const response = await fetch("http://0.0.0.0:8081/notes/searchByAuthor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": isLoggedIn.user.token
                }
            });

            if (!response.ok) {
                throw new Error("Read Notes Error");
            }

            const data = await response.json();
            setNotes(data);
            notesRef.current = data;
        } catch (error) {
            alert("No se han podido leer las notas");
        }
    };

    const handleSubmitCreate = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            const response = await fetch("http://0.0.0.0:8081/notes/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": isLoggedIn.user.token
                },
                body: JSON.stringify(notesRefEjercicio.current)
            });

            if (response.status === 400) {
                return alert("La nota ya existe para este usuario.")
            }

            notesRefEjercicio.current = {
                title: "", content: "", status: "0",
                author: isLoggedIn ? isLoggedIn.user.email : ""
            };
            readNotes();
            closeModal();
        } catch (error) {
            alert("Error al crear la nota: " + error)
        }
    };

    const updateNota = async (e, editedNote) => {
        e.preventDefault();

        try {
            const response = await fetch("http://0.0.0.0:8081/notes/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": isLoggedIn.user.token
                },
                body: JSON.stringify(editedNote)
            });

        } catch (error) {
            alert("No se han podido actualizar las notas: " + error);
        }
    };

    const updateTemplate = (e) => {
        const notaId = e.target.parentNode.id;
        const notaIndex = notesRef.current.findIndex((elemento) => elemento._id === notaId);

        if (notaIndex !== -1) {
            const notasAux = [...notesRef.current];
            const nota = notasAux[notaIndex];
            const changeAttribute = e.target.name;
            nota[changeAttribute] = e.target.value;
            notasAux[notaIndex] = nota;
            notesRef.current = notasAux;
            updateNota(e, nota);
        }
    };

    const deleteNota = async (e, nota) => {
        e.preventDefault();

        try {
            const response = await fetch("http://0.0.0.0:8081/notes/delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": isLoggedIn.user.token
                },
                body: JSON.stringify(nota)
            });

        } catch (error) {
            alert("No se han podido eliminar la nota: " + error);
        }
    }

    const buttonManage = (e) => {
        const nameButton = e.target.className;
        if (nameButton === "deleteButton") {
            setIdNotaDelete(e.target.parentNode.parentNode.id);
        } else if (nameButton === "confirmButton") {
            const notaIndex = notesRef.current.findIndex((elemento) => elemento._id === idNotaDelete);

            if (notaIndex !== -1) {
                const notasAux = [...notesRef.current];
                const nota = notasAux[notaIndex];
                notasAux.splice(notaIndex, 1);
                notesRef.current = notasAux;
                setNotes(notesRef.current);
                deleteNota(e, nota);
            }
        }
    };

    const templateNotes = () => {
        return notesRef.current
            .map(nota => (
                <Nota nota={nota} ref={notesRefEjercicio} />
            ));
    };

    const handleInputSudmit = (e) => {
        console.log(e.target.parentNode)
        notesRefEjercicio.current = { 
            title: e.target.parentNode.title.value,
            content: e.target.parentNode.content.value,
            status: e.target.parentNode.status.value,
            author: isLoggedIn ? isLoggedIn.user.email : ""
         };
        console.log(notesRefEjercicio.current);
    };  

    return (
        <div>
            {isLoggedIn ? <>
                <h1>User Notes</h1>
                <Button funcion={openModal} texto="Create Note" className="createButton" />
                <div onChange={updateTemplate} onClick={buttonManage}>
                    {templateNotes()}
                </div>
                <Modal isOpen={modalOpenCreate} closeModal={closeModal}>
                    <form onSubmit={handleSubmitCreate} method="post">
                        <label htmlFor="inpTitle">Title</label>
                        <input
                            id="inpTitle"
                            name="title"
                            type="text"
                        />
                        {formErrors.title && <p className="error">{formErrors.title}</p>}
                        <label htmlFor="inpContent">Content</label>
                        <textarea
                            id="inpContent"
                            name="content"
                            cols="30"
                            rows="10"
                        ></textarea>
                        {formErrors.content && <p className="error">{notesRefEjercicio.content}</p>}
                        <label htmlFor="inpStatus">Status</label>
                        <select
                            name="status"
                            id="inpStatus"
                        >
                            <option value="1">Published</option>
                            <option value="0">Draft</option>
                        </select>
                        <Button texto="Crear Nota" funcion={handleInputSudmit} className="createButton" />
                    </form>
                </Modal> </>
                : <h1>Unauthorized Access: Please log in</h1>}
        </div>
    );
}

export default NotaManage;