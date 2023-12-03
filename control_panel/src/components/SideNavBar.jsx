import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TabMenu } from 'primereact/tabmenu';

import AppRoutes from '../AppRoutes';

const SideNavBar = ({ }) => {
    const navigate = useNavigate();

    const [tabIndex, setTabIndex] = useState(0);

    const navChange = useCallback((event) => {
        setTabIndex(event.index);
        navigate(event.value.location);
    }, [navigate]);

    return <div className='fixed z-50 w-full bg-white'>
        <TabMenu
            model={AppRoutes.adminRoutes}
            onTabChange={navChange}
            activeIndex={tabIndex} />
    </div>;
};

export default SideNavBar;