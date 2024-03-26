import React from 'react';
import { NumberInput } from '@mantine/core';
import {MantineProvider } from '@mantine/core';

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


// import { NumberInput } from '@mantine/core';
//
// function Demo() {
//   return (
//     <NumberInput
//       label="Customer 1"
//       placeholder="Podaj liczbę całkowita"
//     />
//   );
// }

export default InputComponent;