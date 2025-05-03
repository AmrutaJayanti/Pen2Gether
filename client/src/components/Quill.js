import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const QuillEditor = () => {
  const editorRef = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['link', 'image'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
          ],
        },
      });

      // Optional: Listen to changes
      quillInstance.current.on('text-change', () => {
        const content = quillInstance.current.root.innerHTML;
        console.log('Editor content:', content);
      });
    }
  }, []);

  return <div ref={editorRef} style={{ height: '300px' }} />;
};

export default QuillEditor;
