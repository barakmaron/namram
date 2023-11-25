import React, { useEffect, useMemo } from 'react';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { Fieldset } from 'primereact/fieldset';

import { GetSaleAction } from "../redux/actions/SaleActions/saleActions";
import { GetStaticPagesAction } from "../redux/actions/StaticPageActions";

import AppRoutes from '../AppRoutes';
import StaticPageEditor from '../components/DataEditors/StaticPageEditor/StaticPageEditor';
import { Card } from 'primereact/card';
import { editStaticPagesTitle } from '../strings';
import { TabPanel, TabView } from 'primereact/tabview';

const ControlPanel = ({
    GetSaleAction,
    GetStaticPagesAction
}) => {

    const routes = useMemo(() => AppRoutes.routes.filter(route => route.editable), []);

    useEffect(() => {
        GetSaleAction();
    }, [GetSaleAction]);

    useEffect(() => {
        GetStaticPagesAction();
    }, [GetStaticPagesAction]);

    return (<Card className='mx-auto w-2/3'>
        <h2 className='w-fit mx-auto my-4 text-4xl font-bold text-green-600'>{editStaticPagesTitle}</h2>
        <TabView>
        {routes.map((route, index) => {
            return <TabPanel header={`${route.label} | ${route.location.slice(1)}`} key={`static-page-${route.location}`}>
                {(route.sub_nav || [route])?.map(sub_route => <StaticPageAccordion
                    key={`static-page-data-${sub_route.location}`}
                    route={sub_route} />
                )}
            </TabPanel>;
        })}
        </TabView>
    </Card>);
};

const StaticPageAccordion = ({
    route
}) => {
    return <Fieldset legend={`${route.label} | ${route.location.slice(1)}`}>
        <StaticPageEditor
            page_route={route.location} />
    </Fieldset>;
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps
    };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        GetStaticPagesAction,
        GetSaleAction
    }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(ControlPanel);