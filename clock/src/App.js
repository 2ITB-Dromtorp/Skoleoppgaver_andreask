import { getMouseEventOptions } from '@testing-library/user-event/dist/utils';
import './App.css';
import {React, CSSProperties} from 'react';

function Clock() {
    return (
        <div className="clock">
            <div className="arrows">
                <div className="hr"></div>
                <div className="min"></div>
                <div className="sec"></div>
            </div>
            <div className="indicators">
                <div className="hour">
                    <div style={{ "--hour": 1 }}></div>
                    <div style={{ "--hour": 2 }}></div>
                    <div style={{ "--hour": 3 }}></div>
                    <div style={{ "--hour": 4 }}></div>
                    <div style={{ "--hour": 5 }}></div>
                    <div style={{ "--hour": 6 }}></div>
                    <div style={{ "--hour": 7 }}></div>
                    <div style={{ "--hour": 8 }}></div>
                    <div style={{ "--hour": 9 }}></div>
                    <div style={{ "--hour": 10 }}></div>
                    <div style={{ "--hour": 11 }}></div>
                    <div style={{ "--hour": 12 }}></div>
                </div>
                <div className="minute">
                    <div style={{ "--hour": 1 + 12 / 60 }}></div>
                    <div style={{ "--hour": 1 + 24 / 60 }}></div>
                    <div style={{ "--hour": 1 + 36 / 60 }}></div>
                    <div style={{ "--hour": 1 + 48 / 60 }}></div>

                    <div style={{ "--hour": 2 + 12 / 60 }}></div>
                    <div style={{ "--hour": 2 + 24 / 60 }}></div>
                    <div style={{ "--hour": 2 + 36 / 60 }}></div>
                    <div style={{ "--hour": 2 + 48 / 60 }}></div>

                    <div style={{ "--hour": 3 + 12 / 60 }}></div>
                    <div style={{ "--hour": 3 + 24 / 60 }}></div>
                    <div style={{ "--hour": 3 + 36 / 60 }}></div>
                    <div style={{ "--hour": 3 + 48 / 60 }}></div>

                    <div style={{ "--hour": 4 + 12 / 60 }}></div>
                    <div style={{ "--hour": 4 + 24 / 60 }}></div>
                    <div style={{ "--hour": 4 + 36 / 60 }}></div>
                    <div style={{ "--hour": 4 + 48 / 60 }}></div>

                    <div style={{ "--hour": 5 + 12 / 60 }}></div>
                    <div style={{ "--hour": 5 + 24 / 60 }}></div>
                    <div style={{ "--hour": 5 + 36 / 60 }}></div>
                    <div style={{ "--hour": 5 + 48 / 60 }}></div>

                    <div style={{ "--hour": 6 + 12 / 60 }}></div>
                    <div style={{ "--hour": 6 + 24 / 60 }}></div>
                    <div style={{ "--hour": 6 + 36 / 60 }}></div>
                    <div style={{ "--hour": 6 + 48 / 60 }}></div>

                    <div style={{ "--hour": 7 + 12 / 60 }}></div>
                    <div style={{ "--hour": 7 + 24 / 60 }}></div>
                    <div style={{ "--hour": 7 + 36 / 60 }}></div>
                    <div style={{ "--hour": 7 + 48 / 60 }}></div>

                    <div style={{ "--hour": 8 + 12 / 60 }}></div>
                    <div style={{ "--hour": 8 + 24 / 60 }}></div>
                    <div style={{ "--hour": 8 + 36 / 60 }}></div>
                    <div style={{ "--hour": 8 + 48 / 60 }}></div>

                    <div style={{ "--hour": 9 + 12 / 60 }}></div>
                    <div style={{ "--hour": 9 + 24 / 60 }}></div>
                    <div style={{ "--hour": 9 + 36 / 60 }}></div>
                    <div style={{ "--hour": 9 + 48 / 60 }}></div>

                    <div style={{ "--hour": 10 + 12 / 60 }}></div>
                    <div style={{ "--hour": 10 + 24 / 60 }}></div>
                    <div style={{ "--hour": 10 + 36 / 60 }}></div>
                    <div style={{ "--hour": 10 + 48 / 60 }}></div>

                    <div style={{ "--hour": 11 + 12 / 60 }}></div>
                    <div style={{ "--hour": 11 + 24 / 60 }}></div>
                    <div style={{ "--hour": 11 + 36 / 60 }}></div>
                    <div style={{ "--hour": 11 + 48 / 60 }}></div>

                    <div style={{ "--hour": 12 + 12 / 60 }}></div>
                    <div style={{ "--hour": 12 + 24 / 60 }}></div>
                    <div style={{ "--hour": 12 + 36 / 60 }}></div>
                    <div style={{ "--hour": 12 + 48 / 60 }}></div>
                </div>
            </div>
        </div>
    );
}

setTimeout(() => {
    const hrArrow = document.getElementsByClassName('hr')[0];
    const minArrow = document.getElementsByClassName('min')[0];
    const secArrow = document.getElementsByClassName('sec')[0];

    function getMaxStep(amount, step) {
        const div = amount / step;
        const whole = Math.floor(div);
        const rest = (div - whole) * step;
        return [whole, rest];
    }

    function reqUpdate() {
        window.requestAnimationFrame(update);
    }
    
    function update() {
        /*
        const [hr, min, sec] = new Date().toLocaleTimeString().split(':');

        hrArrow.style.setProperty('--hour', (hr % 12) / 12);
        minArrow.style.setProperty('--hour', (min / 60) / 12);
        secArrow.style.setProperty('--hour', sec / 60);
        */

        let sec;
        let min;
        let hr;
        let allMin;

        [allMin, sec] = getMaxStep(((Date.now() * 0.001) - (new Date().getTimezoneOffset() * 60)) % (60 * 60 * 24), 60);
        [hr, min] = getMaxStep(allMin, 60);

        console.log(new Date().getTimezoneOffset() / 60);
    
        hrArrow.style.setProperty('--hour', (hr * (360 / 12)) + (min * ((360 / 12) / 60)) + (sec * (((360 / 12) / 60) / 60)));
        minArrow.style.setProperty('--hour', (min * (360 / 60)) + (sec * ((360 / 60) / 60)));
        secArrow.style.setProperty('--hour', sec * 6);

        reqUpdate();
    }

    reqUpdate();
}, 100);

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Clock />
            </header>
        </div>
    );
}

export default App;