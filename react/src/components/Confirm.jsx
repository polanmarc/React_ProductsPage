import React, { forwardRef } from "react";
import Button from "./Button";
import Modal from "./Modal";

const Confirm = forwardRef(function Confirm(props, ref) {
    const { closeModal, onDelete } = props;

    return (
        <Modal ref={ref} closeModal={closeModal}>
            <p>Estás seguro de que deseas eliminar esta nota?</p>
            <div>
                <Button funcion={onDelete} texto="Confirmar" className="confirmButton" />
                <Button funcion={closeModal} texto="Cancelar" className="cancelButton" />
            </div>
        </Modal>
    );
});

export default Confirm;
