import React from 'react';

const InputComponent = () => {
    return (
        <div>
            <MantineProvider>
                <br/>
                <br/>
                <h1 style={{textAlign: "center"}}>Input Component</h1>
                <br/>
                <br/>
                <NumberInput
                    label="Customer 1"
                    placeholder="Podaj liczbę całkowita"
                />
            </MantineProvider>
        </div>
    )
}

export default InputComponent;