import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const ControlPanelBlock = ({
    number,
    actions,
    children,
}) => {
    return (
        <Card
            subTitle={`${number || ''} ${children}`}
            footer={
                <span className="p-buttonset" dir='ltr'>{
                    actions?.reverse().map((action, index) => <Button
                        key={`button-${action.label}-number-${index}`}
                        label={action.label}
                        onClick={action.value}
                        />)}
                </span>
            }>
        </Card >
    );
};

export default ControlPanelBlock;