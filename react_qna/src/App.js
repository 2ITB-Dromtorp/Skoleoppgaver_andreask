import './App.css';

function getAnswer(a) {
    const aType = typeof (a);
    let res;
    if (aType === 'function') {
        res = a();
    } else {
        res = a;
    }
    return res;
}

function QuestionAndAnswer(props) {
    return (
        <>
            <span className="SubTaskQuestion">{props.q}</span>
            <span className="SubTaskAnswer">{getAnswer(props.a)}</span>
        </>
    );
}

function SubTask(props) {
    return (
        <span className="SubTaskContainer">
            <p className="SubTaskName">{props.n}</p>
            <QuestionAndAnswer q={props.q} a={props.a} />
        </span>
    );
}

function SupTask(props) {
    const qType = props.task.questionType;
    const header = (<h2>{'Oppgave ' + (props.i + 1).toString()}</h2>);
    if (qType === 'sup' || qType === 'intro') {
        let descContent;
        if (props.desc !== undefined) {
            descContent = (
                <span className="SupTaskDesc">
                    {props.desc}
                </span>
            );
        }
        let qnaContent;
        if (qType === 'sup') {
            qnaContent = (
                <span>
                    <QuestionAndAnswer q={props.task.q} a={props.task.a} />
                </span>
            );
        }

        return (
            <span className="SupTaskContainer">
                {header}
                {descContent}
                {qnaContent}
            </span>
        );
    } else if (qType === 'sub') {
        const qs = [];
        for (const [qI, q] of Object.entries(props.task.subTasks)) {
            qs.push(<SubTask n={qI + ')'} q={q.q} a={q.a} />);
        }
        return (
            <span className="SupTaskContainer">
                {header}
                <span>
                    {qs}
                </span>
            </span>
        );
    }
}

