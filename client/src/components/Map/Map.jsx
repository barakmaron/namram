import React from 'react';

const Map = ({ location }) => {
    return (<iframe 
        title='map'
        src={location} 
        width="600" 
        height="450" 
        style={{border:0, width: "100%", height: "50vh"}} 
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"></iframe>);
};

export default Map;