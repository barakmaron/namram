
const API_METHODS = {
    POST: "post",
    GET: "get",
    PUT: "put",
    PATCH: "patch",
    DELETE: "delete"
};

const API_PRODUCT_TYPE = {
    SALE: "sale",
    RENT: "rent"
};

const PRODUCT_TYPE = {
    SaleProducts: "SaleProducts",
    RentProducts: "RentProducts",
    Sale: "SaleProducts",
    Rental: "RentProducts"
};

const CATEGORY_TYPE = {
    Sale: 'SalePage',
    Rental: 'RentPage'
};

const DateFormat = "DD/MM/YYYY";

const DisplayType = {
    products: "PRODUCTS", 
    category: "CATEGORIES"
};
  
const html_remove_regex = /(<([^>]+)>)/gi;

const contact_nav = {
    phone: "08-8560399",
    facebook: "https://www.facebook.com/people/%D7%A0%D7%9E%D7%A8%D7%9D-%D7%94%D7%A9%D7%9B%D7%A8%D7%AA-%D7%A6%D7%99%D7%95%D7%93/100016789871066",
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

const lists = {
    cut: {
        title: "יתרונות ניסור בטון בדיסק יהלום",
        list: [
            "ניסור בדיסק יהלום מאפשר דיוק חסר תקדים בוא ניתן לקבל פסי ניסור ישרים ונקיים בידים מנוסות.",
            "ניסור בדיסק יהלום היא שיטה יחסית מהירה לניסור בטון (ניסור בכבל יהלום מהיר יותר).",
            "ניסור בדיסק יהלום אינו גורם לויברציות בבטון כך שאין צורך לדאוג לגבי נזק משני כמו סדקים למבנה.",
            "ניסור בדיסק יהלום בקירור מים אינו יוצר ענני אבק.",
            "ניסור בדיסק יהלום היא שיטה בטוחה מאוד, כל מכונות הניסור שלנו עם שלט רחוק בכדי לשמור על בטיחות המפעיל והסביבה."
        ]
    },
    drill: {
        title: "קידוח בטון בכוסות יהלום",
        list: [
            "קידוח בטון בכוסות יהלום מאפשר לנו ליצור פתחים עגולים נקיים ומסודרים בדיוק יוצא מין הכלל.",
            "קידוח בטון בכוסות יהלום אינם יוצרים מפגעי אבק או נזקים למבנה (בניגוד לחציבה).",
            "ניסור בדיסק יהלום אינו גורם לויברציות בבטון כך שאין צורך לדאוג לגבי נזק משני כמו סדקים למבנה.",
            "ניתן לקדוח בבטון לכל עובי נידרש עם ציוד נכון וצוות מנוסה.",
            "קידוח בטון בכוסות יהלום היא הינה השיטה הזולה ביותר כמו גם הנקייה ביותר ליצירת פתחים עגולים בבטון."
        ]
    },
    cable: {
        title: "יתרונות לשימוש בכבל יהלום לניסור בטון",
        list: [
            "ניסור בכבל יהלום מאפשר ניסור ללא מגבלות של עובי בדיוק רב.",
            "ניסור בכבל יהלום נותן לנו ניסור ללא חריגות כלל, כמובן בתנאי שהמכשור הנכון נמצא בידים מנוסות.",
            "בשונה מניסור בטון בדיסק יהלום בו מפגע הרעש הוא אדיר, כמו גם נטז המים שנוצר מסיבוב בדיסק. בכבל יהלום הניסור הוא שקט בהרבה וגורם לפחות לכלוך."
        ]
    },
    eilat: {
        title: "בסניף מגוון שירותים",
        list: [
            "השכרת ציוד וכלים לבניין.",
            "מכירה של כלי עבודה, חלקי חילוף וציוד ייעודי לבניין.",
            "תיקון של כלי עבודה וציוד מכאני.",
            "ייצור ולחיצת צינורות הידראוליים.",
            "תיקון ויצור בוכנות לכלי צמ'ה.(החלפת מנג'טים)."
        ]
    },
    namram: {
        title: "חברת נמרם",
        list: [
            "חברת נמרם מחזיקה בציוד המתקדם ביותר בשוק כך שאין בטון העומד לפנינו.",
            "כל הצוותים של החברה בעלי תעודות הכשרת בטיחות.",
            "כל צוותי החברה מואבזרים בכל הציוד הנדרש לביצוע העבודה.",
            "חברת נמרם מיבאת מכונות לניסור בטון כמו גם דיסקי יהלום לניסור בטון.",
            "שירות אדיב מקצועי ועניני."
        ]
    }
};

const maps = {
    ashdod: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3389.793685021669!2d34.67930828445996!3d31.83061108126808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502bce8c97c0863%3A0x63b3a097fc3ce025!2z16DXnteo150g15TXqdeb16jXqiDXpteZ15XXkyDXkdeiIteeINeg15nXodeV16gg15HXmNeV158g16fXmdeT15XXlyDXkdeY15XXnyDXkdeZ15TXnNeV150g16fXkdec158g15TXqNeZ16HXlA!5e0!3m2!1siw!2sil!4v1667131948310!5m2!1siw!2sil",
    eilat: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d216.89833395611618!2d34.959266949398284!3d29.563738702595106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15006f84bd8ec259%3A0x3112f3dc38309150!2z16DXnteo150g15HXmdem15XXoiDXkdeiIteeINeU16nXm9eo16og16bXmdeV15Mg15XXm9ec15nXnSDXnNeR16DXmdeZ15Q!5e0!3m2!1siw!2sil!4v1667132620931!5m2!1siw!2sil"
};

const Constants = {
    contact_nav,
    contact_info,
    lists,
    API_METHODS,
    API_PRODUCT_TYPE,
    PRODUCT_TYPE,
    maps,
    DateFormat,
    DisplayType,
    CATEGORY_TYPE,
    html_remove_regex
};

export default Constants;