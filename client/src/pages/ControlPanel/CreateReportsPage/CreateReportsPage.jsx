import React from 'react';
import SearchRentalAgreements from './SearchRentalAgreements/SearchRentalAgreements';
import IncomeReportConnector from './IncomeReport/IncomeReportConnector';

const CreateReportsPage = () => {

  return <>
    <div className='flex mx-auto flex-col flex-wrap gap-12 justify-center w-fit'>
    <h2 className="w-fit mx-auto my-4 text-4xl font-bold text-green-600">
      הפקת דוחות
    </h2>
      <SearchRentalAgreements/>
      <IncomeReportConnector />
    </div>
  </>;
};

export default CreateReportsPage;