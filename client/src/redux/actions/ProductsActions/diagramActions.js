import ApiMessagesConstants from "../../../ApiMessagesConstants";
import Constants from "../../../Constants";
import SendApiRequest from "../../../services/ApiService";
import ACTIONS from "../actionConstants/Products/DiagramActionConstants";
import { DispatchError, Successful } from "../ApiHandlerActions";

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

const GetDiagrams = (diagrams) => ({
    type: ACTIONS.GET_DIAGRAMS,
    payload: diagrams
});

export const AddDiagramAction = (product_id, category_id, diagram_form, temp_image_url, product_type) => {
    return async (dispatch) => {
        try {
            dispatch(AddDiagram(product_id, category_id, diagram_form, temp_image_url, product_type));
            diagram_form.append('product_id', product_id);
            const diagram = await SendApiRequest(`/products/diagrams`, Constants.API_METHODS.POST, diagram_form);
            dispatch(UpdateDiagram(product_id, category_id, diagram, product_type));
            dispatch(Successful(ApiMessagesConstants.product.diagram.addDiagram.successful));
        } catch (err) {
            dispatch(UpdateDiagram(product_id, category_id, {}, product_type));
            DispatchError(dispatch, err, ApiMessagesConstants.product.diagram.addDiagram.failed);
        }
    };
};

export const AddDiagramFromListAction = (product_id, category_id, diagram, product_type) => {
    return async (dispatch) => {
        try {  
            const parsed_diagram = await SendApiRequest(`/products/diagrams/${diagram.id}`, Constants.API_METHODS.POST, {
                product_id
            });
            dispatch(UpdateDiagram(product_id, category_id, parsed_diagram, product_type));
            dispatch(Successful(ApiMessagesConstants.product.diagram.addDiagram.successful));
        } catch (err) {
            dispatch(UpdateDiagram(product_id, category_id, {}, product_type));
            DispatchError(dispatch, err, ApiMessagesConstants.product.diagram.addDiagram.failed);
        }
    };
};

export const DeleteDiagramAction = (product_id, category_id, diagram_id, product_type) => {
    return async (dispatch) => {
        try {
            dispatch(DeleteDiagram(product_id, category_id, diagram_id, product_type));
            await SendApiRequest(`/products/diagrams/${diagram_id}`, Constants.API_METHODS.DELETE);
            dispatch(Successful(ApiMessagesConstants.product.diagram.deleteDiagram.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.product.diagram.deleteDiagram.failed);
        }
    };
};

export const DeleteDiagramFromProductAction = (product_id, category_id, diagram_id, product_type) => {
    return async (dispatch) => {
        try {
            dispatch(DeleteDiagram(product_id, category_id, diagram_id, product_type));
            await SendApiRequest(`/products/diagrams/${diagram_id}/${product_id}`, Constants.API_METHODS.DELETE);
            dispatch(Successful(ApiMessagesConstants.product.diagram.deleteDiagramFromProduct.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.product.diagram.deleteDiagramFromProduct.failed);
        }
    };
};

export const PatchDiagramAction = (diagram_id, value, product_id, category_id, product_type) => {
    return async (dispatch) => {
        try {
            dispatch(PatchDiagram(diagram_id, value, product_id, category_id, product_type));
            await SendApiRequest(`/products/diagrams/${diagram_id}`, Constants.API_METHODS.PATCH, {
                value
            });
            dispatch(Successful(ApiMessagesConstants.product.diagram.patchDiagram.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.product.diagram.patchDiagram.failed);
        }
    };
};

export const GetDiagramsAction = () => {
    return async (dispatch) => {
        try {
            const diagrams = await SendApiRequest(`/products/diagrams`);
            dispatch(GetDiagrams(diagrams));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.product.diagram.getDiagrams.failed);
        }
    };
};