import { useState, Component, useEffect } from 'react';
import './App.css';

const choiceData = [
    {
        name: 'rock',
        label: 'Rock',
        icon: '🪨',
    },
    {
        name: 'paper',
        label: 'Paper',
        icon: '📄',
    },
    {
        name: 'scissors',
        label: 'Scissors',
        icon: '✂️',
    },
];

const botNames = {
    male: [
        'Adam',
        'Alexander',
        'Benjamin',
        'Caleb',
        'Daniel',
        'Elijah',
        'Felix',
        'Gabriel',
        'Henry',
        'Isaac',
        'Jacob',
        'Kevin',
        'Liam',
        'Matthew',
        'Nathan',
        'Oliver',
        'Patrick',
        'Quentin',
        'Ryan',
        'Samuel',
        'Theodore',
        'Ulysses',
        'Vincent',
        'William',
        'Xavier',
        'Zachary',
        'Aaron',
        'Brandon',
        'Christopher',
        'David',
        'Ethan',
        'Franklin',
        'George',
        'Harrison',
        'Ian',
        'James',
        'Kyle',
        'Luke',
        'Michael',
        'Nicholas',
        'Owen',
        'Peter',
        'Quincy',
        'Robert',
        'Stephen',
        'Thomas',
        'Ulysses',
        'Victor',
        'Wesley',
        'Xavier',
        'Yannick',
        'Zacharias',
        'Aaron',
        'Brian',
        'Calvin',
        'Darius',
        'Evan',
        'Frederick',
        'Gavin',
        'Harrison',
        'Isaiah',
        'Jonathan',
        'Kenneth',
        'Leo',
        'Maxwell',
        'Nathaniel',
        'Owen',
        'Phillip',
        'Quentin',
        'Raymond',
        'Sebastian',
        'Tobias',
        'Umar',
        'Vincent',
        'Walter',
        'Xavier',
        'Yannick',
        'Zacharias',
        'Andrew',
        'Brody',
        'Caleb',
        'Dylan',
        'Elijah',
        'Finn',
        'Grayson',
        'Hayden',
        'Isaiah',
        'Jackson',
        'Kaden',
        'Liam',
        'Mason',
        'Noah',
        'Owen',
        'Peyton',
        'Quinn',
        'Ryan',
        'Sebastian',
        'Tyler',
        'Ulysses',
        'Victor',
    ],
    female: [
        'Abigail',
        'Bella',
        'Charlotte',
        'Daisy',
        'Emma',
        'Faith',
        'Grace',
        'Hannah',
        'Isabella',
        'Jasmine',
        'Katherine',
        'Lily',
        'Mia',
        'Natalie',
        'Olivia',
        'Penelope',
        'Quinn',
        'Rachel',
        'Sophia',
        'Taylor',
        'Ula',
        'Victoria',
        'Willow',
        'Xena',
        'Yasmine',
        'Zoe',
        'Ada',
        'Beatrice',
        'Cecilia',
        'Dahlia',
        'Eleanora',
        'Fiona',
        'Giselle',
        'Hazel',
        'Isla',
        'Juliette',
        'Kira',
        'Lila',
        'Matilda',
        'Nora',
        'Ophelia',
        'Persephone',
        'Quinlan',
        'Rosalie',
        'Scarlett',
        'Thea',
        'Ulyana',
        'Violet',
        'Wren',
        'Ximena',
        'Yara',
        'Zara',
        'Adelaide',
        'Bridget',
        'Caroline',
        'Delilah',
        'Eleanor',
        'Fiona',
        'Georgia',
        'Hazel',
        'Isabella',
        'Josephine',
        'Kate',
        'Lily',
        'Madeline',
        'Noelle',
        'Olivia',
        'Phoebe',
        'Quinn',
        'Ruby',
        'Sophia',
        'Tatiana',
        'Ursula',
        'Vivienne',
        'Willow',
        'Yara',
        'Zara',
        'Amelia',
        'Bethany',
        'Clara',
        'Danielle',
        'Eliza',
        'Felicity',
        'Genevieve',
        'Josephine',
        'Kate',
        'Lillian',
        'Margot',
        'Nellie',
        'Olivia',
        'Poppy',
        'Quinn',
        'Rose',
        'Sophia',
        'Tessa',
        'Vivian',
        'Waverly',
        'Xandra',
        'Yasmine',
        'Zara',
    ],
}

