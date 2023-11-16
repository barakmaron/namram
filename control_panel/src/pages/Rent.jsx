import React from 'react';
import { Link } from 'react-router-dom';

const Rent = () => {
  return (<>
  <div className='flex justify-center items-center bg-rent bg-fixed bg-cover py-16 shadow-inner bg-center'>
    <h2 className='text-8xl text-white font-bold sm:pt-60 sm:pb-24 w-fit mx-auto text-center'>השכרת ציוד לבנייה</h2>
  </div>
  <div className='py-10 mx-auto flex flex-col items-center' dir='rtl'>
    <p className='w-3/4 text-center text-2xl'>
      חברת נמרם השכרת ציוד בע"מ עוסקת בהשכרת מגוון רחב של ציוד לבניין, בשרות החברה נמצאים ציודים לכל מטרה ברמת אחזקה גבוה וזמינות תמידית.
      אנו בחברה מאמינים כי יש צורך להתקדמות תמידית כך שהציודינו תמיד מתחדש כדי שנוכל להספק ללקוח את המוצר הטוב ביותר לעבודה.
      היי, עם נתקלתם בבעיה מכל סוג בתחום ולא יודעים האם יש ציוד שיוכל לפתור אותה, אנו נשמח להעניק לכם פתרונות יצרתים באדיבות וסבלנות ניתן  
      <Link 
      className='text-green-600 font-bold'
      to="/contact"> ליצור איתנו קשר </Link> 
       ומיד נעמוד לרשותכם.
    </p>
  </div>
  </>);
};

export default Rent;