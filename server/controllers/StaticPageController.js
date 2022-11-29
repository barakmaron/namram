import StaticPageService from "../services/StaticPageService.js";

async function GetStaticPages(req, res) {
    try {
        const static_pages = await StaticPageService.GetStaticPages();
        return res.status(200).json(static_pages);
    } catch (err) {
        console.log(err);
    }
}

async function AddStaticPage(req, res) {
    try {
        const { PageRoute, DisplayType, CategoryId } = req.body;
        const added_page = await StaticPageService.AddStaticPage(PageRoute, DisplayType, CategoryId);
        return res.status(200).json(added_page);
    } catch (err) {
        console.log(err)
    }
}

async function DeleteStaticPage(req, res) {
    try {
        const { id } = req.params;
        await StaticPageService.DeleteStaticPage(id);
        return res.status(200).json();
    } catch (err) {
        console.log(err)
    }
}


const StaticPageController = {
    AddStaticPage,
    GetStaticPages,
    DeleteStaticPage
};

export default StaticPageController;