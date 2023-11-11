
import Constants from "./Constants";
import Page404 from "./pages/404";
import AirHammers from "./pages/AirHammers";
import Blog from "./pages/Blog";
import BlogsPage from "./pages/BlogsPage";
import CableCutting from "./pages/CableCuting";
import CategoryPage from "./pages/CategoryPage";
import Contact from "./pages/ContactPage/Contact";
import BlogEditorPage from "./pages/ControlPanel/BlogEditorPage";
import ControlPanel from "./pages/ControlPanel/ControlPanel";
import CreateReportsPage from "./pages/ControlPanel/CreateReportsPage/CreateReportsPage";
import CustomersPage from "./pages/ControlPanel/CustomersPage/CustomersPage";
import Login from "./pages/ControlPanel/LoginPage/Login";
import ProjectsEditorPage from "./pages/ControlPanel/ProjectsEditorPage";
import RentalControlPanel from "./pages/ControlPanel/RentalPage/RentalControlPanel";
import ServicePage from "./pages/ControlPanel/ServicePage/ServicePage";
import ToolsPage from "./pages/ControlPanel/ToolsPage";
import Cut from "./pages/Cut";
import Drill from "./pages/DrillPage";
import Eilat from "./pages/Eilat";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Project from "./pages/ProjectsPage/Project";
import Projects from "./pages/ProjectsPage/Projects";
import Rent from "./pages/Rent";
import Shop from "./pages/Shop";

const routes = [{
    label: "דף הבית",
    location: "/",
    element: Home,
    editable: true,
    show: true,
}, {
    label: "השכרת ציוד",
    location: "/RentPage",
    element: Rent,
    editable: false,
    show: true
}, {
    label: "מכירת ציוד",
    location: "/SalePage",
    element: Shop,
    editable: false,
    show: true
}, {
    label: "ניסור וקידוח בבטון",
    location: "/Cut",
    element: Cut,
    editable: true,
    show: true,
    sub_nav: [{
        label: "ניסור בטון",
        location: "/Cut",
        element: Cut,
        editable: true,
        show: true
    }, {
        label: "קידוח בטון",
        location: "/Drill",
        element: Drill,
        editable: true,
        show: true
    }, {
        label: "פרוייקטים",
        location: "/Projects",
        element: Projects,
        editable: false,
        show: true,
        child: [{
            element: Project,
            location: '/Project/:id'
        }] 
    }]
}, {
    label: "פטישי חציבה אוויר",
    location: "/Air_hammers",
    element: AirHammers,
    editable: true,
    show: true
}, {
    label: "כבל יהלום לניסור",
    location: "/Wire_saw",
    element: CableCutting,
    editable: true,
    show: true
}, {
    label: "סניף אילת",
    location: "/Eilat",
    element: Eilat,
    editable: false,
    show: true
}, {
    label: "מאמרים",
    location: "/Blogs",
    element: BlogsPage,
    editable: false,
    show: true,
    child: [{
        element: Blog,
        location: '/Blog/:id'
    }] 
}, {
    label: "צור קשר",
    location: "/Contact",
    element: Contact,
    editable: false,
    show: true,
}, {
    label: "התחבר",
    location: "/login",
    element: Login,
    editable: false,
    show: false
}, {
    label: "קטגוריה",
    location: "/category",
    element: CategoryPage,
    editable: false,
    show: false,
    child: [{
        element: CategoryPage,
        location: '/category/:id',  
        show_dynamic: true      
    }, {
        element: ProductPage,
        location: '/category/:category_id/product/:product_id',
    }]
}, {
    label: "404",
    location: "*",
    element: Page404,
    show: false,
    editable: false
}];

const admin_routes = [{
    label: "לוח בקרה",
    location: "/control_panel",
    element: ControlPanel
}, {
    label: "השכרת ציוד",
    location: "/control_panel/rent",
    element: RentalControlPanel,
    sub_nav: [{
        label: "השכרת ציוד",
        location: "/control_panel/rent",
        element: RentalControlPanel
    }, {
        label: "כלים השכרה",
        location: "/control_panel/rent/tools",
        element: ToolsPage,
        props: { 
            product_type: Constants.API_PRODUCT_TYPE.RENT 
        }
    }, {
        label: "לקוחות השכרה",
        location: "/control_panel/rent/customers",
        element: CustomersPage,
    }, {
        label: "תיקונים",
        location: "/control_panel/rent/service",
        element: ServicePage,
    }, {
        label: "הפקת דוחות",
        location: "/control_panel/rent/reports",
        element: CreateReportsPage,
    }]
}, {
    label: "מכירת ציוד",
    location: "/control_panel/sale",
    element: ToolsPage,
    props: { 
        product_type: Constants.API_PRODUCT_TYPE.SALE 
    }
}, {
    label: "בלוג",
    location: "/control_panel/blogs",
    element: BlogEditorPage
}, {
    label: "פרוייקטים",
    location: "/control_panel/projects",
    element: ProjectsEditorPage
}, {
    label: "התנתק",
    location: "/logout",
    element: Login,
    props: {
        logout: true
    }
}];

const AppRoutes = {
    routes,
    admin_routes
};

export default AppRoutes;