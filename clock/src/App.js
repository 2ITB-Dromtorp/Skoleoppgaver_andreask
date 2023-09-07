import './App.css';
import { useEffect, useState } from 'react';

function Clock() {
    const [curHr, setHr] = useState(0);
    const [curMin, setMin] = useState(0);
    const [curSec, setSec] = useState(0);

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
        let sec;
        let min;
        let hr;

        let allMin;

        [allMin, sec] = getMaxStep(((Date.now() * 0.001) - (new Date().getTimezoneOffset() * 60)) % (60 * 60 * 24), 60);
        [hr, min] = getMaxStep(allMin, 60);

        setHr((hr * (360 / 12)) + (min * ((360 / 12) / 60)) + (sec * (((360 / 12) / 60) / 60)));
        setMin((min * (360 / 60)) + (sec * ((360 / 60) / 60)));
        setSec(sec * 6);

        reqUpdate();
    }

    reqUpdate();

    return (
        <div className="clock">
            <div className="arrows">
                <div className="hr" style={{ "--time": curHr }}></div>
                <div className="min" style={{ "--time": curMin }}></div>
                <div className="sec" style={{ "--time": curSec }}></div>
            </div>
            <div className="indicators">
                <div className="hour">
                    <div style={{ "--time": 1 }}></div>
                    <div style={{ "--time": 2 }}></div>
                    <div style={{ "--time": 3 }}></div>
                    <div style={{ "--time": 4 }}></div>
                    <div style={{ "--time": 5 }}></div>
                    <div style={{ "--time": 6 }}></div>
                    <div style={{ "--time": 7 }}></div>
                    <div style={{ "--time": 8 }}></div>
                    <div style={{ "--time": 9 }}></div>
                    <div style={{ "--time": 10 }}></div>
                    <div style={{ "--time": 11 }}></div>
                    <div style={{ "--time": 12 }}></div>
                </div>
                <div className="minute">
                    <div style={{ "--time": 1 + 12 / 60 }}></div>
                    <div style={{ "--time": 1 + 24 / 60 }}></div>
                    <div style={{ "--time": 1 + 36 / 60 }}></div>
                    <div style={{ "--time": 1 + 48 / 60 }}></div>

                    <div style={{ "--time": 2 + 12 / 60 }}></div>
                    <div style={{ "--time": 2 + 24 / 60 }}></div>
                    <div style={{ "--time": 2 + 36 / 60 }}></div>
                    <div style={{ "--time": 2 + 48 / 60 }}></div>

                    <div style={{ "--time": 3 + 12 / 60 }}></div>
                    <div style={{ "--time": 3 + 24 / 60 }}></div>
                    <div style={{ "--time": 3 + 36 / 60 }}></div>
                    <div style={{ "--time": 3 + 48 / 60 }}></div>

                    <div style={{ "--time": 4 + 12 / 60 }}></div>
                    <div style={{ "--time": 4 + 24 / 60 }}></div>
                    <div style={{ "--time": 4 + 36 / 60 }}></div>
                    <div style={{ "--time": 4 + 48 / 60 }}></div>

                    <div style={{ "--time": 5 + 12 / 60 }}></div>
                    <div style={{ "--time": 5 + 24 / 60 }}></div>
                    <div style={{ "--time": 5 + 36 / 60 }}></div>
                    <div style={{ "--time": 5 + 48 / 60 }}></div>

                    <div style={{ "--time": 6 + 12 / 60 }}></div>
                    <div style={{ "--time": 6 + 24 / 60 }}></div>
                    <div style={{ "--time": 6 + 36 / 60 }}></div>
                    <div style={{ "--time": 6 + 48 / 60 }}></div>

                    <div style={{ "--time": 7 + 12 / 60 }}></div>
                    <div style={{ "--time": 7 + 24 / 60 }}></div>
                    <div style={{ "--time": 7 + 36 / 60 }}></div>
                    <div style={{ "--time": 7 + 48 / 60 }}></div>

                    <div style={{ "--time": 8 + 12 / 60 }}></div>
                    <div style={{ "--time": 8 + 24 / 60 }}></div>
                    <div style={{ "--time": 8 + 36 / 60 }}></div>
                    <div style={{ "--time": 8 + 48 / 60 }}></div>

                    <div style={{ "--time": 9 + 12 / 60 }}></div>
                    <div style={{ "--time": 9 + 24 / 60 }}></div>
                    <div style={{ "--time": 9 + 36 / 60 }}></div>
                    <div style={{ "--time": 9 + 48 / 60 }}></div>

                    <div style={{ "--time": 10 + 12 / 60 }}></div>
                    <div style={{ "--time": 10 + 24 / 60 }}></div>
                    <div style={{ "--time": 10 + 36 / 60 }}></div>
                    <div style={{ "--time": 10 + 48 / 60 }}></div>

                    <div style={{ "--time": 11 + 12 / 60 }}></div>
                    <div style={{ "--time": 11 + 24 / 60 }}></div>
                    <div style={{ "--time": 11 + 36 / 60 }}></div>
                    <div style={{ "--time": 11 + 48 / 60 }}></div>

                    <div style={{ "--time": 12 + 12 / 60 }}></div>
                    <div style={{ "--time": 12 + 24 / 60 }}></div>
                    <div style={{ "--time": 12 + 36 / 60 }}></div>
                    <div style={{ "--time": 12 + 48 / 60 }}></div>
                </div>
            </div>
            <div className="indicator_numbers">
                <div style={{ "--time": 1 }}>1</div>
                <div style={{ "--time": 2 }}>2</div>
                <div style={{ "--time": 3 }}>3</div>
                <div style={{ "--time": 4 }}>4</div>
                <div style={{ "--time": 5 }}>5</div>
                <div style={{ "--time": 6 }}>6</div>
                <div style={{ "--time": 7 }}>7</div>
                <div style={{ "--time": 8 }}>8</div>
                <div style={{ "--time": 9 }}>9</div>
                <div style={{ "--time": 10 }}>10</div>
                <div style={{ "--time": 11 }}>11</div>
                <div style={{ "--time": 12 }}>12</div>
            </div>
        </div>
    );
}

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