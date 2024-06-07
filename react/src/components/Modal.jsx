import React from "react";

function Modal({ isOpen, closeModal, children }) {
    return (
        <>
            {isOpen && (
                <div className="modalOverlay">
                    <div className="modal">
                        <div className="modalHeader">
                            <h2>Create Note</h2>
                            <button className="closeButton" onClick={closeModal}>X</button>
                        </div>
                        <div className="modalContent">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;
