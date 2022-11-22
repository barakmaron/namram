import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import DiagramEditor from "./DiagramEditor";
import { AddDiagramAction, DeleteDiagramAction, PatchDiagramAction } from "../../../redux/actions/ProductsActions/diagramActions";

const maStateToProps = (state, ownProps) => {
    return { ...ownProps };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        AddDiagramAction,
        DeleteDiagramAction,
        PatchDiagramAction
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(DiagramEditor);