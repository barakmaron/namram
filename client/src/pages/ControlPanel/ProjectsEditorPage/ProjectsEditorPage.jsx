import React from 'react';
import { useEffect } from 'react';
import ProjectsEditorConnector from '../../../components/DataEditors/ProjectsEditor/ProjectsEditorConnector';

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
  <ProjectsEditorConnector />
</div>
};

export default ProjectsEditorPage;