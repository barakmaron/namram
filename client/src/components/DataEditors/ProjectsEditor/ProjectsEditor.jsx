import { Button } from '@mui/material';
import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Form from '../../Form/Form';
import Modal from '../../Modal/Modal';
import SingleAccordion from '../SingleAccordion/SingleAccordion';
import ProjectsForms from './FormsConstants';

const ProjectsEditor = ({
    projects,
    AddProjectAction,
    DeleteProjectAction,
    EditProjectAction,
    AddImagesAction,
    DeleteImageAction
}) => {
    const [show_new_project_form, setShowNewProjectForm] = useState(false);

    const add_project = useCallback((event, form, image) => {
        event.preventDefault();
        AddProjectAction(form, image);
    }, [AddProjectAction]);

    const delete_project = useCallback((event, project_id) => {
        event.stopPropagation();
        DeleteProjectAction(project_id);
    }, [DeleteProjectAction]);

    const edit_project = useCallback((event, project_id, title, text) => {
        event.stopPropagation();
        EditProjectAction(project_id, title, text);
    }, [EditProjectAction]);


  return <div className='flex fle-row min-h-[20rem] w-full justify-center'>
    <Button
    variant="outlined"
    onClick={() => setShowNewProjectForm(true)}>
        <FaPlus/>
    </Button>
    <div className='w-1/2'>
        {projects.map((project, index) => {
            return <SingleAccordion 
            key={`projects-editor-${index}`}
            object={project}
            DeleteAction={delete_project}
            ImagesActions={{
                AddImagesAction,
                DeleteImageAction
            }}
            SaveEditAction={edit_project}/>;
        })}
    </div>
    { show_new_project_form && <Modal setClose={() => setShowNewProjectForm(false)}>
        <Form
        inputs={ProjectsForms.add_project}
        action={add_project}/>
    </Modal>}
  </div>;
};

export default ProjectsEditor;