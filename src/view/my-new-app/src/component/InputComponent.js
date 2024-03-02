import React, { useEffect, useState } from 'react';
import "./Input/style.css"

const InputComponent = () => {
  const [htmlData, setHtmlData] = useState(null);
  const [cssData, setCssData] = useState(null);
  const [jsData, setJsData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/get_html')
      .then(response => response.blob())
      .then(data => {
        const file = URL.createObjectURL(data);
        setHtmlData(file);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    fetch('http://localhost:5000/get_css')
      .then(response => response.text())
      .then(data => {
        setCssData(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    fetch('http://localhost:5000/get_js')
      .then(response => response.text())
      .then(data => {
        setJsData(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    if (htmlData && cssData && jsData) {
      const iframe = document.querySelector('iframe');
      iframe.onload = function() {
        const doc = iframe.contentWindow.document;
        const styleElement = doc.createElement('style');
        styleElement.textContent = cssData;
        doc.head.appendChild(styleElement);

        const scriptElement = doc.createElement('script');
        scriptElement.textContent = jsData;
        doc.body.appendChild(scriptElement);
      };
    }
  }, [htmlData, cssData, jsData]);

  return (
    <iframe src={htmlData} title="My HTML" style={{width: '100vw', height: '100vh'}} />
  );
};

export default InputComponent;