import ErrorMessages from "./ErrorMessages.js";

const AddStaticPage = {
    PageRoute: {
        isLength: {
            options: { 
                min: 1
            }
        },
        errorMessage: ErrorMessages.page_route,
    },
    CategoryId: {
        isLength: {
            options: { 
                min: 3
            }
        },
        errorMessage: ErrorMessages.id,
    }
};

const DeleteStaticPage = {
    id: {
        isLength: {
            options: { 
                min: 3
            }
        },
        errorMessage: ErrorMessages.id,
        in: ["params"]
    }
}

const StaticPagesSchemas = {
    AddStaticPage,
    DeleteStaticPage
};

export default StaticPagesSchemas;