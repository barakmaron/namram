import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SparePartsEditor from "./SparePartsEditor";
import { AddSparePartAction, DeleteSparePartAction, PatchSparePartAction } from "../../../redux/actions/ProductsActions/sparePartActions";

const mapStateToProps = (state, ownProps) => {
    return { ...ownProps };
};

const mapActionsToProps = (dispatch) => {
    return bindActionCreators({
        AddSparePartAction,
        DeleteSparePartAction,
        PatchSparePartAction
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(SparePartsEditor);