import React from 'react';
import List from '../../components/List/List';
import Map from '../../components/Map/Map';
import Constants from '../../Constants';

const Eilat = () => {
  return (<>
    <div className='flex justify-center py-2 bg-amber-500 shadow-inner bg-center'>
        <h2 className='text-4xl text-slate-700 font-bold'>סניף אילת</h2>
    </div>
    <div className='py-10 mx-auto flex flex-col items-center' dir='rtl'>
        <h3 className=' text-slate-700 text-3xl font-bold'>ממוקם באזור התעשייה בכניסה לאילת ברחוב המלאכה 3.</h3>
       
        <div className='py-10 w-3/4 mx-auto flex flex-col gap-5' dir='rtl'>
            <div className='mx-auto flex sm:flex-row flex-col gap-5'>
                <List 
                title={Constants.lists.eilat.title} 
                list={Constants.lists.eilat.list} />
            </div>        
        </div>
    </div>
    <Map location={Constants.maps.eilat}/>
  </>);
};

export default Eilat;