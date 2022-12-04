
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
    }
};

export default ApiMessagesConstants;