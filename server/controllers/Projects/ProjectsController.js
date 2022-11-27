import ProjectsService from "../../services/ProjectsServices/ProjectsService.js";

async function GetAllProjects(req, res) {
    try {
        const projects = await ProjectsService.GetAllProjects();
        return res.status(200).json(projects);
    } catch (err) {

    }
}

async function AddProject(req, res) {
    try {
        const { Title, Text, Date } = req.body;
        const images = req.files.map((file) => ({
            path: file.path, 
            filename: file.filename 
        }));  
        const project = await ProjectsService.AddProject(Title, Text, Date, images);
        return res.status(200).json(project);
    } catch (err) {
        console.log(err);
    }
}

async function DeleteProject(req, res) {
    try {
        const { id } = req.params;
        await ProjectsService.DeleteProject(id);
        return res.status(200).json();
    } catch (err) {
        console.log(err);
    }
}

async function PatchProject(req, res) {
    try {
        const { id } = req.params;
        const { Title, Text } = req.body;
        await ProjectsService.PatchProject(id, Title, Text);
        return res.status(200).json();
    } catch (err) {

    }
}

const ProjectsController = {
    GetAllProjects,
    AddProject,
    DeleteProject,
    PatchProject
};

export default ProjectsController;