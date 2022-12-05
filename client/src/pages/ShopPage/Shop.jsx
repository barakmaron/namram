import React from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {
  return (<>
    <div className='flex justify-center bg-shop bg-fixed bg-cover py-16 shadow-inner bg-center'>
        <h2 className='text-8xl text-amber-500 font-bold sm:pt-60 sm:pb-24 w-fit mx-auto text-center'>מכירת ציוד וכלים</h2>
    </div>
    <div className='py-10 mx-auto flex flex-col items-center' dir='rtl'>
        <p className='w-3/4 text-center text-2xl'>
            בין שירותי חברת נמרם אנו מיבים ומשווקים ציוד וכלים לבנייה, נמרם דוגלת במכירת ציוד מתקדם ואיכותי, בין מדפי החברה תוכלו למצוא מוצרים מהחברות המובליות בתחום כמו גם את המותג הפרטי שלנו.
            בנוסף אנו נותנים שירות לכל מוצר היוצא מסף דלתינו.
            <Link 
            className='text-green-600 font-bold'
            to="/contact"> הורדת קטלוג מכירת ציוד &gt;&gt;  </Link> 
        </p>
    </div>
  </>);
};

export default Shop;