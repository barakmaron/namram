import React from 'react';
import style from './Modal.module.css';
import { FaTimes } from 'react-icons/fa';

export default function Modal({ 
    setClose, 
    children, 
    className 
}) {
    return(
        <div className={`${style.modal_wrapper} z-10`} onClick={() => setClose()}>
            <div className={`${style.modal_inner} w-fit overflow-y-scroll h-4/6`} onClick={e => e.stopPropagation()}>
                <div className={style.close_button} onClick={() => setClose()}>
                    <FaTimes></FaTimes>
                </div>
                <div className={className}>
                    {React.Children?.map(children, child => {
                        if(React.isValidElement(child))
                            return React.cloneElement(child);
                        return child;
                    })}
                </div>
            </div>
        </div>
    )
}