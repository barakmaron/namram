import React from 'react';
import SearchRentalAgreements from './SearchRentalAgreements/SearchRentalAgreements';
import IncomeReportConnector from './IncomeReport/IncomeReportConnector';

const CreateReportsPage = () => {

  return <>
    <div className='flex mx-auto flex-col flex-wrap gap-12 justify-center w-fit'>
      <SearchRentalAgreements/>
      <IncomeReportConnector />
    </div>
  </>;
};

export default CreateReportsPage;