
import ProjectsDB from "../storage/Projects/Projects.js";
import ProjectsImagesService from "./ProjectImagesService.js";
import moment from 'moment';

async function GetAllProjects() {
    return await ProjectsDB.GetAllProjects();
}

async function GetProjectById(id) {
    return await ProjectsDB.GetProjectById(id);
}

async function AddProject(title, text, date, images) {
    const parsed_date = moment(date, 'DD/MM/YYYY').toString();
    const project = await ProjectsDB.AddProject(title, text, parsed_date);
    await ProjectsImagesService.AddImages(images, project.id);
    return await GetProjectById(project.id);
}

async function DeleteProject(id) {
    const project = await GetProjectById(id);
    const delete_images = ProjectsImagesService.DeleteImages(project.ProjectsImages, project.id);
    return [await Promise.all([ProjectsDB.DeleteProject(id), delete_images])];
}

async function PatchProject(id, title, text) {
    return await ProjectsDB.PatchProject(id, title, text);
}

const ProjectsService = {
    GetAllProjects,
    AddProject,
    DeleteProject,
    PatchProject
};

export default ProjectsService;