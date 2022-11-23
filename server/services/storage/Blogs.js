import { BlogsModel } from "../../db/models/index.js";

async function GetAllBlogs() {
    return await BlogsModel.findAll();
}

async function GetBlogById(id) { 
    return await BlogsModel.findOne({
        where: {
            id: id
        }
    })
}

async function AddBlog(title, text, image) {
    return await BlogsModel.create({
        Title: title,
        Text: text,
        Image: image
    })
}

async function DeleteBlog(id) {
    return await BlogsModel.destroy({
        where: {
            id: id
        }
    });
}

async function PatchBlog(id, title, text) {
    return await BlogsModel.update({
        Title: title,
        Text: text
    }, {
        where: {
            id: id
        }
    });
}

const BlogsDB = {
    GetAllBlogs,
    AddBlog,
    DeleteBlog,
    GetBlogById,
    PatchBlog
};

export default BlogsDB;