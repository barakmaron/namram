import PropsActions from "./PropsActionConstants";
import ImagesActions from './ImagesActionConstants';
import DiagramActions from './DiagramActionConstants';
import SparePartsActions from './SparePartsActionConstants';
import ScheduledActions from './ScheduledServiceConstants';

const ACTIONS = {
    ADD_PRODUCT: "ADD_PRODUCT",
    UPDATE_PRODUCT: "UPDATE_PRODUCT",
    DELETE_PRODUCT: "DELETE_PRODUCT",
    PATCH_PRODUCT: "PATCH_PRODUCT",
    CHANGE_PRODUCT_CATEGORY: "CHANGE_PRODUCT_CATEGORY",
    PROPS_ACTIONS: PropsActions,
    IMAGES_ACTIONS: ImagesActions,
    DIAGRAM_ACTIONS: DiagramActions,
    SPARE_PARTS_ACTIONS: SparePartsActions,
    UPDATE_TEXT: "UPDATE_TEXT",
    SCHEDULED_SERVICE_ACTIONS: ScheduledActions
};

export default ACTIONS;