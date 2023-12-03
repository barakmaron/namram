import React from 'react';

const List = ({
  title,
  list
}) => {
  return (<div className='flex flex-col items-center'>
    <h3 className='sm:text-3xl text-xl py-2 px-4 bg-amber-500 text-white font-bold w-fit rounded-3xl'>{title}</h3>
    <ol className='sm:text-3xl text-xl counter_rest -z-10'>
      {list.map((item, index) => {
        return <li
          className='counter before:counter_before py-5 sm:pr-12 text-center flex flex-col md:flex-row items-center gap-2'
          key={`list-${title}-${index}`}>
          {item}
        </li>
      })}
    </ol>
  </div>);
};

export default List;