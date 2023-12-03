import ProjectsService from "../../services/ProjectsServices/ProjectsService.js";
import { StatusCode } from 'status-code-enum';

async function GetAllProjects(req, res, next) {
    try {
        const projects = await ProjectsService.GetAllProjects();
        return res.status(StatusCode.SuccessOK).json(projects);
    } catch (err) {
        next(err);
    }
}

async function AddProject(req, res, next) {
    try {
        const { Title, Text, Date, filesNames } = req.body;        
        const project = await ProjectsService.AddProject(Title, Text, Date, filesNames);
        return res.status(StatusCode.SuccessOK).json(project);
    } catch (err) {
        next(err);
    }
}

async function DeleteProject(req, res, next) {
    try {
        const { id } = req.params;
        await ProjectsService.DeleteProject(id);
        return res.status(StatusCode.SuccessOK).json();
    } catch (err) {
        next(err);
    }
}

async function PatchProject(req, res, next) {
    try {
        const { id } = req.params;
        const { Title, Text } = req.body;
        await ProjectsService.PatchProject(id, Title, Text);
        return res.status(StatusCode.SuccessOK).json();
    } catch (err) {
        next(err);
    }
}

const ProjectsController = {
    GetAllProjects,
    AddProject,
    DeleteProject,
    PatchProject
};

export default ProjectsController;