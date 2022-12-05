import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { BsPlayFill } from 'react-icons/bs';

const VideoModal = ({
    title,
    className,
    video
}) => {

    const [close, setClose] = useState(false);

  return (<>
    <div 
    onClick={() => setClose(true)}
    className={`${className} rounded-full shadow-2xl border-4 border-solid border-white sm:w-[375px] w-[275px] h-[275px] sm:min-h-[375px] bg-bottom bg-cover cursor-pointer relative group flex justify-center items-center transition-all`}>
        <h2 
        className='bg-slate-700 text-green-600 py-2 px-5 text-center sm:text-3xl text-2xl font-bold rounded-b-2xl absolute bottom-0 border-transparent border-b-8 border-solid group-hover:border-green-600'>
            {title}
        </h2>
        <span className='text-amber-500 text-8xl border-8 border-amber-500 rounded-sm group-hover:border-green-600 group-hover:text-green-600'>
            <BsPlayFill></BsPlayFill>
        </span>
    </div>
    { close && <Modal 
    className="w-full "
    setClose={() => setClose(false)} >
        <h2 
        className='text-slate-700 py-2 px-5 text-center text-4xl font-bold'>
            {title}
        </h2>
        <video controls>
            <source src={`/video/${video}`} />
        </video>
    </Modal>}
  </>);
}

export default VideoModal;