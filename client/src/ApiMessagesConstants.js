
const ApiMessagesConstants = {
    server_error: "אנו מתנצלים אך לא הצלחנו לבצע את הפועולה אחרונה אנא נסה שוב מאוחר יותר",
    contact: {
        successful: "טופס צור קשר נשלח בהצלחה",
        failed: "לא הצלחנו לשלוח טופס צור קשר"
    },
    blogs: {
        getBlogs: {
            failed: "אנו מתנצלים לא הצלחנו לקבל את המאמרים אנא נסה שוב מאוחר יותר"
        },
        addBlog: {
            successful: "הבלוג נוסף בהצלחה",
            failed: "לא הצלחנו להוסיף את הבלוג אנא בדוק את הטופס הוספה"
        },
        deleteBlog: {
            successful: "הבלוג נמחק בהצלחה",
            failed: "לא הצלחנו למחוק את הבלוג אנא בדוק את הטופס הוספה"
        },
        patchBlog: {
            successful: "הבלוג נערך בהצלחה",
            failed: "לא הצלחנו לערוך את הבלוג אנא בדוק את הטופס הוספה"
        }
    },
    customers: {
        getCustomers: {
            failed: "לא הצלחנו לקבל את הלקוחות אנא נסה שוב מאוחר יותר"
        },
        patchCustomer: {
            successful: "עדכון הלקוח הושלם",
            failed: "לא הצלחנו לעדכן את פרטי הלקוח נסה שוב מאוחר יותר"
        },
        deleteCustomer: {
            successful: "הלקוח נמחק בהצלחה",
            failed: "לא הצלחנו למחוק את הלקוח אנא נסה שוב"
        }
    },
    static_page: {
        getPages: {  
            failed: "לא היה ניתן לטעון את נתוני הדף"
        },
        addPage: {            
            successful: "מידע עבור הדף נוסף למערכת",
            failed: "לא היה ניתן להוסיף את מידע עבור הדך נסה שוב מאוחר יותר"
        },
        getPage: {   
            failed: "לא היה ניתן לטעון את נתוני הדף"
        },
        deletePage: {            
            successful: "המידע עבור הדף נמחק הצלחה",
            failed: "לא היה ניתן למחוק את המידע עבור הדף נסה שוב מאוחר יותר"
        }
    },
    login: {
        successful: "התחברת בהצלחה",
        failed: "לא היה ניתן לאמת את פרטי התחברות שלך נסה שוב"
    },
    logout: {
        successful: "התנתקת בהצלחה",
        failed: "לא היה ניתן להתנתק נסה שוב מאוחר יותר"
    },
    categories: {
        getCategory: {
            failed: "לא ניתן לטעון את נתוני המוצרים"
        },
        addCategory: {
            successful: "קטגוריה נוספה בהצלחה",
            failed: "לא ניתן להוסיך קטגוריה"
        },
        deleteCategory: {
            successful: "קטגוריה נמחקה בהצלחה",
            failed: "לא ניתן למחוק קטגוריה"
        },
        editCategory: {
            successful: "קטגוריה נערכה בהצלחה",
            failed: "לא ניתן לערוך קטגוריה"
        }
    },
    product: {
        addProduct: {
            successful: "מוצר נוסף בהצלחה",
            failed: "המוצר לא נוסף"
        },
        deleteProduct: {
            successful: "מוצר נמחק בהצלחה",
            failed: "לא היה ניתן למחוק מוצר"
        },
        editProduct: {
            successful: "מוצר נערך בהצלחה",
            failed: "לא ניתן לערוך מוצר"
        },
        images: {
            addImage: {
                successful: "התמונות נוספו בהצלחה",
                failed: "לא ניתן להוסיף את התמונות"
            },
            deleteImage: {
                successful: "התמונה נמחקה בהצלחה",
                failed: "לא ניתן למחוק את תמונה"
            }
        },
        props: {
            addProp: {
                successful: "תכונה נוספה בהצלחה",
                failed: "לא ניתן להוסיף תכונה"
            },
            deleteProp: {
                successful: "תכונה נמחקה בהצלחה",
                failed: "לא ניתן למחוק תכונה"
            },
            patchProp: {
                successful: "תכונה נערכה בהצלחה",
                failed: "לא ניתן לערוך תכונה"
            }
        },
        diagram: {
            addDiagram: {
                successful: "דיאגרמה נוספה בהצלחה",
                failed: "לא ניתן להוסיף דיאגרמה"
            },
            deleteDiagram: {
                successful: "דיאגרמה נמחקה בהצלחה",
                failed: "לא ניתן למחוק דיאגרמה"
            },
            patchDiagram: {
                successful: "דיאגרה נערכה בהצלחה",
                failed: "לא ניתן לערוך דיאגרמה"
            }
        },
        sparePart: {
            addPart: {
                successful: "חלק חילוף נוסף בהצלחה",
                failed: "לא ניתן להוסיף חלק חילוף"
            },
            deletePart: {
                successful: "חלק חילוף נמחק בהצלחה",
                failed: "לא ניתן למחוק חלק חילוף"
            },
            patchPart: {
                successful: "דיאגרה נערך בהצלחה",
                failed: "לא ניתן לערוך חלק חילוף"
            }
        }
    },
    projects: {
        getProjects: {
            failed: "לא הצלחנו לקבל את הפרוייקטים נסה שוב מאוחר יותר"
        },
        addProject: {
            successful: "פרוייקט נוסף בהצלחה",
            failed: "לא ניתן להוסיף פרוייקט"
        },
        deleteProject: {
            successful: "פרוייקט נמחק בהצלחה",
            failed: "לא ניתן למחוק פרוייקט"
        },
        patchProject: {
            successful: "דיאגרה נערך בהצלחה",
            failed: "לא ניתן לערוך פרוייקט"
        },
        images: {
            addImage: {
                successful: "התמונות נוספו בהצלחה",
                failed: "לא ניתן להוסיף את התמונות"
            },
            deleteImage: {
                successful: "התמונה נמחקה בהצלחה",
                failed: "לא ניתן למחוק את תמונה"
            }
        },
    }
};

export default ApiMessagesConstants;