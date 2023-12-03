import React, { useEffect, useState } from 'react';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { getCategories } from "../redux/selectors/categoriesSelector";
import { GetCategoryAction } from "../redux/actions/CategoriesActions";
import BreadCrumb from '../components/BreadCrumb';

const CategoryPage = ({
    categories,
    GetCategoryAction
}) => {

    const [category, setCategory] = useState(undefined);
    const url_query = useParams();
    const category_id = url_query.id;

    useEffect(() => {
        GetCategoryAction(category_id);
    }, [GetCategoryAction, category_id]);

    useEffect(() => {
        setCategory(() => categories?.find(category => category.id === category_id));
    }, [categories, category_id]);

    return category && <>
        <Helmet>
            <title>נמרם | {category.Name}</title>
        </Helmet>
        <div className='lg:w-[70vw] w-screen mx-auto pb-5'>
            <BreadCrumb category={category} />
        </div>
    </>;
}

const mapStateToProps = (state, ownProps) => {
    const categories = getCategories(state);
    return { ...ownProps, categories };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        GetCategoryAction
    }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(CategoryPage);