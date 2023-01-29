import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import Projects from "./Projects";
import { GetProjectsAction } from '../../redux/actions/ProjectsActions/ProjectsActions';
import { getProjects } from '../../redux/selectors/projectsSelector';

const maStateToProps = (state, ownProps) => {
    const projects = getProjects(state);
    return { 
        ...ownProps,
        projects
    };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        GetProjectsAction
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(Projects);