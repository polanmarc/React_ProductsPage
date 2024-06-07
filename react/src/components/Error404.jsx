import React from "react";

function Error404() {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-heading">Error 404: Página no encontrada</h1>
        <p className="error-message">
          Parece que has llegado a una página que no existe. Esto puede deberse a
          una URL incorrecta, una página eliminada o movida, o un error técnico
        </p>
        <p className="error-suggestion">
          Aquí hay algunas cosas que puedes intentar:
        </p>
        <ul className="error-suggestion-list">
          <li>Verificar la URL e intentar nuevamente</li>
          <li>Volver a la página anterior</li>
          <li>Ir a la página de inicio y navegar desde alli</li>
          <li>Comprobar si hay errores de escritura en la URL</li>
        </ul>
      </div>
    </div>
  );
}

export default Error404;
