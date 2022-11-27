import { CircularProgress, ImageList, ImageListItem } from '@mui/material';
import React, { useCallback, useState } from 'react'
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import Image from '../../../components/DataEditors/ImageEditor/Image';
import TextParser from '../../../components/RichTextArea/TextParser';
import { GetImageUrl } from '../../../services/ApiService';

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

    if(project) 
        return <div>
            <h2
            className='w-fit text-3xl text-forest-green-600 font-bold mx-auto my-14'
            >{project.Title}</h2>
            <div
            className='mx-auto w-fit'
            >
                <TextParser body={project.Text}/>
            </div>
            <ImageList
            className='mx-12 my-10'
            cols={2}
            variant="quilted">
                {project.ProjectsImages.map(image => {
                    return <ImageListItem
                        key={`image-list-item-${image.id}`}
                        cols={1}
                        rows={1}>
                            <img
                            alt={project.Title}
                            src={GetImageUrl(image.Image)}
                            loading="lazy"/>
                        </ImageListItem>;
                })}
            </ImageList>
        </div>;
    else
        return <div>
            <CircularProgress />
        </div>
}

export default Project