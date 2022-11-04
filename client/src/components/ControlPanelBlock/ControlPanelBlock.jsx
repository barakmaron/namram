import React from 'react';
import Button, { SIZE } from '../Button/Button';

const ControlPanelBlock = ({
  number,
  add_action = undefined,
  edit_action = undefined,
  delete_action = undefined,
  children
}) => {
  return (
  <div className='py-4 px-4 shadow-xl rounded-md bg-forest-green-400 text-forest-green-900 border-white border-4 border-solid font-bold flex flex-col gap-2 text-2xl justify-center items-center'>
    <span className='text-3xl'>{number}</span>
    <span>{children}</span>
    <div className='flex gap-2'>
      {add_action && <Button green={true} text="הוסף" action={add_action} size={SIZE.SMALL} />}
      {edit_action && <Button green={true} text="ערוך" action={edit_action} size={SIZE.SMALL} />}
      {delete_action &&  <Button green={true} text="מחק" action={delete_action} size={SIZE.SMALL} />}
    </div>
  </div>
  );
};

export default ControlPanelBlock;