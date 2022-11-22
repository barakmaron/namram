import Constants from "../../../Constants";
import SendApiRequest from "../../../services/ApiService";
import ACTIONS from "../actionConstants/Products/DiagramActionConstants";

const AddDiagram = (product_id, category_id, diagram_form, temp_image_url, product_type) => ({
    type: ACTIONS.ADD_DIAGRAM,
    payload: {
        product_id,
        category_id,
        diagram_form,
        temp_image_url,
        product_type
    }
});

const UpdateDiagram = (product_id, category_id, diagram, product_type) => ({
    type: ACTIONS.UPDATE_DIAGRAM,
    payload: {
        product_id,
        category_id, 
        diagram,
        product_type
    }
});

const DeleteDiagram = (product_id, category_id, diagram_id, product_type) => ({
    type: ACTIONS.DELETE_DIAGRAM,
    payload: {
        product_id,
        category_id,
        diagram_id,
        product_type
    }
});

const PatchDiagram = (diagram_id, value, product_id, category_id, product_type) => ({
    type: ACTIONS.PATCH_DIAGRAM,
    payload: {
        product_id,
        category_id,
        diagram_id,
        value,
        product_type
    }
});

export const AddDiagramAction = (product_id, category_id, diagram_form, temp_image_url, product_type) => {
    return async (dispatch) => {
        try {
            dispatch(AddDiagram(product_id, category_id, diagram_form, temp_image_url, product_type));
            diagram_form.append('product_id', product_id);
            const diagram = await SendApiRequest(`/products/diagrams`, Constants.API_METHODS.POST, diagram_form);
            dispatch(UpdateDiagram(product_id, category_id, diagram, product_type));
        } catch (err) {

        }
    }
}

export const DeleteDiagramAction = (product_id, category_id, diagram_id, product_type) => {
    return async (dispatch) => {
        try {
            dispatch(DeleteDiagram(product_id, category_id, diagram_id, product_type));
            await SendApiRequest(`/products/diagrams/${diagram_id}`, Constants.API_METHODS.DELETE);
        } catch (err) {

        }
    }
}

export const PatchDiagramAction = (diagram_id, value, product_id, category_id, product_type) => {
    return async (dispatch) => {
        try {
            dispatch(PatchDiagram(diagram_id, value, product_id, category_id, product_type));
            await SendApiRequest(`/products/diagrams/${diagram_id}`, Constants.API_METHODS.PATCH, {
                value
            });
        } catch (err) {

        }
    }
}