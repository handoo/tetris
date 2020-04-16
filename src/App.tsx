import React from 'react';
import './App.scss';
import Tetris from "./components/Tetris";

function App() {
    return (
        <>
            <div style={{
                backgroundColor: 'white',
                width: '600px',
                padding: '20px'
            }}>
                <Tetris />
            </div>
        </>
    );
}

export default App;
