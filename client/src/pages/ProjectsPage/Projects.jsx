import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Image from '../../components/DataEditors/ImageEditor/Image';
import hexStyle from '../../hexagons.module.css';

const Projects = ({
  projects,
  GetProjectsAction
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    GetProjectsAction();
  }, [GetProjectsAction]);

  return (<>
    <div className='flex justify-center bg-project bg-fixed bg-cover py-16 shadow-inner bg-center'>
        <h2 className='text-8xl text-white font-bold pt-60 pb-24 '>פרוייקטים</h2>
    </div>
    <ul className={hexStyle.hexGrid} dir='rtl'>
      {projects?.map(project => {
        return <li
        key={`project-${project.id}`}
        className={hexStyle.hex}>
          <div
          className={hexStyle.hexIn}>
            <Link className={hexStyle.hexLink}>
              <h3 
              className='text-white'
              >{project.Title}</h3>
              <div className='w-12 h-1 my-2 border-b-[1px] border-white border-solid'></div>
              <Image
              no_style={true}
              alt={project.Title}
              image={project.ProjectsImages[0]} />
              <p></p>
            </Link>
          </div>          
        </li>;
      })}
    </ul>
    <div className='flex flex-col gap-10 justify-center bg-project-2 bg-fixed bg-cover py-16 shadow-inner bg-center items-center'>
        <h2 className='text-8xl text-white font-bold pt-60 pb-24 text-center' dir='rtl'>
            צריכים הצעה או ייעוץ לניסור בטון?
        </h2>
        <Button text={"צור קשר עכשיו"} action={() => navigate("/contact")} />
    </div>
  </>);
};

export default Projects;