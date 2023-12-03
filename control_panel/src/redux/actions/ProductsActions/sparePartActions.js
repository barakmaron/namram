import ApiMessagesConstants from "../../../ApiMessagesConstants";
import Constants from "../../../Constants";
import SendApiRequest from "../../../services/ApiService";
import ACTIONS from "../actionConstants/Products/SparePartsActionConstants";
import { DispatchError, Successful } from "../ApiHandlerActions";

const AddSparePart = (product_id, category_id, diagram_id, part_from, product_type) => ({
    type: ACTIONS.ADD_SPARE_PART,
    payload: {
        product_id,
        category_id,
        diagram_id,
        part_from, 
        product_type
    }
});

const UpdateSparePart = (product_id, category_id, diagram_id, new_part, product_type) => ({
    type: ACTIONS.UPDATE_SPARE_PART,
    payload: {
        product_id,
        category_id,
        diagram_id,
        new_part,
        product_type
    }
});

const DeleteSparePart = (product_id, category_id, diagram_id, part_id, product_type) => ({
    type: ACTIONS.DELETE_SPARE_PART,
    payload: {
        product_id, 
        category_id,
        diagram_id,
        part_id,
        product_type
    }
});

const PatchSparePart = (part_id, product_id, category_id, diagram_id, field_name, value, newDiagramId, product_type) => ({
    type: ACTIONS.PATCH_SPARE_PART_PROP,
    payload: {
        part_id,
        product_id,
        category_id,
        diagram_id,
        field_name,
        value,
        newDiagramId,
        product_type
    }
});

export const AddSparePartAction =  (product_id, category_id, diagram_id, part_from, product_type) => {
    return async (dispatch) => {
        try {
            dispatch(AddSparePart(product_id, category_id, diagram_id, part_from, product_type));
            const new_part = await SendApiRequest(`/products/spare_parts`, Constants.API_METHODS.POST, {
                ...part_from,
                diagram_id   
            });
            dispatch(UpdateSparePart(product_id, category_id, diagram_id, new_part, product_type));
            dispatch(Successful(ApiMessagesConstants.product.sparePart.addPart.successful));
        } catch (err) {
            dispatch(UpdateSparePart(product_id, category_id, diagram_id, {}, product_type));
            DispatchError(dispatch, err, ApiMessagesConstants.product.sparePart.addPart.failed);
        }
    }
};

export const DeleteSparePartAction = (product_id, category_id, diagram_id, part_id, product_type) => {
    return async (dispatch) => {
        try {
            dispatch(DeleteSparePart(product_id, category_id, diagram_id, part_id, product_type));
            await SendApiRequest(`/products/spare_parts/${part_id}`, Constants.API_METHODS.DELETE);
            dispatch(Successful(ApiMessagesConstants.product.sparePart.deletePart.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.product.sparePart.deletePart.failed);
        }
    }
}

export const PatchSparePartAction = (part_id, product_id, category_id, diagram_id, field_name, value, product_type) => {
    return async (dispatch) => {
        try {            
            const newDiagramId = await SendApiRequest(`/products/spare_parts/${part_id}`, Constants.API_METHODS.PATCH, {
                field_name,
                value
            });
            dispatch(PatchSparePart(part_id, product_id, category_id, diagram_id, field_name, value, newDiagramId, product_type));
            dispatch(Successful(ApiMessagesConstants.product.sparePart.patchPart.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.product.sparePart.patchPart.failed);
        }
    }
}