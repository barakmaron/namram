import StaticPagesDb from "./storage/StaticPages.js";

async function GetStaticPages() {
    return await StaticPagesDb.GetStaticPages();
}

async function AddStaticPage(page_route, display_type, category_id) {
    const added_static_page = await StaticPagesDb.AddStaticPage(page_route, display_type, category_id);
    return await StaticPagesDb.GetStaticPageById(added_static_page.id);
}

async function DeleteStaticPage(id) {
    return await StaticPagesDb.DeleteStaticPage(id);
}

const StaticPageService = {
    AddStaticPage,
    GetStaticPages,
    DeleteStaticPage
};

export default StaticPageService;