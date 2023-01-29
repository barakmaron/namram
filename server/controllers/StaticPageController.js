import StaticPageService from "../services/StaticPageService.js";
import { StatusCode } from 'status-code-enum';

async function GetStaticPages(req, res, next) {
    try {
        const { route } = req.query;
        const static_pages = await StaticPageService.GetStaticPages(route);
        return res.status(StatusCode.SuccessOK).json(static_pages);
    } catch (err) {
        next(err);
    }
}

async function AddStaticPage(req, res, next) {
    try {
        const { PageRoute, DisplayType, CategoryId } = req.body;
        const added_page = await StaticPageService.AddStaticPage(PageRoute, DisplayType, CategoryId);
        return res.status(StatusCode.SuccessOK).json(added_page);
    } catch (err) {
        next(err);
    }
}

async function DeleteStaticPage(req, res, next) {
    try {
        const { id } = req.params;
        await StaticPageService.DeleteStaticPage(id);
        return res.status(StatusCode.SuccessOK).json();
    } catch (err) {
        next(err);
    }
}


const StaticPageController = {
    AddStaticPage,
    GetStaticPages,
    DeleteStaticPage
};

export default StaticPageController;