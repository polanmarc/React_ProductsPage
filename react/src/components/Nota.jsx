import React, { useState, forwardRef, useRef } from "react";
import Button from "./Button";
import Confirm from "./Confirm";

const Nota = forwardRef(function Nota(props, ref) {
    const { nota, onDelete } = props;
    const [editMode, setEditMode] = useState(false);
    const [editedNote, setEditedNote] = useState({ ...nota });
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const confirmNotes = useRef(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedNote({
            ...editedNote,
            [name]: value
        });
    };

    const handleDelete = () => {
        onDelete(nota);
        setShowConfirmModal(false);
    };

    return (
        <div className="containerNota" key={nota._id} id={nota._id} ref={ref}>
            {editMode ? (
                <>
                    <input
                        className="title"
                        name="title"
                        type="text"
                        value={editedNote.title}
                        onChange={handleInputChange}
                    />
                    <p style={{margin: 15}}>Id: {nota._id}</p>
                    <p className="author" style={{margin: 15}}>Author: {nota.author}</p>
                    <select
                        className="status"
                        name="status"
                        value={editedNote.status}
                        onChange={handleInputChange}
                    >
                        <option value="1">Published</option>
                        <option value="0">Draft</option>
                    </select>
                    <textarea
                        className="content"
                        name="content"
                        value={editedNote.content}
                        onChange={handleInputChange}
                    ></textarea>
                </>
            ) : (
                <>
                    <h3 className="title">{nota.title}</h3>
                    <p>Id: {nota._id}</p>
                    <p className="author">Author: {nota.author}</p>
                    <p className="status">Status: {nota.status == "1" ? "Published" : "Draft"}</p>
                    <p className="content">Content: {nota.content}</p>
                </>
            )}
            <div>
                {editMode ? (
                    <Button funcion={() => setEditMode(false)} texto="Save" className="saveButton"/>
                ) : (
                    <>
                        <Button funcion={() => setEditMode(true)} texto="Update" className="updateButton" />
                        <Button funcion={() => setShowConfirmModal(true)} texto="Delete" className="deleteButton"/>
                    </>
                )}
            </div>
            {showConfirmModal && <Confirm ref={confirmNotes} />}
        </div>
    );
});

export default Nota;