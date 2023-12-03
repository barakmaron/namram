import React from 'react';
import { Dialog } from 'primereact/dialog';


export default function Modal({
    setClose,
    children,
    header
}) {
    return (
        <Dialog header={header} style={{ width: '50vw' }} visible={true} onHide={() => setClose()}>
            {React.Children?.map(children, child => {
                if (React.isValidElement(child))
                    return React.cloneElement(child);
                return child;
            })}
        </Dialog>
    )
}