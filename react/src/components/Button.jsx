import React, { memo } from 'react';

const Button = memo(function Button({ funcion, texto, className }) {
    return (
        <button className={className} onClick={funcion}>
            {texto}
        </button>
    );
});

export default Button;
