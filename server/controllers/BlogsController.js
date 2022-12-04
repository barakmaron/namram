import BlogsService from "../services/BlogsService.js";

async function GetAllBlogs(req, res) {
    try {
        const blogs = await BlogsService.GetAllBlogs();
        return res.status(200).json(blogs);
    } catch (err) {
        throw err;
    }
}

async function AddBlog(req, res) {
    try {
        const { Title, Text } = req.body;
        const { path, filename } = req.file;
        const blog = await BlogsService.AddBlog(Title, Text, {
            path,
            filename
        });
        return res.status(200).json(blog);
    } catch (err) {
        throw err;
    }
}

async function DeleteBlog(req, res) {
    try {
        const { id } = req.params;
        await BlogsService.DeleteBlog(id);
        return res.status(200).json();
    } catch (err) {
        throw err;
    }
}

async function PatchBlog(req, res) {
    try {
        const { id } = req.params;
        const { Title, Text } = req.body;
        await BlogsService.PatchBlog(id, Title, Text);
        return res.status(200).json();
    } catch (err) {
        throw err;
    }
}

const BlogsController = {
    GetAllBlogs,
    AddBlog,
    DeleteBlog,
    PatchBlog
};

export default BlogsController;