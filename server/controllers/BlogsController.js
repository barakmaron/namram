import BlogsService from "../services/BlogsService.js";
import { StatusCode } from 'status-code-enum';

async function GetAllBlogs(req, res, next) {
    try {
        const blogs = await BlogsService.GetAllBlogs();
        return res.status(StatusCode.SuccessOK).json(blogs);
    } catch (err) {
        next(err);
    }
}

async function AddBlog(req, res, next) {
    try {
        const { Title, Text } = req.body;
        const { path, filename } = req.file;
        const blog = await BlogsService.AddBlog(Title, Text, {
            path,
            filename
        });
        return res.status(StatusCode.SuccessOK).json(blog);
    } catch (err) {
        next(err);
    }
}

async function DeleteBlog(req, res, next) {
    try {
        const { id } = req.params;
        await BlogsService.DeleteBlog(id);
        return res.status(StatusCode.SuccessOK).json();
    } catch (err) {
        next(err);
    }
}

async function PatchBlog(req, res, next) {
    try {
        const { id } = req.params;
        const { Title, Text } = req.body;
        await BlogsService.PatchBlog(id, Title, Text);
        return res.status(StatusCode.SuccessOK).json();
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