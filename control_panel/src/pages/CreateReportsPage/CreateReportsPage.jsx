import React from 'react';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { getCategories } from "../../redux/selectors/categoriesSelector";
import { GetRentAction } from "../../redux/actions/RentActions/RentActions";

import SearchRentalAgreements from './SearchRentalAgreements';
import IncomeReport from './IncomeReport';

const CreateReportsPage = () => {

  return <>
    <div className='flex mx-auto flex-col flex-wrap gap-12 justify-center w-fit'>
      <h2 className="w-fit mx-auto my-4 text-4xl font-bold text-green-600">
        הפקת דוחות
      </h2>
      <SearchRentalAgreements />
      <IncomeReport />
    </div>
  </>;
};

const mapStateToProps = (state, ownProps) => {
  const rent_categories = getCategories(state);
  return { 
      ...ownProps, 
      rent_categories
  };
};

const mapActionToProps = (dispatch) => {
  return bindActionCreators({
      GetRentAction
  }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(CreateReportsPage);