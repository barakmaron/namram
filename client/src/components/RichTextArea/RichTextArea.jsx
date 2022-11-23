import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CustomToolbar = () => (
    <div id="toolbar">
      <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
        <option value="2" />
        <option value="3" />
        <option value="4" />
        <option selected />
      </select>
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className='ql-stroke' />
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
    </div>
  );


const modules = {
    toolbar: {
      container: "#toolbar",
    },
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
  
  const RichTextArea = ({
    value,
    setValue
  }) => {
    return (<div dir="ltr">
          <CustomToolbar />
          <ReactQuill
            onChange={setValue}
            value={value}
            modules={modules}
            formats={formats}
            theme={"snow"} />
       </div>);
  }
  
  export default RichTextArea;
  