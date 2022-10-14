
const routes = [{
    label: "דף הבית",
    location: "/"
}, {
    label: "השכרת ציוד",
    location: "/rent"
}, {
    label: "מכירת ציוד",
    location: "/shop"
}, {
    label: "ניסור וקידוח בבטון",
    location: "/cut",
    sub_nav: [{
        label: "ניסור בטון",
        location: "/cut"
    }, {
        label: "קידוח בטון",
        location: "/drill"
    }, {
        label: "פרוייקטים",
        location: "/projects"
    }, {
        label: "מאמרים",
        location: "/articles"
    }]
}, {
    label: "פטישי חציבה אוויר",
    location: "/ait_hammers"
}, {
    label: "כבל יהלום לניסור",
    location: "/wire_saw"
}, {
    label: "סניף אילת",
    location: "/eilat"
}, {
    label: "צור קשר",
    location: "/contact"
}];

const contact_nav = {
    phone: "08-8560399",
    facebook: "https://www.facebook.com/people/%D7%A0%D7%9E%D7%A8%D7%9D-%D7%94%D7%A9%D7%9B%D7%A8%D7%AA-%D7%A6%D7%99%D7%95%D7%93/100016789871066/",
    youtube: "https://www.youtube.com/channel/UC8pAUFsldDItHcaC6U0KhWg"
};

const contact_info = {
    mail: "rentit@namram.co.il",
    ashdod: {
        label: "סניף אשדוד",
        address: "האשלג 29, א.ת הצפונית, ת.ד 12806, אשדוד 7761300",
        phone: "08-8560399",
        fax: "08-8523896"
    },
    eilat: {
        label: "סניף אילת",
        address: "המלאכה 3, אזור התעשייה, ת.ד 912, אילת",
        phone: "08-6338881",
        fax: "08-6318733"
    }
};

const Constants = {
    routes,
    contact_nav,
    contact_info
};

export default Constants;