import React, { useEffect } from 'react';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { GetProjectsAction } from '../../redux/actions/ProjectsActions/ProjectsActions';
import { getProjects } from '../../redux/selectors/projectsSelector';
import ProjectsEditor from '../../components/DataEditors/ProjectsEditor/ProjectsEditor';

const ProjectsEditorPage = ({
  GetProjectsAction
}) => {

  useEffect(() => {
    GetProjectsAction();
  }, [GetProjectsAction]);

  return <div className='w-full mx-auto flex flex-col'>
    <h2 className="w-fit mx-auto my-4 text-4xl font-bold text-green-600">
      פרוייקטים
    </h2>
    <ProjectsEditor />
  </div>
};

const mapStateToProps = (state, ownProps) => {
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

export default connect(mapStateToProps, mapActionToProps)(ProjectsEditorPage);