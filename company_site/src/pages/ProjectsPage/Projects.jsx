
import React, { useEffect } from 'react';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';

import { GetProjectsAction } from '../../redux/actions/ProjectsActions/ProjectsActions';
import { getProjects } from '../../redux/selectors/projectsSelector';

import Button from '../../components/Button';
import Image from '../../components/DataEditors/ImageEditor/Image';
import Constants from '../../Constants';
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
      <h2 className='sm:text-8xl text-4xl text-white font-bold sm:pt-60 sm:pb-24 w-fit mx-auto text-center'>פרוייקטים</h2>
    </div>
    <ul className={hexStyle.hexGrid} dir='rtl'>
      {projects?.map(project => {
        return <li
          key={`project-${project.id}`}
          className={hexStyle.hex}>
          <div
            className={hexStyle.hexIn}>
            <Link
              to={`/project/${project.id}`}
              className={hexStyle.hexLink}>
              <h3
                className='text-white'
              >{project.Title}</h3>
              <div className='w-12 h-1 my-2 border-b-[1px] border-white border-solid'></div>
              <Image
                no_style={true}
                alt={project.Title}
                image={project.ProjectsImages[0]} />
              <p>{moment(project.Date).format(Constants.DateFormat)}</p>
            </Link>
          </div>
        </li>;
      })}
    </ul>
    <div className='flex flex-col gap-10 justify-center bg-project-2 bg-fixed bg-cover py-16 shadow-inner bg-center items-center'>
      <h2 className='sm:text-8xl text-4xl text-white font-bold sm:pt-60 sm:pb-24 w-fit mx-auto text-center' dir='rtl'>
        צריכים הצעה או ייעוץ לניסור בטון?
      </h2>
      <Button text={"צור קשר עכשיו"} action={() => navigate("/Contact")} />
    </div>
  </>);
};


const mapStateToProps = (state, ownProps) => {
  const projects = getProjects(state);
  return {
    ...ownProps,
    projects
  };
};

const mapActionToProps = (dispatch) => {
  return bindActionCreators({
    GetProjectsAction
  }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(Projects);