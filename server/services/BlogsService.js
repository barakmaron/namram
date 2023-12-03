import ImageService from "./ImageService.js";
import BlogsDB from "./storage/Blogs.js";

async function GetAllBlogs() {
    return await BlogsDB.GetAllBlogs();
}

async function GetBlogById(id) {
    return await BlogsDB.GetBlogById(id);
}

async function AddBlog(title, text, image) {
    return await BlogsDB.AddBlog(title, text, image[0]);
}

async function DeleteBlog(id) {
    const blog = await GetBlogById(id);
    const delete_image = ImageService.DeleteStoredImages(blog.Image);
    return [await Promise.all([BlogsDB.DeleteBlog(id), delete_image])];
}

async function PatchBlog(id, title, text) {
    return await BlogsDB.PatchBlog(id, title, text);
}

const BlogsService = {
    GetAllBlogs,
    AddBlog,
    DeleteBlog,
    PatchBlog
};

export default BlogsService;