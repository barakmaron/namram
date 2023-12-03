import React, { useState, useEffect } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { useParams } from "react-router-dom";
import { CircularProgress, ImageListItem } from '@mui/material';

import { GetProjectsAction } from '../../redux/actions/ProjectsActions';
import { getProjects } from '../../redux/selectors/projectsSelector';
import TextParser from '../../components/TextParser';
import { GetImageUrl } from '../../services/ApiService';

const Project = ({
    projects,
    GetProjectsAction
}) => {

    const [project, setProject] = useState(undefined);
    const url_query = useParams();

    useEffect(() => {
        GetProjectsAction();
    }, [GetProjectsAction]);

    useEffect(() => {
        const project_id = url_query.id;
        const get_project = projects.find(project => project.id === project_id);
        setProject(get_project);
    }, [projects, url_query]);

    if (project)
        return <div>
            <h2
                className='w-fit text-3xl text-forest-green-600 font-bold mx-auto my-14'
            >{project.Title}</h2>
            <div
                className='mx-auto w-fit'
            >
                <TextParser body={project.Text} />
            </div>
            <ul
                className='sm:mx-12 mx-2 sm:my-10 my-2 sm:grid-cols-3 grid'
                variant="quilted">
                {project.ProjectsImages.map(image => {
                    return <ImageListItem
                        key={`image-list-item-${image.id}`}
                        cols={1}
                        rows={1}>
                        <img
                            alt={project.Title}
                            src={GetImageUrl(image.Image)}
                            loading="lazy" />
                    </ImageListItem>;
                })}
            </ul>
        </div>;
    else
        return <div>
            <CircularProgress />
        </div>
}

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

export default connect(mapStateToProps, mapActionToProps)(Project);