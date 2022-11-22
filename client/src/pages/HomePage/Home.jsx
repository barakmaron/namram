import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

  return (<>
  <div className='flex justify-center bg-home bg-fixed bg-cover py-16 shadow-inner bg-center'>    
    <div className='text-center my-5 w-full lg:w-1/3 bg-white shadow-lg rounded-l-2xl relative transition-all group cursor-pointer '
    onClick={() => navigate(`/rent`)}>
        <h2 className='text-4xl bg-amber-500 py-2 text-white font-bold rounded-tl-2xl transition-all group-hover:text-amber-600 group-hover:bg-white'>
            נמרם השכרת ציוד בע"מ    
        </h2>
        <h3 className='text-3xl bg-green-600 text-white font-bold py-2 transition-all group-hover:text-green-600 group-hover:bg-white'>
            השכרת ציוד מכני לבניין
        </h3>
        <p className='text-2xl py-4 px-10' dir="rtl">
            חברת נמרם השכרת ציוד בע"מ עוסקת בהשכרת מגוון רחב של ציוד לבניין, בשרות החברה נמצאים ציודים לכל מטרה ברמת אחזקה גבוה וזמינות תמידית.
            אנו בחברה מאמינים כי יש צורך להתקדמות תמידית כך שהציודינו תמיד מתחדש כדי שנוכל להספק ללקוח את המוצר הטוב ביותר לעבודה.
        </p>
    </div>
    <div className='text-center my-5 w-full lg:w-1/3 bg-white shadow-lg rounded-r-2xl relative transition-all group cursor-pointer'
    onClick={() => navigate(`/cut`)}>
        <h2 className='text-4xl bg-amber-500 py-2 text-white font-bold rounded-tr-2xl transition-all group-hover:text-amber-600 group-hover:bg-white'>
            נמרם ביצוע בע"מ
        </h2>
        <h3 className='text-3xl bg-green-600 text-white font-bold py-2 transition-all group-hover:text-green-600 group-hover:bg-white'>
            ניסור וקידוח בבטון
        </h3>
        <p className='text-2xl py-4 px-10 ' dir="rtl">
            חברת נמרם מתמחה בביצוע עבודות ניסור וקידוח בבטון, מהחברות הראשונות בתחום. וותק של יותר מ35 שנה.
            בין שורות החברה נמצאים צווים מקצועים, אמינים ואדיבים, כל צוותי החברה בעלי תעודות הכשרת בטיחות ומחוייבות לסטנדרט הגבווה ביותר בשווק.
            לפני כל ביצוע עבודה מהנדס החברה בונה תוכנית עבודה מסודרת הכוללת שמירה על בטיחות הצווים, מהירות, איכות וכמובן דרישות הלקוח.
            החברת נמצאת בפריסה ארצית ונותנת שירות מהצפון ועד הדרום.
        </p>
    </div>    
  </div>
  <div className='py-10 mx-auto flex flex-col items-center' dir='rtl'>
    <h2 className='text-4xl font-bold text-green-600'>מכירת ציוד לבניין</h2>
    <p className='text-2xl w-full sm:w-2/4 text-center'>
        בין שירותי חברת נמרם אנו עוסקים ביבוא ושיווק ציוד וכלים לבנייה, נמרם דוגלת במכירת ציוד מתקדם ואיכותי, בין מדפי החברה תוכלו למצוא מוצרים מהחברות המובליות בתחום כמו גם את המותג הפרטי שלנו.
        בנוסף אנו נותנים שירות לכל מוצר היוצא מסף דלתינו.
    </p>
  </div>
  </>);
}

export default Home;