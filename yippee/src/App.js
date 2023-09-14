import './App.css';
import imageSrc from './image.png';
import soundSrc from './sound.mp3';
import { useState } from 'react';
import Confetti from 'react-confetti-explosion';

function App() {
    const [isCounting, setIsCounting] = useState(false);
    const [isExploding, setIsExploding] = useState(false);
    if (isCounting === false) {
        setIsCounting(true);
        setTimeout(() => {
            setIsExploding(true);
        }, 2000);
    }
    return (
        <div className="App">
            <header className="App-header">
                <img id="image" src={imageSrc} />
                {isExploding && (<>
                    <audio src={soundSrc} autoPlay></audio>
                    <Confetti
                        force={2}
                        width={window.innerWidth}
                        height={window.innerHeight}
                    />
                </>)}
            </header>
        </div>
    );
}

export default App;