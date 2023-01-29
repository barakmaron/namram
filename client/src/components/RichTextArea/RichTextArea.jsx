import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
  
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
  