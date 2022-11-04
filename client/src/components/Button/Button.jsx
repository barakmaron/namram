import React from 'react';

export const SIZE = {
    SMALL: "SMALL",
    LARGE: "LARGE"
};

const Button = ({
    action,
    text,
    size,
}) => {
  return (<button 
    className={`text-green-600 bg-slate-700 hover:border-green-600
    ${size === SIZE.SMALL ? `text-2xl` : `text-6xl`}
    'py-5 px-5 font-bold w-fit rounded-xl  border-b-8 border-transparent border-solid shadow-lg' `}
    onClick={action}>
        {text}
    </button>);
};

export default Button;