import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import List from '../../components/List/List';
import VideoModal from '../../components/VideoModal/VideoModal';
import Constants from '../../Constants';

const Drill = () => {
    const navigate = useNavigate();
  return (<>
    <div className='flex justify-center bg-drill bg-fixed bg-cover py-16 shadow-inner bg-center'>
        <h2 className='sm:text-8xl text-4xl text-white font-bold sm:pt-60 sm:pb-24 w-fit mx-auto text-center'>קידוח בטון</h2>
    </div>
    <div className='py-10 px-2 mx-auto flex flex-col items-center' dir='rtl'>
        <p className='sm:w-3/4 text-center sm:text-3xl text-xl text-slate-700'>
        חברת נמרם מתמחה בקידוח בטון, לאחר שנים של עשייה בתחום 
        <span className='font-bold'> ביצענו אלפי קידוחים ללקוחתינו בכל גודל אפשרי. </span><br></br>
         עם השנים הבנו כי הציוד שנמצא בארץ אותם מיבאים המתחרים שלנו לא מספקים את דרשתינו כך 
        <span className='font-bold'> שנמרם הפכה ליבואנית רשמית של מגוון רחב של מקדחות כולם ביבוא רשמי ובלעדי מהחברות הטובות ביותר בעולם. </span><br></br>
        כמו כן אנו מיבאים כוסות קידוח בכל הגדלים מצול ועד 16 צול (ניתן לקבל יותר גודלים בהזמנה מראש) לכל אורך נדרש, כוסות אנו נבחרו בקפידה לאחר שימוש נרחב של צוותי הקידוח שלנו בכדי להגיע לכוס האדאלית.<br></br>
        <span className='font-bold'> אנו בחברת נמרם מבצעים קידוחים בבטון בכל גודל מצול ועד 4.6 מטר לכל עובי נדרש. </span>
        כל צוותי החברה מצויידים במגוון רחב של כוסות קידוח כמו גם מגוון רחב של מקדחות בכדי לבצע כל דרישה של הלקוח.<br></br>
        אנו מזמנים אותכם לעניין באתרינו, להתרשם ממאות 
        <Link
        className='text-green-600 font-bold'
        to="/projects"> פרוייקטים </Link>
         שכבר מאחורינו וסל השירותים של החברה.
        </p>
    </div>
    <div className='flex flex-col gap-10 justify-center bg-drill-2 bg-fixed bg-cover py-16 shadow-inner bg-center items-center'>
        <h2 className='sm:text-8xl text-3xl text-white font-bold sm:pt-60 sm:pb-24 w-fit mx-auto text-center' dir='rtl'>
            צריכים הצעה או ייעוץ לניסור בטון?
        </h2>
        <Button text={"צור קשר עכשיו"} action={() => navigate("/contact")} />
    </div>
    <div className='py-10 lg:w-3/4 mx-auto flex flex-col gap-5' dir='rtl'>
        <div className='mx-auto flex xl:flex-row flex-col gap-5'>
            <List 
            title={Constants.lists.drill.title} 
            list={Constants.lists.drill.list} />
            <List 
            title={Constants.lists.namram.title} 
            list={Constants.lists.namram.list} />
        </div>
        <div className='w-fit mx-auto'>
            <VideoModal 
            title={"קידוח בטון לעומק 15 מטר"} 
            className="bg-drill-video-image"
            video={`DrillingTo15Metaers.mp4`} />
        </div>
    </div>
    <div className='flex flex-col gap-10 justify-center bg-drill-3 bg-fixed bg-cover py-16 shadow-inner bg-center items-center'>
        <h2 className='sm:text-8xl text-3xl text-white font-bold sm:pt-60 sm:pb-24 w-fit mx-auto text-center' dir='rtl'>
            מחפשים כוסות יהלום לקידוח בטון או מקדחות לקידוח בטון?
        </h2>
    </div>
  </>);
};

export default Drill;