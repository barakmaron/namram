import React, { useCallback, useState } from 'react';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { Button } from '@mui/material';
import { FaPlus } from 'react-icons/fa';

import { AddProjectAction, DeleteProjectAction, EditProjectAction } from "../../../redux/actions/ProjectsActions/ProjectsActions";
import { AddImagesAction, DeleteImageAction } from "../../../redux/actions/ProjectsActions/ProjectImagesAction";
import { getProjects } from '../../../redux/selectors/projectsSelector';

import Form from '../../Form/Form';
import Modal from '../../Modal/Modal';
import SingleAccordion from '../SingleAccordion';
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
            <FaPlus />
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
                    SaveEditAction={edit_project} />;
            })}
        </div>
        {show_new_project_form && <Modal setClose={() => setShowNewProjectForm(false)}>
            <Form
                inputs={ProjectsForms.add_project}
                action={add_project} />
        </Modal>}
    </div>;
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
        AddProjectAction,
        DeleteProjectAction,
        AddImagesAction,
        DeleteImageAction,
        EditProjectAction
    }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(ProjectsEditor);