import React from 'react';

const Button = ({
    action,
    text
}) => {
  return (<button 
    className='py-5 px-5 font-bold text-green-600 bg-slate-700 w-fit text-6xl rounded-xl hover:border-green-600 border-b-8 border-transparent border-solid shadow-lg' 
    onClick={action}>
        {text}
    </button>);
};

export default Button;