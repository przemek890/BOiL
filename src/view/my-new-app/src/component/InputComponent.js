import React, { useEffect, useState } from 'react';
import "./Input/style.css"

const InputComponent = () => {
  const [htmlData, setHtmlData] = useState(null);
  const [cssData, setCssData] = useState(null);
  const [jsData, setJsData] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/get_html').then(response => response.blob()),
      fetch('http://localhost:5000/get_css').then(response => response.text()),
      fetch('http://localhost:5000/get_js').then(response => response.text())
    ])
    .then(([htmlData, cssData, jsData]) => {
      setHtmlData(URL.createObjectURL(htmlData));
      setCssData(cssData);
      setJsData(jsData);
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
        if (doc.body) {
          const styleElement = doc.createElement('style');
          styleElement.textContent = cssData;
          doc.head.appendChild(styleElement);

          setTimeout(() => {
            const scriptElement = doc.createElement('script');
            scriptElement.textContent = jsData;
            doc.body.appendChild(scriptElement);
          }, 1000);
        }
      };
      iframe.src = htmlData;
    }
  }, [htmlData, cssData, jsData]);

  return (
    <iframe title="My HTML" style={{width: '100vw', height: '100vh'}} />
  );
};

export default InputComponent;
