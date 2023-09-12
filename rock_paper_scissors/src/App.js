import { useState, Component, useEffect, useRef } from 'react';
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
        if (props.ready === true) {
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
        <div className={'plr' + ' ' + props.class}>
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

function createPlayer(id, name, isPlr, choiceInd, visible, ready) {
    const newPlr = {};

    newPlr.id = id;
    newPlr.name = name;
    newPlr.isPlr = isPlr;

    newPlr.choiceInd = choiceInd;
    newPlr.visible = visible;
    newPlr.ready = ready;

    return newPlr;
}

function RockPaperScissors(props) {
    const [plrs, setPlrs] = useState([]);
    const [localPlr, setLocalPlr] = useState();
    const [playPairs, setPlayPairs] = useState([]);
    const [gameActive, setGameActive] = useState(false);
    const [resStr, setResStr] = useState('');
    const [gameStart, setGameStart] = useState(false);
    const [unReadyBots, setUnReadyBots] = useState([]);
    const [fighting, setFighting] = useState(false);

    let fightingClass;
    if (fighting === true) {
        fightingClass = 'fighting';
    } else {
        fightingClass = '';
    }

    function copyObj(obj) {
        const res = {};
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            res[key] = obj[key];
        }
        return res;
    }

    function copyPlrs() {
        const res = [];
        for (let i = 0; i < plrs.length; i++) {
            res.push(copyObj(plrs[i]));
        }
        return res;
    }

    function getPlrFromIDInArr(arr, id) {
        let res;
        for (let i = 0; i < arr.length; i++) {
            const plr = arr[i];
            if (plr.id === id) {
                res = plr;
                break;
            }
        }
        return res;
    }

    function getPlrFromID(id) {
        return getPlrFromIDInArr(plrs, id);
    }

    function getPlrsMods(modPlrs, arr) {
        for (let i = 0; i < arr.length; i++) {
            const curData = arr[i];
            const plr = getPlrFromIDInArr(modPlrs, curData.id);
            for (let pI = 0; pI < curData.props.length; pI++) {
                const propData = curData.props[pI];
                plr[propData.prop] = propData.val;
            }
        }
    }

    function modifyPlrs(arr) {
        const newPlrs = copyPlrs(plrs);
        getPlrsMods(newPlrs, arr);
        setPlrs(newPlrs);
    }

    function statePush(state, val) {
        return state.concat([val]);
    }

    function stateCutOut(state, start, amount) {
        const res = [...state];
        res.splice(start, amount);
        return res;
    }

    function stateSplice(state, start, end) {
        return state.slice(start, start + end);
    }

    if (gameActive === false) {
        setGameActive(true);

        const botAmount = 16;
        const newPlrs = [];
        let msInd = 0;
        let fsInd = 0;
        if (props.localPlr === true) {
            const youPlr = createPlayer(0, 'You', true, 0, false, false);
            setLocalPlr(youPlr);
            newPlrs.push(youPlr);
            if (Math.random() > 0.5) {
                msInd = 1;
            } else {
                fsInd = 1;
            }
        }
        for (let i = msInd; i < botAmount * 0.5; i++) {
            newPlrs.push(createPlayer(i, getRandomValInArr(botNames.male), false, 0, false, false));
        }
        for (let i = fsInd; i < botAmount * 0.5; i++) {
            newPlrs.push(createPlayer((botAmount * 0.5) + i, getRandomValInArr(botNames.female), false, 0, false, false));
        }

        setPlrs(newPlrs);
        setUnReadyBots([...newPlrs]);
        setGameStart(true);
    }

    useEffect(() => {
        let allReady = true;
        for (let i = 0; i < plrs.length; i++) {
            const curPlr = plrs[i];
            if (curPlr.ready === false) {
                allReady = false;
                break;
            }
        }
        if (allReady === true && fighting === false) {
            setFighting(true);

            let newPlrs = [...plrs];

            const tmpPlrs = [...newPlrs];
            const newPlayPairs = [];
            let ind = 0;
            while (tmpPlrs.length > 0) {
                ind += 1;
                const getRand = () => {
                    return tmpPlrs.splice(tmpPlrs[Math.floor(Math.random() * tmpPlrs.length - 1)], 1)[0];
                }
                const randPlr1 = getRand();
                const randPlr2 = getRand();
                newPlayPairs.push(
                    {
                        plrs: [randPlr1, randPlr2],
                    }
                );
            }
            setPlayPairs(newPlayPairs);

            const mods = [];
            for (let i = 0; i < plrs.length; i++) {
                const curPlr = plrs[i];
                mods.push({
                    id: curPlr.id,
                    props: [
                        {
                            prop: 'visible',
                            val: true,
                        },
                    ],
                });
            }

            getPlrsMods(newPlrs, mods);

            for (let i = 0; i < newPlayPairs.length; i++) {
                const pair = newPlayPairs[i];
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
                    newPlrs.splice(newPlrs.indexOf(losePlr), 1);
                }
            }
            setPlrs(newPlrs);
        } else {
            setResStr('Waiting for players to choose their item');
        }
    }, [plrs]);

    useEffect(() => {
        console.log("EW CANWNA")
        if (gameStart === true) {
            if (unReadyBots.length === 0) {
                setGameStart(false);
                console.log("NUH UH")
                return;
            }
            const ind = 0;//Math.floor(Math.random() * unReadyBots.length);
            const plr = unReadyBots[ind];
            console.log(unReadyBots, stateCutOut(unReadyBots, ind, 1))
            setTimeout(() => {
                modifyPlrs([
                    {
                        id: plr.id,
                        props: [
                            {
                                prop: 'choiceInd',
                                val: Math.floor(Math.random() * choiceData.length),
                            },
                            {
                                prop: 'ready',
                                val: true,
                            },
                        ],
                    },
                ]);
                setUnReadyBots(stateCutOut(unReadyBots, ind, 1));
                console.log("CHANg")
            }, 100); //(1 + (Math.random() * 1)) * 1000
        }
    }, [unReadyBots]);

    function setPlrReady(plr, ready) {
        modifyPlrs([
            {
                id: plr.id,
                props: [
                    {
                        prop: 'ready',
                        val: ready,
                    },
                ],
            },
        ]);
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
        plrsToRender.push(<Player class={fightingClass} key={i} name={curPlr.name} isPlr={curPlr.isPlr} choiceInd={curPlr.choiceInd} visible={curPlr.visible} ready={curPlr.ready} />);
    }

    //console.log(plrs)
    //console.log(plrsToRender.length)

    return (
        <div id="rps_container">
            <div id="result">
                {resStr}
            </div>
            <div id="plrs" className={fightingClass}>
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