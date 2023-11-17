
import Page404 from "./pages/404";
import AirHammers from "./pages/AirHammers";
import Blog from "./pages/Blog";
import BlogsPage from "./pages/BlogsPage";
import CableCutting from "./pages/CableCuting";
import CategoryPage from "./pages/CategoryPage";
import Contact from "./pages/ContactPage/Contact";
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

const AppRoutes = {
    routes
};

export default AppRoutes;