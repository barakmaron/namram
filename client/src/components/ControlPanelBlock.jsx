import React from 'react';
import Button, { SIZE } from './Button';

const ControlPanelBlock = ({
  number = null,
  actions,
  children,
}) => {
  return (
  <div className='py-4 px-4 shadow-xl rounded-md text-forest-green-900 border-forest-green-500 border-4 border-solid font-bold flex flex-col gap-2 text-2xl justify-center items-center'>
    {number && <span className='text-3xl'>{number}</span>}
    <span>{children}</span>
    <div className='flex gap-2'>
      {actions?.map((action, index) => <Button 
        key={`button-${action.label}-number-${index}`}
        green={true} 
        text={action.label} 
        action={action.value} 
        size={SIZE.SMALL} />)}
    </div>
  </div>
  );
};

export default ControlPanelBlock;