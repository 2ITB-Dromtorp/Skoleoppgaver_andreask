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

function RockPaperScissors(props) {
    const [plrs, setPlrs] = useState([]);
    const [localPlr, setLocalPlr] = useState();
    const [playPairs, setPlayPairs] = useState([]);
    const [gameActive, setGameActive] = useState(false);
    const [resStr, setResStr] = useState('');

    function CreatePlayer(name, isPlr, choiceInd, visible, ready) {
        const newPlr = {};

        newPlr.name = name;
        newPlr.isPlr = isPlr;

        const states = {};
        states.choiceInd = {};
        [states.choiceInd.val, states.choiceInd.set] = useState(choiceInd);
        states.visible = {};
        [states.visible.val, states.visible.set] = useState(visible);
        states.ready = {};
        [states.ready.val, states.ready.set] = useState(ready);
        newPlr.states = states;

        return newPlr;
    }

    function plrsPush(val) {
        setPlrs(plrs.concat([val]));
    }

    function plrsSplice(start, end) {
        setPlrs(plrs.slice(start, start + end));
    }

    if (gameActive === false) {
        setGameActive(true);

        console.log("RAH")

        const botAmount = 32;
        const newPlrs = [];
        let msInd = 0;
        let fsInd = 0;
        if (props.localPlr === true) {
            const youPlr = CreatePlayer('You', true, 0, false, false);
            setLocalPlr(youPlr);
            newPlrs.push(youPlr);
            if (Math.random() > 0.5) {
                msInd = 1;
            } else {
                fsInd = 1;
            }
        }
        for (let i = msInd; i < botAmount * 0.5; i++) {
            newPlrs.push(CreatePlayer(getRandomValInArr(botNames.male), false, 0, false, false));
        }
        for (let i = fsInd; i < botAmount * 0.5; i++) {
            newPlrs.push(CreatePlayer(getRandomValInArr(botNames.female), false, 0, false, false));
        }

        setPlrs(newPlrs);

        for (let i = 0; i < newPlrs.length; i++) {
            const curPlr = newPlrs[i];
            setTimeout(() => {
                curPlr.states.choiceInd.set(Math.floor(Math.random() * choiceData.length));
                setPlrReady(curPlr, true);
            }, (1 + (Math.random() * 4)) * 1000);
        }
    }

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

            const tmpPlrs = [...plrs];
            while (tmpPlrs.length > 0) {
                const getRand = () => {
                    return tmpPlrs.splice(tmpPlrs[Math.floor(Math.random() * tmpPlrs.length - 1)], 1);
                }
                const randPlr1 = getRand();
                const randPlr2 = getRand();
                setPlayPairs(playPairs.concat([[randPlr1, randPlr2]]));
            }

            for (let i = 0; i < playPairs.length; i++) {
                const pair = playPairs[i];
                const c1 = choiceData[pair.plrs[0].choiceInd];
                const c2 = choiceData[pair.plrs[1].choiceInd];

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
        } else {
            setResStr('Waiting for players to choose their item');
        }
    }, plrReadyVals);

    function setPlrReady(plr, ready) {
        plr.states.ready.set(ready);
    }

    const readyClicked = () => {
        //setPlrReady(youPlr, youPlr.ready === false);
    }

    let readyStr;
    let addClass;
    if (localPlr !== undefined) {
        if (localPlr.ready === true) {
            readyStr = 'Unready';
            addClass = 'ready';
        } else {
            readyStr = 'Ready';
            addClass = 'not_ready';
        }
    } else {
        readyStr = 'Reveal answers';
        addClass = 'not_ready';
    }

    const plrsToRender = [];
    for (let i = 0; i < plrs.length; i++) {
        const curPlr = plrs[i];
        plrsToRender.push(<Player name={curPlr.name} isPlr={curPlr.isPlr} choiceInd={curPlr.choiceInd} visible={curPlr.visible} isReady={curPlr.ready}/>);
    }

    console.log(plrsToRender.length)

    return (
        <div id="rps_container">
            <div id="result">
                {resStr}
            </div>
            <div id="plrs">
                {plrsToRender}
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
                <RockPaperScissors localPlr={true} />
            </header>
        </div>
    );
}

export default App;