const tasks = [
    {
        questionType: 'sub',
        subTasks: {
            a: {
                q: (<>Hva skriver du i JavaScript dersom du vil gi variabelen <code>test</code> verdien <code>8</code>?<br />Hvilken datatype er dette?</>),
                a: (<><code>let test = 8;</code><br />Dette er <code>Number</code> datatypen.</>),
            },
            b: {
                q: (<>Hva skriver du dersom du vil gi variabelen <code>test</code> verdien <code>"testverdi"</code>?<br />Hvilken datatype er dette?</>),
                a: (<><code>let test = 'testverdi';</code><br />Dette er <code>String</code> datatypen. String er bare et fancy ord for tekst</>),
            },
            c: {
                q: (<>Hva skriver du dersom du vil regne ut <code>2 * 3</code> å sette resultatet inn i variabelen <code>produkt</code>?</>),
                a: (<><code>let produkt = 2 * 3;</code></>),
            },
            d: {
                q: (<>Hva skriver du dersom du vil regne ut verdien av brøken <code>2 / 3</code> å sette resultatet inn i variabelen <code>broek</code>? (Det kan være lurt å unngå skandinaviske bokstaver som æ, ø og å i variabelnavn.)</>),
                a: (<><code>let broek = 2 / 3;</code></>),
            },
            e: {
                q: (<>Lag et program der du tester om alle kommandoene over fungerer ved å bruke <code>console.log()</code> til å skrive ut innholdet av variablene.</>),
                a: (<>
                    <code className="big_code"><p>
                        //a<br />
                        let test = 8;<br />
                        console.log('a: ', test, type(test));//Returnerer: a: 8 number<br />
                        <br />
                        //b<br />
                        let test = 'testverdi';<br />
                        console.log('b: ', test, type(test));//Returnerer: b: 'testverdi' string<br />
                        <br />
                        //c<br />
                        let produkt = 2 * 3;<br />
                        console.log('c: ', produkt);//Returnerer: c: 6<br />
                        <br />
                        //d<br />
                        let broek = 2 / 3;<br />
                        console.log('d: ', broek);//Returnerer: d: 0.666...<br />
                    </p></code>
                </>),
            },
        },
    },
    {
        questionType: 'sub',
        subTasks: {
            a: {
                q: (<>Lag et program som regner ut arealet av et rektangel. Lengden er 8 og bredden er 8. Skriv dette som funksjon i Python.</>),
                a: (<><code className="big_code">
                    areal = 8 * 8<br />
                    print("8 * 8 = ", areal)
                </code></>),
            },
            b: {
                q: (<>Lag et program som regner ut arealet av en trekant. Formelen for en trekant er<br /><code>A = L * B / 2</code><br />Returner arealet i funksjonen.</>),
                a: (<><code className="big_code">
                    {`function trekantAreal(l, b) {`}<br />
                    <span>&nbsp;&nbsp;&nbsp;{`return l * b * 0.5;`}</span><br />
                    {`}`}
                </code></>),
            },
            c: {
                q: (<>Lag et program som heter <code>areal(lengde, bredde)</code>. Denne har to input-parametre; lengde og bredde. Funksjonen skal regne ut både arealet av et rektangel og en trekant. Men du skal ikke skrive utregningen på nytt.<br />Returner arealet fra et rektangel og en trekant. Bruk valgfrie sider som lengde og bredde.</>),
                a: (<><code className="big_code">
                    {`function areal(lengde, bredde) {`}<br />
                    <span>&nbsp;&nbsp;&nbsp;{`    let areal = l * b;`}<br /></span>
                    <span>&nbsp;&nbsp;&nbsp;{`    return [areal, areal * 0.5];`}</span><br />
                    {`}`}
                </code></>),
            },
        },
    },
    {
        questionType: 'sub',
        desc: (<>Vi ønsker å lage et program der brukeren av programmet skal oppgi om man er norsk eller svensk (vi later nå som om det ikke er andre alternativer). Dette skal gjøres ved at brukeren skriver inn "n" dersom man er norsk eller "s" dersom man er svensk. Deretter skal programmet skrive enter "Du er norsk." eller "Du er svensk." ut ifra svaret til brukeren. Programmet må starte med å gi instruksjoner til brukeren.</>),
        subTasks: {
            a: {
                q: (<>Sjekk ut eksempler på input-funksjonen for python, ved å søke på nettet. Prøv å forklare hvordan det fungerer.</>),
                a: (<>Bing chilling</>),
            },
            b: {
                q: (<>Bruk IF - ELIF - ELSE setninger til å bestemme om brukeren er norsk, svensk eller dansk. Dette skal være basert på input-verdien fra input(). Dersom brukeren ikke er noen alternativer skal det printes ut dette.</>),
                a: (<>Bing chilling</>),
            },
            c: {
                q: (<>Bruk IF - ELIF - ELSE setninger til å bestemme om brukeren er norsk, svensk eller dansk. Dette skal være basert på input-verdien fra input(). Dersom brukeren ikke er noen alternativer skal det printes ut dette.</>),
                a: (<>Bing chilling</>),
            },
        },
    },
    {
        questionType: 'sup',
        q: (<>Du ber vennen din tenke på et tall mellom 0 og 50. Så gjetter du på et tall, og vennen din sier om det var rett, eller om tallet du gjettet på var for høyt eller for lavt. Så gjetter du en gang til, og vennen din sier på nytt om tallet er rett, for høyt eller for lavt.</>),
        a: () => {
            const scriptSrc = `
                const INPUT_FELT = document.getElementById('input_felt');
                const GJETT_KNAPP = document.getElementById('gjett_knapp');
                const MELDING_ELEMENT = document.getElementById('melding');
                const RESTART_KNAPP = document.getElementById('reset_knapp');
                let riktigTall;

                function gjettTall(tall) {
                    let melding;
                    if (tall === riktigTall) {
                        melding = 'Riktig tall!';
                    } else if (tall > riktigTall) {
                        melding = 'For høyt';
                    } else if (tall < riktigTall) {
                        melding = 'For lavt';
                    }
                    settMelding(melding);
                }

                function settMelding(tekst) {
                    MELDING_ELEMENT.innerText = tekst;
                }

                function startSpill() {
                    riktigTall = Math.floor(Math.random() * 51);
                    settMelding('');
                }

                RESTART_KNAPP.onclick = (e) => {
                    e.preventDefault();
                }
            `;
            return (
                <iframe>
                    <html>
                        <head>

                        </head>
                        <body>
                            <input id="input_felt" type="number" placeholder="Gjett nummer" min="0" max="50"></input>
                            <button id="gjett_knapp">Gjett</button>
                            <button id="reset_knapp">Reset</button>
                            <p id="melding"></p>
                            <script type="text/javascript">{scriptSrc}</script>
                        </body>
                    </html>
                </iframe>
            );
        },
    },
    {
        questionType: 'intro',
        desc: (<>Hvor mange ganger må du gjette før du kommer ram til rett svar? Hvordan kommer vi raskest fram til rett svar? Nedenfor er det listet opp noen fremgangsmåter.<br /><ul><li>Start på 0, og prøv ett og ett tall oppover til du får det rette.</li><li>Start på 0, og prøv hver hele tier oppover til du kommer for høyt, ta deretter ett og ett tall oppover i det aktuelle tierintervallet.</li><li>Start på 0, og prøv hvert 20-tall oppover til du kommer for høyt, ta deretter ett og ett tall i det aktuelle 20-intervallet</li><li>Start på 0, og prøv hvert 20-tall oppover til du kommer for høyt, prøv deretter tieren midt inne i 20-intervallet for til slutt å ta ett og ett tall i det rette tierintervallet.</li></ul><br />Hvilken av disse tror du er best? Deb første vil i alle fall ta lang tid.<br /><br />Det finnes en systematisk metode å gjette deg fram til rett svar på som vil være raskest i de fleste tilfeller. Dersom den blir brukt i programmet ovenfor, vil det kunne se slik ut når øvre grense for tall er 50:<br /><table><tbody>
            <tr><th>Gjetting nr.</th><th>Gjetting</th><th>Resultat</th></tr>
            <tr><td>1</td><td>25</td><td>Tallet du skrev inn er for høyt.</td></tr>
            <tr><td>2</td><td>12</td><td>Tallet du skrev inn er for lavt.</td></tr>
            <tr><td>3</td><td>18</td><td>Tallet du skrev inn er for lavt.</td></tr>
            <tr><td>4</td><td>22</td><td>Tallet du skrev inn er for høyt.</td></tr>
            <tr><td>5</td><td>20</td><td>Tallet du skrev inn er for høyt.</td></tr>
            <tr><td>6</td><td>19</td><td>Du gjettet helt rett!</td></tr>
        </tbody></table></>),
    },
];

const mainContent = tasks.map((task, i) => {
    return <SupTask key={i} i={i} task={task} />;
});

function App() {
    return (
        <div className="App">
            <header className="App-header">
                {mainContent}
            </header>
        </div>
    );
}

export default App;