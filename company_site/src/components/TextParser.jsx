import React from 'react';
import ReactQuill from 'react-quill';

const TextParser = ({
  body
}) => {
  return <ReactQuill value={body} readOnly={true} theme={'bubble'} />;
}

export default TextParser;