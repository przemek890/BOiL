import React, { useState, useEffect } from 'react';

const InputComponent = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/get_doc')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    return (
        <div>
            <br/>
            <br/>
                <h1 style={{textAlign: "center"}}>Input Component</h1>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    )
}

export default InputComponent;
