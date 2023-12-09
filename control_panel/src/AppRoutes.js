
import Constants from "./Constants";
import BlogEditorPage from "./pages/BlogEditorPage";
import ControlPanel from "./pages/ControlPanel";
import CreateReportsPage from "./pages/CreateReportsPage/CreateReportsPage";
import CustomersPage from "./pages/CustomersPage/CustomersPage";
import Login from "./pages/LoginPage/Login";
import ProjectsEditorPage from "./pages/ProjectsEditorPage";
import RentalControlPanel from "./pages/RentalPage/RentalControlPanel";
import ServicePage from "./pages/ServicePage/ServicePage";
import ToolsPage from "./pages/ToolsPage";

export const loginRoute = {
    label: "התחבר",
    location: "/login_control_panel",
    element: Login,
    editable: false,
    show: false
};

const routes = [{
    label: "דף הבית",
    location: "/",
    editable: true,
    show: true,
}, {
    label: "השכרת ציוד",
    location: "/RentPage",
    editable: false,
    show: true
}, {
    label: "מכירת ציוד",
    location: "/SalePage",
    editable: false,
    show: true
}, {
    label: "ניסור וקידוח בבטון",
    location: "/Cut",
    editable: true,
    show: true,
    sub_nav: [{
        label: "ניסור בטון",
        location: "/Cut",
        editable: true,
        show: true
    }, {
        label: "קידוח בטון",
        location: "/Drill",
        editable: true,
        show: true
    }, {
        label: "פרוייקטים",
        location: "/Projects",
        editable: false,
        show: true,
        child: [{
            location: '/Project/:id'
        }]
    }]
}, {
    label: "פטישי חציבה אוויר",
    location: "/Air_hammers",
    editable: true,
    show: true
}, {
    label: "כבל יהלום לניסור",
    location: "/Wire_saw",
    editable: true,
    show: true
}, {
    label: "סניף אילת",
    location: "/Eilat",
    editable: true,
    show: true
}, {
    label: "מאמרים",
    location: "/Blogs",
    editable: false,
    show: true,
    child: [{
        location: '/Blog/:id'
    }]
}, {
    label: "צור קשר",
    location: "/Contact",
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
    editable: true,
    show: false,
    child: [{
        location: '/category/:id',
        show_dynamic: true
    }, {
        location: '/category/:category_id/product/:product_id',
    }]
}, {
    label: "404",
    location: "*",
    show: false,
    editable: false
}];

const adminRoutes = [{
    label: "לוח בקרה",
    location: "/login_control_panel",
    element: ControlPanel
}, {
    label: "השכרת ציוד",
    location: "/login_control_panel/control_panel/rent",
    element: RentalControlPanel,
}, {
    label: "מכירת ציוד",
    location: "/login_control_panel/control_panel/sale",
    element: ToolsPage,
    props: {
        product_type: Constants.API_PRODUCT_TYPE.SALE
    }
}, {
    label: "כלים השכרה",
    location: "/login_control_panel/control_panel/rent/tools",
    element: ToolsPage,
    props: {
        product_type: Constants.API_PRODUCT_TYPE.RENT
    }
}, {
    label: "לקוחות השכרה",
    location: "/login_control_panel/control_panel/rent/customers",
    element: CustomersPage,
}, {
    label: "תיקונים",
    location: "/login_control_panel/control_panel/rent/service",
    element: ServicePage,
}, {
    label: "הפקת דוחות",
    location: "/login_control_panel/control_panel/rent/reports",
    element: CreateReportsPage,

}, {
    label: "בלוג",
    location: "/login_control_panel/control_panel/blogs",
    element: BlogEditorPage
}, {
    label: "פרוייקטים",
    location: "/login_control_panel/control_panel/projects",
    element: ProjectsEditorPage
}, {
    label: "התנתק",
    location: "/login_control_panel/logout",
    element: Login,
    props: {
        logout: true
    }
}];

const AppRoutes = {
    routes,
    loginRoute,
    adminRoutes
};

export default AppRoutes;