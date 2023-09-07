import { useState, Component } from 'react';
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
        if (props.hasChosen === true) {
            newText = 'Ready';
        } else {
            newText = 'Not ready';
        }
        newContent = (
            <div className="choice_status">
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

function RockPaperScissors() {
    const [plrChoiceInd, setPlrChoiceInd] = useState(0);
    const [botChoiceInd, setBotChoiceInd] = useState(0);

    const [plrVisible, setPlrVisible] = useState(true);
    const [botVisible, setBotVisible] = useState(false);

    const [botHasChosen, setBotHasChosen] = useState(false);

    const youPlr = <Player name="You" isPlr={true} choiceInd={plrChoiceInd} setChoiceInd={setPlrChoiceInd} visible={plrVisible} setVisible={setPlrVisible} />;
    const botPlr = <Player name="Bot" isPlr={false} choiceInd={botChoiceInd} setChoiceInd={setBotChoiceInd} visible={botVisible} setVisible={setBotVisible} hasChosen={botHasChosen} />;

    const submitClicked = () => {
        setPlrChoiceInd(1);
    }

    return (
        <div id="rps_container">
            <div id="plrs">
                {youPlr}
                {botPlr}
            </div>
            <div id="submit" onClick={submitClicked}>
                Ready
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