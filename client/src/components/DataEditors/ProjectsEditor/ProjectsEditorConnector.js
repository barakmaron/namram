import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { AddProjectAction, DeleteProjectAction, EditProjectAction } from "../../../redux/actions/ProjectsActions/ProjectsActions";
import { AddImagesAction, DeleteImageAction } from "../../../redux/actions/ProjectsActions/ProjectImagesAction";
import { getProjects } from '../../../redux/selectors/projectsSelector';
import ProjectsEditor from "./ProjectsEditor";

const maStateToProps = (state, ownProps) => {
    const projects = getProjects(state);
    return { 
        ...ownProps,
        projects
    };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        AddProjectAction,
        DeleteProjectAction,
        AddImagesAction,
        DeleteImageAction,
        EditProjectAction
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(ProjectsEditor);