
const AddStaticPage = {
    PageRoute: {
        notEmpty: true,
        type: "string",
        minLength: 3
    },
    CategoryId: {
        notEmpty: true,
        type: "string",
        minLength: 36
    },
    DisplayType: {
        type: "string",
        minLength: 8,
        maxLength: 10
    }
};

const DeleteStaticPage = {
    id: {
        notEmpty: true,
        type: "string",
        minLength: 36,
        in: ["params"]
    }
}

const StaticPagesSchemas = {
    AddStaticPage,
    DeleteStaticPage
};

export default StaticPagesSchemas;