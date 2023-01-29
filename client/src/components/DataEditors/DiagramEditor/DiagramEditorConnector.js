import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import DiagramEditor from "./DiagramEditor";
import { AddDiagramAction, AddDiagramFromListAction, DeleteDiagramAction, DeleteDiagramFromProductAction, PatchDiagramAction, GetDiagramsAction } from "../../../redux/actions/ProductsActions/diagramActions";
import { getDiagrams } from "../../../redux/selectors/categoriesSelector";

const maStateToProps = (state, ownProps) => {
    const diagrams = getDiagrams(state);
    return { 
        ...ownProps,
        diagrams
    };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        AddDiagramAction,
        AddDiagramFromListAction,
        DeleteDiagramAction,
        DeleteDiagramFromProductAction,
        PatchDiagramAction,
        GetDiagramsAction
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(DiagramEditor);