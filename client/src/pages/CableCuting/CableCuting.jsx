import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import List from '../../components/List/List';
import VideoModal from '../../components/VideoModal/VideoModal';
import Constants from '../../Constants';

const CableCutting = () => {
    const navigate = useNavigate();
  return (<>
    <div className='flex justify-center bg-cable bg-fixed bg-cover py-16 shadow-inner bg-center'>
        <h2 className='sm:text-8xl text-4xl text-white font-bold sm:pt-60 sm:pb-24 w-fit mx-auto text-center'>ניסור בטון בכבל יהלום</h2>
    </div>
    <div className='py-10 mx-auto flex flex-col items-center' dir='rtl'>
        <h3 className='text-green-600 sm:text-5xl text-3xl text-center font-bold py-4'>החברה המובילה לניסור בטון בכבל יהלום</h3>
        <p className='sm:w-3/4 w-full text-center sm:text-3xl text-xl text-slate-700'>
            לכבל יהלום יתרונות נכרים ביישום נכון, בגלל היותו רציף ונתון לשינוי אורכו ניתן בעזרתו לנסר ללא מגבלות של עובי בשונה מדיסק לניסור בטון, אנו בחברת נמרם ידועים בתחום כהחברה המובילה בניסור בכבל יהלום.<br></br>
            בודדות החברות בישראל המחזיקות ביכולות ניסור בכבל יהלום 
            <span className='font-bold'> חברת נמרם מחזיקה בלא פחות משלוש מכונות לניסור בטון בכבל יהלום! </span>
            כאשר אחת מהם היא הגדולה ביותר בישראל עם 
            <span className='font-bold'> יכולת לניסור בטון עד עובי של 50 מטר בטון, </span>
             בנוסף לכך נמרם מחזיקה במכונה יחדיה מסוגה בישראל בעלת 
            <span className='font-bold'> יכולת לנסר פתחים עגולים בכבל יהלום לקוטר של עד 4.6 מטר לעובי 1.6 מטר. </span><br></br>
            עם לא דיי בכך 
            <span className='font-bold'> נמרם היא יבואנית של כבל יהלום לניסור בטון </span>
             זאת בשילוב מכשור נכון, צוותים מיומנים, יכולות חשיבה מחוץ לקופסא של צוות המהנדסים לא מותרים מקום לספק וממקמים את נמרם כהחברה המובילה בתחום בישראל בעלת היכולת לתת את המחירים התחרותיים ביותר עבור כל פרוייקט.
        </p>
        <div className='w-fit mx-auto'>
            <VideoModal 
            title={"ניסור צינור בטון בכבל יהלום"} 
            className="bg-cable-video-image"
            video={`CableSawingHolon.mp4`} />
        </div>
    </div>
    <div className='flex flex-col gap-10 justify-center bg-cable-2 bg-fixed bg-cover py-16 shadow-inner bg-center items-center'>
        <h2 className='sm:text-8xl text-4xl text-white font-bold sm:pt-60 sm:pb-24 w-fit mx-auto text-center' dir='rtl'>
            צריכים הצעה או ייעוץ לניסור בטון?
        </h2>
        <Button text={"צור קשר עכשיו"} action={() => navigate("/contact")} />
    </div>
    <div className='py-10 w-3/4 mx-auto flex flex-col gap-5' dir='rtl'>
        <div className='mx-auto flex sm:flex-row flex-col gap-5'>
            <List 
            title={Constants.lists.cable.title} 
            list={Constants.lists.cable.list} />
            <List 
            title={Constants.lists.namram.title} 
            list={Constants.lists.namram.list} />
        </div>        
    </div>
    <div className='flex flex-col gap-10 justify-center bg-cable-3 bg-fixed bg-cover py-16 shadow-inner bg-center items-center'>
        <h2 className='sm:text-8xl text-4xl text-white font-bold sm:pt-60 sm:pb-24 w-fit mx-auto text-center' dir='rtl'>
            מחפשים כבל יהלום לניסור בטון?
        </h2>
    </div>
  </>);
};

export default CableCutting;