function getRandomValInArr(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getChoiceDataFromName(name) {
    let res;
    let resInd;

    for (let i = 0; i < choiceData.length; i++) {
        const cur = choiceData[i];
        if (cur.name === name) {
            res = cur;
            resInd = i;
        }
    }

    return [res, resInd];
}

function doesChoiceWin(c1, c2) {
    const c1n = c1.name;
    const c2n = c2.name;
    let res;
    if (c1n === c2n) {
        res = 'tie';
    } else {
        if (c1n === 'rock') {
            if (c2n === 'paper') {
                res = 'lose';
            } else if (c2n === 'scissors') {
                res = 'win';
            }
        } else if (c1n === 'paper') {
            if (c2n === 'rock') {
                res = 'win';
            } else if (c2n === 'scissors') {
                res = 'lose';
            }
        } else if (c1n === 'scissors') {
            if (c2n === 'rock') {
                res = 'lose';
            } else if (c2n === 'paper') {
                res = 'win';
            }
        }
    }
    return res;
}

function Player(props) {
    let curChoice = choiceData[props.choiceInd];

    const setChoiceInd = (ind) => {
        props.setChoiceInd(ind);
        curChoice = choiceData[props.choiceInd];
    }

    let newContent;
    let plrContent = '';
    if (props.visible === true) {
        if (props.isPlr === true) {
            plrContent = (
                <div className="plr_choice_buttons">
                    <div className="plr_choice_dir plr_choice_right" onClick={() => { cycleChoices(true) }}>
                        {'>'}
                    </div>
                    <div className="plr_choice_dir plr_choice_left" onClick={() => { cycleChoices(false) }}>
                        {'<'}
                    </div>
                </div>
            );

            const cycleChoices = (isRight) => {
                let start;
                let end;
                let add;
                if (isRight === true) {
                    start = 0;
                    end = choiceData.length - 1;
                    add = 1;
                } else {
                    start = choiceData.length - 1;
                    end = 0;
                    add = -1;
                }
                if (props.choiceInd === end) {
                    setChoiceInd(start);
                } else {
                    setChoiceInd(props.choiceInd + add);
                }
            }
        }
        newContent = (
            <>
                <div className="plr_choice_name">
                    {curChoice.label}
                </div>
                <div className="plr_choice_icon">
                    {curChoice.icon}
                </div>
            </>
        );
    } else {
        let newText;
        let addClass;
        if (props.isReady === true) {
            newText = 'Ready';
            addClass = 'ready';
        } else {
            newText = 'Not ready';
            addClass = 'not_ready';
        }
        newContent = (
            <div className={'choice_status' + ' ' + addClass}>
                {newText}
            </div>
        );
    }

    return (
        <div className="plr">
            {plrContent}
            <div className="plr_main">
                <div className="plr_name">
                    {props.name}
                </div>
                <div className="plr_choice">
                    {newContent}
                </div>
            </div>
        </div>
    );
}

function CreatePlayer(name, isPlr = true, choiceInd = 0, visible = true, ready = false) {
    const newPlr = {};

    const states = {};
    states.choiceInd = {};
    [states.choiceInd.val, states.choiceInd.set] = useState(choiceInd);
    states.visible = {};
    [states.visible.val, states.visible.set] = useState(visible);
    states.ready = {};
    [states.ready.val, states.ready.set] = useState(ready);
    newPlr.states = states;

    newPlr.plr = <Player name={name} isPlr={isPlr} choiceInd={states.choiceInd.val} setChoiceInd={states.choiceInd.set} visible={states.visible.val} setVisible={states.visible.set} isReady={states.ready.val} />

    return newPlr;
}

function RockPaperScissors() {
    const [plrs, setPlrs] = useState([]);
    const [gameActive, setGameActive] = useState(false);

    function plrsPush(val) {
        setPlrs(plrs.concat(val));
    }

    function plrsSplice(start, end) {
        setPlrs(plrs.slice(start, start + end));
    }

    if (gameActive === false) {
        setGameActive(true);
        
        let botAmount = 32;
        for (let i = 0; i < botAmount * 0.5; i++) {
            plrsPush(CreatePlayer(getRandomValInArr(botNames.male), false, 0, false, false));
        }
        for (let i = 0; i < botAmount * 0.5; i++) {
            plrsPush(CreatePlayer(getRandomValInArr(botNames.female), false, 0, false, false));
        }
    }

    /*
    const youPlr = CreatePlayer('You', true, 0, true, false);
    const botPlr = CreatePlayer('Bot', false, 0, false, false);
    */

    const [resStr, setResStr] = useState('');

    const plrReadyVals = [];
    for (let i = 0; i < plrs.length; i++) {
        const curPlr = plrs[i];
        plrReadyVals.push(curPlr.states.ready.val);
    }

    useEffect(() => {
        let allReady = true;
        for (let i = 0; i < plrs.length; i++) {
            const curPlr = plrs[i];
            if (curPlr.states.ready.val === false) {
                allReady = false;
                break;
            }
        }
        if (allReady === true) {
            for (let i = 0; i < plrs.length; i++) {
                const curPlr = plrs[i];
                curPlr.states.visible.set(true);
            }

            for (let i = 0; i < playPairs.length; i++) {
                const pair = playPairs[i];
                const c1 = choiceData[pair.plrs[0].states.choiceInd.val];
                const c2 = choiceData[pair.plrs[1].states.choiceInd.val];

                const res = doesChoiceWin(c1, c2);

                if (res === 'tie') {

                } else {
                    let losePlr;
                    if (res === 'win') {
                        losePlr = pair.plrs[1];
                    } else if (res === 'lose') {
                        losePlr = pair.plrs[0];
                    }
                    plrsSplice(plrs.indexOf(losePlr), 1);
                }
            }

            const res = doesChoiceWin(plrChoice, botChoice);

            if (res === 'win') {
                setResStr('Player Wins');
            } else if (res === 'lose') {
                setResStr('Bot Wins');
            } else if (res === 'tie') {
                setResStr('Tie');
            }
        } else {
            setResStr('Waiting for players to choose their weapon');
        }
        /*
        if (youPlr.states.ready.val === true && botPlr.states.ready.val === true) {
            botPlr.states.visible.set(true);
            
            const plrChoice = choiceData[youPlr.states.choiceInd.val];
            const botChoice = choiceData[botPlr.states.choiceInd.val];

            const res = doesChoiceWin(plrChoice, botChoice);

            if (res === 'win') {
                setResStr('Player Wins');
            } else if (res === 'lose') {
                setResStr('Bot Wins');
            } else if (res === 'tie') {
                setResStr('Tie');
            }
        } else {
            setResStr('Waiting for players to choose their weapon');
        }
        */
    }, plrReadyVals);

    function setPlrReady(plr, ready) {
        plr.states.ready.set(ready);
    }

    const [didStart, setStart] = useState(false);

    if (didStart === false) {
        setStart(true);
        setTimeout(() => {
            botPlr.states.choiceInd.set(Math.floor(Math.random() * choiceData.length));
            setPlrReady(botPlr, true);
        }, 5000);
    }

    const readyClicked = () => {
        setPlrReady(youPlr, youPlr.states.ready.val === false);
    }

    let readyStr;
    let addClass;
    if (youPlr.states.ready.val === true) {
        readyStr = 'Unready';
        addClass = 'ready';
    } else {
        readyStr = 'Ready';
        addClass = 'not_ready';
    }

    return (
        <div id="rps_container">
            <div id="result">
                {resStr}
            </div>
            <div id="plrs">
                {youPlr.plr}
                {botPlr.plr}
            </div>
            <div id="ready" className={addClass} onClick={readyClicked}>
                {readyStr}
            </div>
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <RockPaperScissors />
            </header>
        </div>
    );
}

export default App;