import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const MultiPageQuillEditor = () => {
  const [pageCount, setPageCount] = useState(1);
  const editorsRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // Initialize Quill editors for any pages not yet initialized
    for (let i = editorsRef.current.length; i < pageCount; i++) {
      const pageId = `editor-${i + 1}`;
      const container = document.getElementById(pageId);
      if (container) {
        const quill = new Quill(container, {
          theme: 'snow',
        });
        editorsRef.current.push(quill);
      }
    }
  }, [pageCount]);

  const handleAddPage = () => {
    setPageCount(prev => prev + 1);
  };

  return (
    <div style={{ background: '#f0f0f0', padding: '20px', textAlign: 'center' }}>
      <h1>Multi-Page Quill Editor</h1>

      <div id="pages-container" ref={containerRef}>
        {Array.from({ length: pageCount }, (_, index) => (
          <div
            key={index}
            id={`editor-${index + 1}`}
            className="page"
            style={{
              width: '800px',
              height: '1120px',
              padding: '40px',
              margin: '0 auto 20px auto',
              background: 'white',
              boxShadow: '0 0 5px rgba(0,0,0,0.3)',
              overflow: 'hidden'
            }}
          />
        ))}
      </div>

      <button
        onClick={handleAddPage}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Add Page
      </button>
    </div>
  );
};

export default MultiPageQuillEditor;
