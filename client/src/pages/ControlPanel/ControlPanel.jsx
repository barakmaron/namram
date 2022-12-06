import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import AppRoutes from '../../AppRoutes';
import StaticPageEditorConnector from '../../components/DataEditors/StaticPageEditor/StaticPageEditorConnector';

const ControlPanel = ({
  categories,
  GetSaleAction,
  GetStaticPagesAction
}) => {

  useEffect(() => {
    GetSaleAction();
  }, [GetSaleAction]);

  useEffect(() => {
    GetStaticPagesAction();
  }, [GetStaticPagesAction]);

  return (<div className='mx-auto w-1/2'>
      <h2
      className='w-fit mx-auto my-4 text-4xl font-bold text-green-600'
      >עריכת דפים סטטים</h2>
      {AppRoutes.routes.map(route => {
        return <React.Fragment key={`static-page-${route.location}`}>
          { !route.sub_nav && <StaticPageAccordion route={route}/>}      
          {route.sub_nav?.map(sub_route => {
            return <StaticPageAccordion 
            key={`static-page-data-${sub_route.location}`}
            route={sub_route}/>;
          })}  
        </React.Fragment>;
      })}
  </div>);
};

const StaticPageAccordion = ({
  route
}) => {
  return <Accordion 
  hidden={!route.editable}>
    <AccordionSummary >
      {route.label} | {route.location.slice(1)}
    </AccordionSummary>
    <AccordionDetails>
      <StaticPageEditorConnector
      page_route={route.location}/>
    </AccordionDetails>
  </Accordion>;
}

export default ControlPanel;