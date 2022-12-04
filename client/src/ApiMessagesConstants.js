
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
    }
};

export default ApiMessagesConstants;