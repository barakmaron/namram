import FORMS from "../../Form/Forms";

const BlogsForms = {
    add_blog: [{
        type: FORMS.INPUTS_TYPES.TEXT,
        name: "Title",
        place_holder: "Title"
    }, {
        type: FORMS.INPUTS_TYPES.FILE,
        name: "Image",
        place_holder: "Image"
    }, {
        type: FORMS.INPUTS_TYPES.TEXT_AREA,
        name: "Text",
        place_holder: "Text"
    }]
};

export default BlogsForms;