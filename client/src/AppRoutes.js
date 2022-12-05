
import Constants from "./Constants";
import AirHammers from "./pages/AirHammers/AirHammers";
import BlogConnector from "./pages/BlogsPage/Blog/BlogConnector";
import BlogsPageConnector from "./pages/BlogsPage/BlogsPageConnector";
import CableCutting from "./pages/CableCuting/CableCuting";
import CategoryPageConnector from "./pages/CategoryPage/CategoryPageConnector";
import ContactConnector from "./pages/ContactPage/ContactConnector";
import BlogEditorPageConnector from "./pages/ControlPanel/BlogEditorPage/BlogEditorPageConnector";
import ControlPanelConnector from "./pages/ControlPanel/ControlPanelConnector";
import CreateReportsPageConnector from "./pages/ControlPanel/CreateReportsPage/CreateReportsPageConnector";
import CustomersPageConnector from "./pages/ControlPanel/CustomersPage/CustomersPageConnector";
import LoginConnector from "./pages/ControlPanel/LoginPage/LoginConnector";
import ProjectsEditorPageConnector from "./pages/ControlPanel/ProjectsEditorPage/ProjectsEditorPageConnector";
import RentalControlPanelConnector from "./pages/ControlPanel/RentalPage/RentalControlPanelConnector";
import ServicePageConnector from "./pages/ControlPanel/ServicePage/ServicePageConnector";
import ToolsPageConnector from "./pages/ControlPanel/ToolsPage/ToolsPageConnector";
import Cut from "./pages/CutPage/Cut";
import Drill from "./pages/DrillPage/DrillPage";
import Eilat from "./pages/EilatPage/Eilat";
import Home from "./pages/HomePage/Home";
import ProductPageConnector from "./pages/ProductPage/ProductPageConnector";
import ProjectConnector from "./pages/ProjectsPage/Project/ProjectConnector";
import ProjectsConnector from "./pages/ProjectsPage/ProjectsConnector";
import Rent from "./pages/RentPage/Rent";
import Shop from "./pages/ShopPage/Shop";

const routes = [{
    label: "דף הבית",
    location: "/",
    element: Home,
    editable: true,
    show: true,
}, {
    label: "השכרת ציוד",
    location: "/rent",
    element: Rent,
    editable: false,
    show: true
}, {
    label: "מכירת ציוד",
    location: "/sale",
    element: Shop,
    editable: false,
    show: true
}, {
    label: "ניסור וקידוח בבטון",
    location: "/cut",
    element: Cut,
    editable: true,
    show: true,
    sub_nav: [{
        label: "ניסור בטון",
        location: "/cut",
        element: Cut,
        editable: true,
        show: true
    }, {
        label: "קידוח בטון",
        location: "/drill",
        element: Drill,
        editable: true,
        show: true
    }, {
        label: "פרוייקטים",
        location: "/projects",
        element: ProjectsConnector,
        editable: false,
        show: true,
        child: [{
            element: ProjectConnector,
            location: '/project/:id'
        }] 
    }]
}, {
    label: "פטישי חציבה אוויר",
    location: "/air_hammers",
    element: AirHammers,
    editable: true,
    show: true
}, {
    label: "כבל יהלום לניסור",
    location: "/wire_saw",
    element: CableCutting,
    editable: true,
    show: true
}, {
    label: "סניף אילת",
    location: "/eilat",
    element: Eilat,
    editable: false,
    show: true
}, {
    label: "מאמרים",
    location: "/blogs",
    element: BlogsPageConnector,
    editable: false,
    show: true,
    child: [{
        element: BlogConnector,
        location: '/blog/:id'
    }] 
}, {
    label: "צור קשר",
    location: "/contact",
    element: ContactConnector,
    editable: false,
    show: true,
}, {
    label: "התחבר",
    location: "/login",
    element: LoginConnector,
    editable: false,
    show: false
}, {
    label: "קטגוריה",
    location: "/category",
    element: CategoryPageConnector,
    editable: false,
    show: false,
    child: [{
        element: CategoryPageConnector,
        location: '/category/:id',  
        show_dynamic: true      
    }, {
        element: ProductPageConnector,
        location: '/category/:category_id/product/:product_id',
    }]
}];

const admin_routes = [{
    label: "לוח בקרה",
    location: "/control_panel",
    element: ControlPanelConnector
}, {
    label: "השכרת ציוד",
    location: "/control_panel/rent",
    element: RentalControlPanelConnector,
    sub_nav: [{
        label: "השכרות",
        location: "/control_panel/rent",
        element: RentalControlPanelConnector
    }, {
        label: "כלים השכרה",
        location: "/control_panel/rent/tools",
        element: ToolsPageConnector,
        props: { 
            product_type: Constants.API_PRODUCT_TYPE.RENT 
        }
    }, {
        label: "לקוחות השכרה",
        location: "/control_panel/rent/customers",
        element: CustomersPageConnector,
    }, {
        label: "תיקונים",
        location: "/control_panel/rent/service",
        element: ServicePageConnector,
    }, {
        label: "הפקת דוחות",
        location: "/control_panel/rent/reports",
        element: CreateReportsPageConnector,
    }]
}, {
    label: "מכירת ציוד",
    location: "/control_panel/sale",
    element: ToolsPageConnector,
    props: { 
        product_type: Constants.API_PRODUCT_TYPE.SALE 
    }
}, {
    label: "בלוג",
    location: "/control_panel/blogs",
    element: BlogEditorPageConnector
}, {
    label: "פרוייקטים",
    location: "/control_panel/projects",
    element: ProjectsEditorPageConnector
}, {
    label: "התנתק",
    location: "/logout",
    element: LoginConnector,
    props: {
        logout: true
    }
}];

const AppRoutes = {
    routes,
    admin_routes
};

export default AppRoutes;