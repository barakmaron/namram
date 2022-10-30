import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';

const Projects = () => {
    const navigate = useNavigate();
  return (<>
    <div className='flex justify-center bg-project bg-fixed bg-cover py-16 shadow-inner bg-center'>
        <h2 className='text-8xl text-white font-bold pt-60 pb-24 '>פרוייקטים</h2>
    </div>
    <div className='py-10 mx-auto flex flex-col items-center' dir='rtl'>
        
    </div>
    <div className='flex flex-col gap-10 justify-center bg-project-2 bg-fixed bg-cover py-16 shadow-inner bg-center items-center'>
        <h2 className='text-8xl text-white font-bold pt-60 pb-24 text-center' dir='rtl'>
            צריכים הצעה או ייעוץ לניסור בטון?
        </h2>
        <Button text={"צור קשר עכשיו"} action={() => navigate("/contact")} />
    </div>
  </>);
};

export default Projects;