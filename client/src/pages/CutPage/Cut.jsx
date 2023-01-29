import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import List from '../../components/List/List';
import VideoModal from '../../components/VideoModal/VideoModal';
import Constants from '../../Constants';

const Cut = () => {
    const navigate = useNavigate();
  return (<>
    <div className='flex justify-center bg-cut bg-fixed bg-cover py-16 shadow-inner bg-center'>
        <h2 className='sm:text-8xl text-4xl text-white font-bold sm:pt-60 sm:pb-24 w-fit mx-auto text-center'>ניסור בטון</h2>
    </div>
    <div className='py-10 mx-auto flex flex-col items-center' dir='rtl'>
        <p className='w-3/4 text-center sm:text-3xl text-xl text-slate-700'>
            <span className='font-bold'>חברת נמרם מהחברות הותיקות ביותר בתחום עם וותק של יותר מ35 שנה! </span>
            עם השנים הפכה החברה למובילה בארץ לאחר שנים רבות של עבודה ועשייה בתחום נצבר בחברתינו ידע מרשים ועצום כמו גם ציודים מיוחדים שהותאמו במיוחד עבורינו מה שהופך את חברתינו למוקד עלייה לרגל בכל הקשור לעבודות מורכבות ומסובכות. מקים החברה והמהנדס הראשי שלה
            <span className='font-bold'> מר יהודה מרון זכה לתואר רב קבלן </span>
            לשנת 2012 מהתחדות הקבלים כהוקרת תודה על שנים רבות של עשייה וחדשנות בתחום. חברת נמרם תשמח לעמיד לרשותיכם את 
            <span  className='font-bold'> הצוותים המקצועים שלנו בשילוב ציוד מהמתקדם ביותר בעולם. </span>
            אנו מזמנים אותכם לעניין באתרינו, להתרשם ממאות 
            <Link
            className='text-green-600 font-bold'
            to="/projects"> פרוייקטים </Link>
            שכבר מאחורינו וסל השירותים של החברה.
        </p>
    </div>
    <div className='flex flex-col gap-10 justify-center bg-cut-2 bg-fixed bg-cover py-16 shadow-inner bg-center items-center'>
        <h2 className='sm:text-8xl text-4xl text-white font-bold sm:pt-60 sm:pb-24 w-fit mx-auto text-center' dir='rtl'>
            צריכים הצעה או ייעוץ לניסור בטון?
        </h2>
        <Button text={"צור קשר עכשיו"} action={() => navigate("/Contact")} />
    </div>
    <div className='py-10 w-screen xl:w-3/4 mx-auto flex flex-col gap-5' dir='rtl'>
        <div className='mx-auto flex lg:flex-row flex-col gap-5'>
            <List 
            title={Constants.lists.cut.title} 
            list={Constants.lists.cut.list} />
            <List 
            title={Constants.lists.namram.title} 
            list={Constants.lists.namram.list} />
        </div>
        <div className='w-fit mx-auto'>
            <VideoModal 
            title={"ניסור מגופת עשן מבטון"} 
            className="bg-cut-video-image"
            video={`DiskSawing.mp4`} />
        </div>
    </div>
    <div className='flex flex-col gap-10 justify-center bg-cut-3 bg-fixed bg-cover py-16 shadow-inner bg-center items-center'>
        <h2 className='sm:text-8xl text-4xl text-white font-bold sm:pt-60 sm:pb-24 w-fit mx-auto text-center' dir='rtl'>
            מחפשים דיסק יהלום לניסור בטון?
        </h2>
    </div>
  </>);
};

export default Cut;