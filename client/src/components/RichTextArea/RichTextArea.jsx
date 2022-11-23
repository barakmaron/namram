import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CustomToolbar = ({
  id
}) => (
    <>
    { id && <div id={`toolbar_${id}`}>
      <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
        <option value="2" />
        <option value="3" />
        <option value="4" />
        <option selected />
      </select>
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className='ql-list' value="ordered" />
      <button className='ql-list' value="bullet" />
      <select className="ql-color">
        <option value="red" />
        <option value="green" />
        <option value="blue" />
        <option value="orange" />
        <option value="violet" />
        <option value="#d0d1d2" />
        <option selected />
      </select>
      <select className='ql-align'>
        <option value="right" />
        <option value="center" />
        <option value="justify" />
      </select>
      <button className='ql-direction' value="rtl" />
    </div>}
    </>
  );

  
  const RichTextArea = ({
    value,
    setValue
  }) => {

    const toolbarOptions = [
      { 
        'header': [2, 3, 4, 5, 6, false] 
      }, 
      'bold', 
      'italic',
      { 
        'direction': 'rtl' 
      }, { 
        'align': [] 
      }, { 
        'list': 'ordered'
      }, { 
        'list': 'bullet' 
      },
    ];
    const modules = {
      toolbar: toolbarOptions,
      clipboard: {
        matchVisual: false,
      }
    };
    
    
  const formats = [
      "header",
      "font",
      "size",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "indent",
      "link",
      "image",
      "color",
      "align",
      "direction"
    ];
    
    return (<div dir="ltr">
      <ReactQuill
      onChange={setValue}
      defaultValue={value}            
      modules={modules}
      formats={formats}
      theme={"snow"} />
    </div>);
  }
  
  export default RichTextArea;
  