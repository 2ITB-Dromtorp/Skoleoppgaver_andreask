import './index.css';

import { useEffect, useRef, useState } from 'react';

function getAdditionalClassName(className) {
    if (className) {
        return ` ${className}`;
    } else {
        return '';
    }
}

function QuizPage({ children, assignRef, className, ...props }) {
    const pageRef = useRef();
    if (assignRef) {
        assignRef(pageRef);
    }
    return (
        <div className={`quiz_page${getAdditionalClassName(className)}`} {...props}>
            <div ref={pageRef} className='quiz_page_content'>
                {children}
            </div>
        </div>
    );
}

function Quiz({ questions }) {
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [answers, setAnswers] = useState([]);
    const [curQuestionId, setCurQuestionId] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [prevCurQuestionId, setPrevCurQuestionId] = useState(0);
    const [prevIsFinished, setPrevIsFinished] = useState(false);
    const [curFinishedPage, setCurFinishedPage] = useState();
    const pageRefs = useRef([]);
    const pagesContainerRef = useRef();
    const finishPageRef = useRef();
    const curQuestion = questions[curQuestionId];

    const getPageId = () => isFinished ? questions.length : curQuestionId;

    const getPageRef = () => isFinished ? finishPageRef.current : pageRefs.current[curQuestionId];

    useEffect(() => {
        setIsFirstRender(false);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurFinishedPage(getPageId());
        }, 400);
        return () => clearTimeout(timeout);
    }, [isFinished, curQuestionId]);

    const nextQuestion = () => {
        setPrevCurQuestionId(curQuestionId);
        setPrevIsFinished(isFinished);
        if (curQuestionId === questions.length - 1) {
            setIsFinished(true);
        } else {
            setCurQuestionId(curQuestionId + 1);
        }
    }

    const prevQuestion = () => {
        if (isFinished) {
            setIsFinished(false);
        } else {
            setCurQuestionId(Math.max(curQuestionId - 1, 0));
        }
    }

    let correctAnswers = questions.map(question => {
        const found = answers.find(answer => answer.id === question.id)
        if (found) {
            return question.answers.filter(answer => answer.correct === true).find(answer => answer.id === found.answerId) !== undefined;
        } else {
            return false;
        }
    }).filter(answer => answer).length;

    const questionsContent = questions.map((question) => {
        return (
            <QuizPage key={question.id} className='quiz_question' assignRef={(ref) => {
                pageRefs.current[question.id] = ref;
            }}>
                <div id='quiz_question_question'>
                    {question.question}
                </div>
                <div id='quiz_question_answers_container'>
                    <div id='quiz_question_answers'>
                        {question.answers.map((answer) => {
                            return (
                                <button
                                    key={answer.id}
                                    className='quiz_question_answer fancy_button'
                                    onClick={() => {
                                        let newAnswer = answers.find(cAnswer => cAnswer.id === curQuestionId);
                                        const hasExistingAnswer = newAnswer !== undefined;
                                        if (hasExistingAnswer === false) {
                                            newAnswer = {
                                                "id": curQuestionId,
                                            };
                                        }
                                        newAnswer.answerId = answer.id;
                                        if (hasExistingAnswer) {
                                            setAnswers(answers.map(cAnswer => {
                                                if (cAnswer.id === curQuestionId) {
                                                    return newAnswer;
                                                } else {
                                                    return cAnswer;
                                                }
                                            }));
                                        } else {
                                            setAnswers([...answers, newAnswer]);
                                        }

                                        nextQuestion();
                                    }}>
                                    {answer.answer}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </QuizPage>
        );
    });

    /*
    const curNextPage = pageRefs.current[getPageId()]
    if (curNextPage) {
        curNextPage.current.style.height = 'auto';
    }
    */

    const curPage = getPageRef();
    let curPageHeight = 0;
    if (curPage) {
        curPage.current.style['max-height'] = 'none';
        curPage.current.style['height'] = 'auto';
        curPageHeight = curPage.current.offsetHeight;
        curPage.current.style['max-height'] = '';
        curPage.current.style['height'] = '';
    }


    return (
        <div id='quiz_container'>
            <h1 id='quiz_title'>
                Quiz om Web utvikling
            </h1>
            <div id='quiz_content_container'>
                <div ref={pagesContainerRef} id='quiz_content' style={{
                    '--target-height': `${curPageHeight}px`,
                }}>
                    <div id='quiz_pages' style={{
                        '--quiz-page': `${getPageId()}`,
                    }}>
                        {questionsContent}
                        <QuizPage key='finish' id='quiz_result' className='quiz_page' assignRef={(ref) => {
                            finishPageRef.current = ref;
                        }}>
                            <div id='quiz_result_text'>
                                Du fikk {correctAnswers} av {questions.length} poeng.
                            </div>
                            <div id='quiz_result_progress'>
                                <div id='quiz_result_progress_bar' className={`${curFinishedPage === questions.length ? 'quiz_result_progress_bar_animate' : ''}`} style={{ '--quiz-result-progress': `${(correctAnswers / questions.length) * 100}%` }}>

                                </div>
                            </div>
                            <button className='fancy_button'>
                                Start på nytt
                            </button>
                        </QuizPage>
                    </div>
                </div>
            </div>
            <div id='quiz_nav'>
                <button className='fancy_button' onClick={() => {
                    prevQuestion();
                }}>
                    Forrige
                </button>
                <div id='quiz_nav_progress_text'>
                    {curQuestionId + 1}/{questions.length}
                </div>
                <button className='fancy_button' onClick={() => {
                    nextQuestion();
                }}>
                    Neste
                </button>
            </div>
        </div >
    )
}

export default function Index() {
    return (
        <div id='main_quiz_container'>
            <Quiz questions={[
                {
                    "id": 0,
                    "question": 'Hva er en funksjon?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'En algoritme',
                            "correct": false,
                        },
                        {
                            "id": 1,
                            "answer": 'En kode som brukes i algoritme',
                            "correct": false,
                        },
                        {
                            "id": 2,
                            "answer": 'En gjenbrukbar algoritme',
                            "correct": true,
                        },
                    ],
                },
                {
                    "id": 1,
                    "question": 'Hvilket kodespråk brukes for å gi en nettside funksjonalitet?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'Python',
                            "correct": false,
                        },
                        {
                            "id": 1,
                            "answer": 'C++',
                            "correct": false,
                        },
                        {
                            "id": 2,
                            "answer": 'C#',
                            "correct": false,
                        },
                        {
                            "id": 3,
                            "answer": 'JavaScript',
                            "correct": true,
                        },
                    ],
                },
                {
                    "id": 2,
                    "question": 'Hvilket kodespråk brukes for å gi en nettside utseende?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'HTML',
                            "correct": false,
                        },
                        {
                            "id": 1,
                            "answer": 'CSS',
                            "correct": true,
                        },
                        {
                            "id": 2,
                            "answer": 'style',
                            "correct": false,
                        },
                    ],
                },
                {
                    "id": 3,
                    "question": 'Hva bruker vi for å definere innhold på en nettside?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'JavaScript',
                            "correct": false,
                        },
                        {
                            "id": 1,
                            "answer": 'CSS',
                            "correct": false,
                        },
                        {
                            "id": 2,
                            "answer": 'HTML',
                            "correct": true,
                        },
                    ],
                },
                {
                    "id": 4,
                    "question": 'Hva står CSS for?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'Cool Style Sheets',
                            "correct": false,
                        },
                        {
                            "id": 1,
                            "answer": 'Cascading Style Stuff',
                            "correct": false,
                        },
                        {
                            "id": 2,
                            "answer": 'Cascading Style Sheets',
                            "correct": true,
                        },
                    ],
                },
                {
                    "id": 5,
                    "question": 'Hva står HTML for?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'HyperText Markup Lore',
                            "correct": false,
                        },
                        {
                            "id": 1,
                            "answer": 'HyperText Markup Language',
                            "correct": true,
                        },
                        {
                            "id": 2,
                            "answer": 'How To Make Link',
                            "correct": false,
                        },
                    ],
                },
                {
                    "id": 6,
                    "question": 'Hva skal hjemmesiden til en nettside hete?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'front_page.html',
                            "correct": false,
                        },
                        {
                            "id": 1,
                            "answer": 'Index.html',
                            "correct": false,
                        },
                        {
                            "id": 2,
                            "answer": 'index.html',
                            "correct": true,
                        },
                    ],
                },
                {
                    "id": 7,
                    "question": 'Hvilken versjon av CSS bruker vi?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": '1',
                            "correct": false,
                        },
                        {
                            "id": 1,
                            "answer": '2',
                            "correct": false,
                        },
                        {
                            "id": 2,
                            "answer": '3',
                            "correct": true,
                        },
                        {
                            "id": 3,
                            "answer": '4',
                            "correct": false,
                        },
                        {
                            "id": 4,
                            "answer": '5',
                            "correct": false,
                        },
                        {
                            "id": 5,
                            "answer": '6',
                            "correct": false,
                        },
                    ],
                },
                {
                    "id": 8,
                    "question": 'Hva er en loop i kode?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'En algoritme som kan gjenbrukes',
                            "correct": false,
                        },
                        {
                            "id": 1,
                            "answer": 'En algoritme som gjentar seg',
                            "correct": true,
                        },
                    ],
                },
                {
                    "id": 9,
                    "question": 'Hva er object datatypen i JavaScript?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'En verdi som har "key" "value" verdier som ligner en array.',
                            "correct": false,
                        },
                        {
                            "id": 1,
                            "answer": 'En liste med verdier.',
                            "correct": false,
                        },
                        {
                            "id": 2,
                            "answer": 'En foranderlig verdi som inneholder andre verdier.',
                            "correct": true,
                        },
                    ],
                },
                {
                    "id": 10,
                    "question": 'Hva betyr NaN?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'Not A Number',
                            "correct": true,
                        },
                        {
                            "id": 1,
                            "answer": 'Non Applicable Number',
                            "correct": false,
                        },
                        {
                            "id": 2,
                            "answer": 'Not Any Number',
                            "correct": false,
                        },
                    ],
                },
                {
                    "id": 11,
                    "question": 'Hva er en vanlig måte å lagre brukerdata på nettleseren?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'LocalStorage',
                            "correct": false,
                        },
                        {
                            "id": 1,
                            "answer": 'Cookies',
                            "correct": true,
                        },
                    ],
                },
                {
                    "id": 12,
                    "question": 'Hva er en API (Application Programming Interface) i webutvikling?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'En måte for ulike programmer å kommunisere med hverandre.',
                            "correct": true,
                        },
                        {
                            "id": 1,
                            "answer": 'Et verktøy for å lage responsive nettsider.',
                            "correct": false,
                        },
                        {
                            "id": 2,
                            "answer": 'En protokoll for å kryptere data som sendes over Internett.',
                            "correct": false,
                        },
                        {
                            "id": 3,
                            "answer": 'En CSS-teknikk for å style tekst.',
                            "correct": false,
                        },
                    ],
                },
                {
                    "id": 13,
                    "question": 'Hva er et vanlig filformat for bilder på nettet?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'PNG',
                            "correct": true,
                        },
                        {
                            "id": 1,
                            "answer": 'GIF',
                            "correct": false,
                        },
                    ],
                },
                {
                    "id": 14,
                    "question": 'Hva er forskjellen mellom frontend og backend i webutvikling?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'Frontend er ansvarlig for å administrere databaser, mens backend håndterer brukergrensesnittet.',
                            "correct": false,
                        },
                        {
                            "id": 1,
                            "answer": 'Frontend og backend er synonyme begreper.',
                            "correct": false,
                        },
                        {
                            "id": 2,
                            "answer": 'Frontend refererer til det som vises for brukeren i nettleseren, mens backend håndterer serverlogikk og databehandling.',
                            "correct": true,
                        },
                    ],
                },
                {
                    "id": 15,
                    "question": 'Hva er forskjellen mellom HTTP og HTTPS?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'HTTP er raskere enn HTTPS.',
                            "correct": false,
                        },
                        {
                            "id": 1,
                            "answer": 'HTTPS bruker kryptering for å sikre dataoverføringen, mens HTTP ikke gjør det.',
                            "correct": true,
                        },
                        {
                            "id": 2,
                            "answer": 'HTTPS krever ingen sertifikater for å fungere, mens HTTP gjør det.',
                            "correct": false,
                        },
                        {
                            "id": 3,
                            "answer": 'HTTP fungerer bare for statiske nettsider, mens HTTPS fungerer for dynamiske nettsider.',
                            "correct": false,
                        },
                    ],
                },
                {
                    "id": 16,
                    "question": 'Hva er en "content management system" (CMS) i webutvikling?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'Et bibliotek med forhåndsdefinerte CSS-stiler for å akselerere webdesignprosessen.',
                            "correct": false,
                        },
                        {
                            "id": 1,
                            "answer": 'En protokoll for å sikre dataoverføringen mellom server og klient.',
                            "correct": false,
                        },
                        {
                            "id": 2,
                            "answer": 'En programvare som lar brukere opprette, administrere og publisere innhold på nettet, ofte uten behov for avansert teknisk kunnskap.',
                            "correct": true,
                        },
                        {
                            "id": 3,
                            "answer": 'Et verktøy for å administrere databaser på serveren.',
                            "correct": false,
                        },
                    ],
                },
                {
                    "id": 17,
                    "question": 'Hva er en "favicon" i forbindelse med webutvikling?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'Et eget ikon for favorittnettsteder',
                            "correct": false,
                        },
                        {
                            "id": 1,
                            "answer": 'En type plugin for å optimalisere bilder på nettsider.',
                            "correct": false,
                        },
                        {
                            "id": 2,
                            "answer": 'En form for JavaScript-bibliotek for å lage animerte ikoner.',
                            "correct": false,
                        },
                        {
                            "id": 3,
                            "answer": 'En spesiell type CSS-regel for å style tekst med ikoner.',
                            "correct": false,
                        },
                        {
                            "id": 4,
                            "answer": 'Et lite ikon som vises i nettlesertabben og bokmerker for å identifisere en nettside.',
                            "correct": true,
                        },
                    ],
                },
                {
                    "id": 18,
                    "question": 'Hva er "version control" i webutvikling?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'En type database for å lagre bilder og andre mediefiler på nettet.',
                            "correct": false,
                        },
                        {
                            "id": 1,
                            "answer": 'En protokoll for å sikre overføringen av kodedata over Internett.',
                            "correct": false,
                        },
                        {
                            "id": 2,
                            "answer": 'Et system for å spore endringer i koden over tid og muliggjøre samarbeid mellom utviklere.',
                            "correct": true,
                        },
                        {
                            "id": 3,
                            "answer": 'En metode for å versjonere HTML-dokumenter for ulike enheter.',
                            "correct": false,
                        },
                    ],
                },
                {
                    "id": 19,
                    "question": 'Hva er et "frontend framework" i webutvikling?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'En serverkonfigurasjon for å håndtere nettverkstrafikk.',
                            "correct": false,
                        },
                        {
                            "id": 1,
                            "answer": 'En samling av forhåndsdefinerte kodeelementer og strukturer for å akselerere utviklingen av brukergrensesnitt.',
                            "correct": true,
                        },
                        {
                            "id": 2,
                            "answer": 'Et verktøy for å administrere backend-logikk.',
                            "correct": false,
                        },
                        {
                            "id": 3,
                            "answer": 'En type JavaScript-bibliotek for å lage animerte grensesnitt.',
                            "correct": false,
                        },
                    ],
                },
                {
                    "id": 20,
                    "question": 'Hva er en "cookie" i webutvikling?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'En type server-side kodesnutt for å håndtere brukerinput på nettsider.',
                            "correct": false,
                        },
                        {
                            "id": 1,
                            "answer": 'En form for kryptering som brukes til å sikre dataoverføringen mellom klient og server.',
                            "correct": false,
                        },
                        {
                            "id": 2,
                            "answer": 'En liten tekstfil som lagres på brukerens datamaskin og brukes til å lagre informasjon om brukerens handlinger og preferanser på en nettside.',
                            "correct": true,
                        },
                        {
                            "id": 3,
                            "answer": 'En metode for å validere skjemaer på klientsiden.',
                            "correct": false,
                        },
                    ],
                },
                {
                    "id": 21,
                    "question": 'Hva er en "RESTful API"?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'En databasearkitektur for å lagre og administrere brukerdata.',
                            "correct": false,
                        },
                        {
                            "id": 1,
                            "answer": 'En metode for å implementere dynamiske effekter på nettsider ved hjelp av JavaScript.',
                            "correct": false,
                        },
                        {
                            "id": 2,
                            "answer": 'En type protokoll for å kryptere dataoverføringen mellom klient og server.',
                            "correct": false,
                        },
                        {
                            "id": 3,
                            "answer": 'Et grensesnitt for å kommunisere med serveren ved hjelp av HTTP-protokollen, og som følger REST-prinsippene for arkitektur.',
                            "correct": true,
                        },
                    ],
                },
                {
                    "id": 22,
                    "question": 'Hva står HTML for?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'Hyper Text Markup Language',
                            "correct": true,
                        },
                        {
                            "id": 1,
                            "answer": 'Hyperlinks and Text Markup Language',
                            "correct": false,
                        },
                        {
                            "id": 2,
                            "answer": 'Home Tool Markup Language',
                            "correct": false,
                        },
                    ],
                },
                {
                    "id": 23,
                    "question": 'Hva er CSS?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'Cascading Style Sheets',
                            "correct": true,
                        },
                        {
                            "id": 1,
                            "answer": 'Creative Style Sheets',
                            "correct": false,
                        },
                        {
                            "id": 2,
                            "answer": 'Computer Style Sheets',
                            "correct": false,
                        },
                    ],
                },
                {
                    "id": 24,
                    "question": 'Hva brukes JavaScript primært til i webutvikling?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'Å style nettsider',
                            "correct": false,
                        },
                        {
                            "id": 1,
                            "answer": 'Å legge til interaktivitet',
                            "correct": true,
                        },
                        {
                            "id": 2,
                            "answer": 'Å definere strukturen til nettsider',
                            "correct": false,
                        },
                    ],
                },
                {
                    "id": 25,
                    "question": 'Hva er en vanlig form for databasespråk brukt i webutvikling?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'SQL',
                            "correct": true,
                        },
                        {
                            "id": 1,
                            "answer": 'NoSQL',
                            "correct": false,
                        },
                        {
                            "id": 2,
                            "answer": 'Python',
                            "correct": false,
                        },
                    ],
                },
                {
                    "id": 26,
                    "question": 'Hva står HTTP for?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'HyperText Transfer Protocol',
                            "correct": true,
                        },
                        {
                            "id": 1,
                            "answer": 'HyperText Transmission Protocol',
                            "correct": false,
                        },
                        {
                            "id": 2,
                            "answer": 'HyperText Transfer Process',
                            "correct": false,
                        },
                    ],
                },
                {
                    "id": 27,
                    "question": 'Hva er en vanlig måte å definere stil på nettstedet ditt?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'HTML',
                            "correct": false,
                        },
                        {
                            "id": 1,
                            "answer": 'CSS',
                            "correct": true,
                        },
                        {
                            "id": 2,
                            "answer": 'JavaScript',
                            "correct": false,
                        },
                    ],
                },
                {
                    "id": 28,
                    "question": 'Hva er en vanlig frontend-rammeverk?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'React',
                            "correct": true,
                        },
                        {
                            "id": 1,
                            "answer": 'Django',
                            "correct": false,
                        },
                        {
                            "id": 2,
                            "answer": 'Flask',
                            "correct": false,
                        },
                    ],
                },
                {
                    "id": 29,
                    "question": 'Hva er en vanlig backend-rammeverk?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'Express.js',
                            "correct": true,
                        },
                        {
                            "id": 1,
                            "answer": 'Angular.js',
                            "correct": false,
                        },
                        {
                            "id": 2,
                            "answer": 'Vue.js',
                            "correct": false,
                        },
                    ],
                },
                {
                    "id": 30,
                    "question": 'Hva er en vanlig form for asynkron kommunikasjon i webutvikling?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'Promises',
                            "correct": true,
                        },
                        {
                            "id": 1,
                            "answer": 'Callbacks',
                            "correct": false,
                        },
                        {
                            "id": 2,
                            "answer": 'Threads',
                            "correct": false,
                        },
                    ],
                },
                {
                    "id": 31,
                    "question": 'Hva er en vanlig måte å lagre data på klientens side i webutvikling?',
                    "answers": [
                        {
                            "id": 0,
                            "answer": 'LocalStorage',
                            "correct": true,
                        },
                        {
                            "id": 1,
                            "answer": 'SessionStorage',
                            "correct": false,
                        },
                        {
                            "id": 2,
                            "answer": 'Cookies',
                            "correct": false,
                        },
                    ],
                },
                {
                    "id": 32,
                    "question": "Hva er en fordel med responsivt webdesign?",
                    "answers": [
                        { "id": 0, "answer": "Bedre ytelse", "correct": false },
                        { "id": 1, "answer": "Mer arbeid", "correct": false },
                        { "id": 2, "answer": "Bedre brukeropplevelse", "correct": true },
                        { "id": 3, "answer": "Mindre fleksibilitet", "correct": false }
                    ]
                },
                {
                    "id": 33,
                    "question": "Hvilket element brukes til å gruppere sammen HTML-elementer?",
                    "answers": [
                        { "id": 0, "answer": "<div>", "correct": true },
                        { "id": 1, "answer": "<section>", "correct": false },
                        { "id": 2, "answer": "<p>", "correct": false },
                        { "id": 3, "answer": "<span>", "correct": false }
                    ]
                },
                {
                    "id": 34,
                    "question": 'Hva er en "landmark" i webutvikling?',
                    "answers": [
                        { "id": 0, "answer": "En viktig historisk nettside", "correct": false },
                        { "id": 1, "answer": "Et kjent landemerke på internett", "correct": false },
                        { "id": 2, "answer": "En HTML-tag som identifiserer viktige deler av en nettside for tilgjengelighet", "correct": true }
                    ]
                },
                {
                    "id": 35,
                    "question": "Hva er en database?",
                    "answers": [
                        { "id": 0, "answer": "Et strukturert sett med data", "correct": true },
                        { "id": 1, "answer": "En type nettleser", "correct": false },
                        { "id": 2, "answer": "Et program for å lage nettsider", "correct": false }
                    ]
                },
                {
                    "id": 36,
                    "question": "Hva er ikke et gyldig fargeformat i CSS?",
                    "answers": [
                        { "id": 0, "answer": "#123456", "correct": false },
                        { "id": 1, "answer": "rgb(255, 255, 255)", "correct": false },
                        { "id": 2, "answer": "hsl(360, 100%, 100%)", "correct": false },
                        { "id": 3, "answer": "hexadecimal(123, 45, 67)", "correct": true }
                    ]
                },
                {
                    "id": 37,
                    "question": "Hva er ikke en gyldig metode i HTTP?",
                    "answers": [
                        { "id": 0, "answer": "GET", "correct": false },
                        { "id": 1, "answer": "PULL", "correct": true },
                        { "id": 2, "answer": "POST", "correct": false },
                        { "id": 3, "answer": "PUT", "correct": false }
                    ]
                },
                {
                    "id": 38,
                    "question": "Hva er ikke en gyldig måte å inkludere CSS på i HTML?",
                    "answers": [
                        { "id": 0, "answer": "External Style Sheet", "correct": false },
                        { "id": 1, "answer": "Internal Style Sheet", "correct": false },
                        { "id": 2, "answer": "Inline Style", "correct": false },
                        { "id": 3, "answer": "Interactive Style Sheet", "correct": true }
                    ]
                },
                {
                    "id": 39,
                    "question": "Hvilket av følgende er ikke en gyldig type datatypes i JavaScript?",
                    "answers": [
                        { "id": 0, "answer": "boolean", "correct": false },
                        { "id": 1, "answer": "string", "correct": false },
                        { "id": 2, "answer": "tuple", "correct": true },
                        { "id": 3, "answer": "number", "correct": false }
                    ]
                },
                {
                    "id": 40,
                    "question": "Hva er ikke en gyldig attributt i en <img> tag i HTML?",
                    "answers": [
                        { "id": 0, "answer": "src", "correct": false },
                        { "id": 1, "answer": "alt", "correct": false },
                        { "id": 2, "answer": "title", "correct": false },
                        { "id": 3, "answer": "value", "correct": true }
                    ]
                },
                {
                    "id": 41,
                    "question": "Hva er ikke en gyldig attributt i en <a> tag i HTML?",
                    "answers": [
                        { "id": 0, "answer": "href", "correct": false },
                        { "id": 1, "answer": "title", "correct": false },
                        { "id": 2, "answer": "alt", "correct": true },
                        { "id": 3, "answer": "target", "correct": false }
                    ]
                },
                {
                    "id": 42,
                    "question": "Hva er ikke en gyldig måte å definere en funksjon i JavaScript?",
                    "answers": [
                        { "id": 0, "answer": "function myFunction() {}", "correct": false },
                        { "id": 1, "answer": "let myFunction = function() {}", "correct": false },
                        { "id": 2, "answer": "const myFunction = () => {}", "correct": false },
                        { "id": 3, "answer": "myFunction = {}", "correct": true }
                    ]
                },
                {
                    "id": 43,
                    "question": "Hva er ikke en gyldig selektor i CSS?",
                    "answers": [
                        { "id": 0, "answer": ".myClass", "correct": false },
                        { "id": 1, "answer": "#myId", "correct": false },
                        { "id": 2, "answer": "$myElement", "correct": true },
                        { "id": 3, "answer": "element", "correct": false }
                    ]
                },
                {
                    "id": 44,
                    "question": "Hva er ikke en gyldig datatype i JSON?",
                    "answers": [
                        { "id": 0, "answer": "string", "correct": false },
                        { "id": 1, "answer": "boolean", "correct": false },
                        { "id": 2, "answer": "date", "correct": true },
                        { "id": 3, "answer": "number", "correct": false }
                    ]
                },
                {
                    "id": 45,
                    "question": "Hvilket av følgende er ikke et gyldig HTML-element for skjemafelt?",
                    "answers": [
                        { "id": 0, "answer": "<input>", "correct": false },
                        { "id": 1, "answer": "<text>", "correct": true },
                        { "id": 2, "answer": "<select>", "correct": false },
                        { "id": 3, "answer": "<textarea>", "correct": false }
                    ]
                },
                {
                    "id": 46,
                    "question": "Hva er ikke et gyldig attributt i en <form> tag i HTML?",
                    "answers": [
                        { "id": 0, "answer": "action", "correct": false },
                        { "id": 1, "answer": "method", "correct": false },
                        { "id": 2, "answer": "route", "correct": true },
                        { "id": 3, "answer": "enctype", "correct": false }
                    ]
                },
                {
                    "id": 47,
                    "question": "Hva er ikke en gyldig HTTP-statuskode?",
                    "answers": [
                        { "id": 0, "answer": "404", "correct": false },
                        { "id": 1, "answer": "202", "correct": false },
                        { "id": 2, "answer": "505", "correct": false },
                        { "id": 3, "answer": "2001", "correct": true }
                    ]
                },
                {
                    "id": 48,
                    "question": "Hva er ikke en gyldig type med CSS-enheter?",
                    "answers": [
                        { "id": 0, "answer": "px", "correct": false },
                        { "id": 1, "answer": "em", "correct": false },
                        { "id": 2, "answer": "rem", "correct": false },
                        { "id": 3, "answer": "kg", "correct": true }
                    ]
                },
                {
                    "id": 49,
                    "question": "Hva er den riktige måten å inkludere ekstern JavaScript på i HTML?",
                    "answers": [
                        { "id": 0, "answer": "<program src='script.js'></script>", "program": false },
                        { "id": 1, "answer": "<javascript src='script.js'></javascript>", "correct": false },
                        { "id": 2, "answer": "<script src='https://example.com/script.js'></script>", "correct": true },
                        { "id": 3, "answer": "<code src='script.js'></code>", "correct": false }
                    ]
                },
                {
                    "id": 50,
                    "question": "Hva er ikke en gyldig CSS-pseudo-klasse?",
                    "answers": [
                        { "id": 0, "answer": ":hover", "correct": false },
                        { "id": 1, "answer": ":active", "correct": false },
                        { "id": 2, "answer": ":current", "correct": true },
                        { "id": 3, "answer": ":focus", "correct": false }
                    ]
                },
                {
                    "id": 51,
                    "question": "Hva er ikke en gyldig type med CSS-enheter?",
                    "answers": [
                        { "id": 0, "answer": "px", "correct": false },
                        { "id": 1, "answer": "em", "correct": false },
                        { "id": 2, "answer": "rem", "correct": false },
                        { "id": 3, "answer": "kg", "correct": true }
                    ]
                },
                {
                    "id": 52,
                    "question": "Hva er ikke en gyldig HTML5-seksjon?",
                    "answers": [
                        { "id": 0, "answer": "<footer>", "correct": false },
                        { "id": 1, "answer": "<section>", "correct": false },
                        { "id": 2, "answer": "<side>", "correct": true },
                        { "id": 3, "answer": "<aside>", "correct": false }
                    ]
                },
                {
                    "id": 53,
                    "question": "Hva er ikke en gyldig CSS-pseudo-klasse?",
                    "answers": [
                        { "id": 0, "answer": ":hover", "correct": false },
                        { "id": 1, "answer": ":active", "correct": false },
                        { "id": 2, "answer": ":current", "correct": true },
                        { "id": 3, "answer": ":focus", "correct": false }
                    ]
                },
                {
                    "id": 54,
                    "question": "Hvilket av følgende er ikke en gyldig HTTP-metode?",
                    "answers": [
                        { "id": 0, "answer": "GET", "correct": false },
                        { "id": 1, "answer": "DELETE", "correct": false },
                        { "id": 2, "answer": "SEND", "correct": true },
                        { "id": 3, "answer": "PATCH", "correct": false }
                    ]
                },
                {
                    "id": 55,
                    "question": "Hva er ikke en gyldig HTML-element for å lage en lenke?",
                    "answers": [
                        { "id": 0, "answer": "<a>", "correct": false },
                        { "id": 1, "answer": "<link>", "correct": true },
                        { "id": 2, "answer": "<href>", "correct": false },
                        { "id": 3, "answer": "<url>", "correct": false }
                    ]
                },
                {
                    "id": 56,
                    "question": "Hva brukes CSS-mediespørringer til?",
                    "answers": [
                        { "id": 0, "answer": "For å koble til ekstern CSS", "correct": false },
                        { "id": 1, "answer": "For å lage animasjoner", "correct": false },
                        { "id": 2, "answer": "For å endre stilen basert på enhetsegenskaper", "correct": true },
                        { "id": 3, "answer": "For å lage interaktivt innhold", "correct": false }
                    ]
                },
                {
                    "id": 57,
                    "question": "Hva er ikke en gyldig HTML5-element?",
                    "answers": [
                        { "id": 0, "answer": "<nav>", "correct": false },
                        { "id": 1, "answer": "<header>", "correct": false },
                        { "id": 2, "answer": "<article>", "correct": false },
                        { "id": 3, "answer": "<frame>", "correct": true }
                    ]
                },
                {
                    "id": 58,
                    "question": "Hva er ikke en gyldig tilstand for en promise i JavaScript?",
                    "answers": [
                        { "id": 0, "answer": "Pending", "correct": false },
                        { "id": 1, "answer": "Complete", "correct": true },
                        { "id": 2, "answer": "Fulfilled", "correct": false },
                        { "id": 3, "answer": "Rejected", "correct": false }
                    ]
                },
                {
                    "id": 59,
                    "question": "Hva er ikke en gyldig type variabeldeklarasjon i JavaScript?",
                    "answers": [
                        { "id": 0, "answer": "var", "correct": false },
                        { "id": 1, "answer": "let", "correct": false },
                        { "id": 2, "answer": "const", "correct": false },
                        { "id": 3, "answer": "def", "correct": true }
                    ]
                },
                {
                    "id": 60,
                    "question": "Hva er ikke en gyldig HTML-attributt for å sette en tekstfeltverdi?",
                    "answers": [
                        { "id": 0, "answer": "value", "correct": false },
                        { "id": 1, "answer": "text", "correct": true },
                        { "id": 2, "answer": "placeholder", "correct": false },
                        { "id": 3, "answer": "innerHTML", "correct": false }
                    ]
                },
                {
                    "id": 61,
                    "question": "Hvilket av følgende er ikke en JavaScript-arrangementhåndterer?",
                    "answers": [
                        { "id": 0, "answer": "onclick", "correct": false },
                        { "id": 1, "answer": "onhover", "correct": true },
                        { "id": 2, "answer": "onchange", "correct": false },
                        { "id": 3, "answer": "onsubmit", "correct": false }
                    ]
                },
                {
                    "id": 62,
                    "question": "Hva er ikke en gyldig formateringsenhet i CSS?",
                    "answers": [
                        { "id": 0, "answer": "vh", "correct": false },
                        { "id": 1, "answer": "vw", "correct": false },
                        { "id": 2, "answer": "vm", "correct": true },
                        { "id": 3, "answer": "vmin", "correct": false }
                    ]
                },
                {
                    "id": 63,
                    "question": "Hva er ikke en gyldig måte å inkludere CSS på i HTML?",
                    "answers": [
                        { "id": 0, "answer": "Ekstern stilark", "correct": false },
                        { "id": 1, "answer": "Intern stil", "correct": false },
                        { "id": 2, "answer": "In-Line stil", "correct": false },
                        { "id": 3, "answer": "Interactive Style Sheet", "correct": true }
                    ]
                },
                {
                    "id": 64,
                    "question": "Hva er ikke en gyldig CSS-property?",
                    "answers": [
                        { "id": 0, "answer": "color", "correct": false },
                        { "id": 1, "answer": "background", "correct": false },
                        { "id": 2, "answer": "image", "correct": true },
                        { "id": 3, "answer": "font-size", "correct": false }
                    ]
                },
                {
                    "id": 65,
                    "question": "Hva representerer 'DOM' i webutvikling?",
                    "answers": [
                        { "id": 0, "answer": "Document Object Model", "correct": true },
                        { "id": 1, "answer": "Dynamic Order Management", "correct": false },
                        { "id": 2, "answer": "Data Object Model", "correct": false },
                        { "id": 3, "answer": "Direct Object Manipulation", "correct": false }
                    ]
                },
                {
                    "id": 66,
                    "question": "Hva er ikke en gyldig skriftstørrelse i CSS?",
                    "answers": [
                        { "id": 0, "answer": "small", "correct": false },
                        { "id": 1, "answer": "medium", "correct": false },
                        { "id": 2, "answer": "huge", "correct": true },
                        { "id": 3, "answer": "large", "correct": false }
                    ]
                },
                {
                    "id": 67,
                    "question": "Hva er ikke en gyldig enhet for skriftstørrelse i CSS?",
                    "answers": [
                        { "id": 0, "answer": "px", "correct": false },
                        { "id": 1, "answer": "pt", "correct": false },
                        { "id": 2, "answer": "in", "correct": false },
                        { "id": 3, "answer": "sp", "correct": true }
                    ]
                },
                {
                    "id": 68,
                    "question": "Hva er ikke en gyldig HTML5-tag for semantisk struktur?",
                    "answers": [
                        { "id": 0, "answer": "<header>", "correct": false },
                        { "id": 1, "answer": "<article>", "correct": false },
                        { "id": 2, "answer": "<section>", "correct": false },
                        { "id": 3, "answer": "<format>", "correct": true }
                    ]
                },
                {
                    "id": 69,
                    "question": "Hvilket av følgende er ikke en gyldig type verdier i CSS 'display' -egenskapen?",
                    "answers": [
                        { "id": 0, "answer": "block", "correct": false },
                        { "id": 1, "answer": "inline", "correct": false },
                        { "id": 2, "answer": "floating", "correct": true },
                        { "id": 3, "answer": "inline-block", "correct": false }
                    ]
                },
                {
                    "id": 70,
                    "question": "Hva er ikke en gyldig attributt for en <video> -tag i HTML?",
                    "answers": [
                        { "id": 0, "answer": "src", "correct": false },
                        { "id": 1, "answer": "autoplay", "correct": false },
                        { "id": 2, "answer": "loop", "correct": false },
                        { "id": 3, "answer": "file", "correct": true }
                    ]
                },
                {
                    "id": 71,
                    "question": "Hva representerer 'URL' i webutvikling?",
                    "answers": [
                        { "id": 0, "answer": "Uniform Resource Locator", "correct": true },
                        { "id": 1, "answer": "Unified Resource Link", "correct": false },
                        { "id": 2, "answer": "Universal Resource Location", "correct": false },
                        { "id": 3, "answer": "Uniformed Resource Link", "correct": false }
                    ]
                },
                {
                    "id": 72,
                    "question": "Hva er ikke en gyldig metode i JavaScript 'Array' -objektet?",
                    "answers": [
                        { "id": 0, "answer": "concat()", "correct": false },
                        { "id": 1, "answer": "push()", "correct": false },
                        { "id": 2, "answer": "add()", "correct": true },
                        { "id": 3, "answer": "splice()", "correct": false }
                    ]
                },
                {
                    "id": 73,
                    "question": "Hva representerer 'XHR' i webutvikling?",
                    "answers": [
                        { "id": 0, "answer": "XML HttpRequest", "correct": true },
                        { "id": 1, "answer": "XHTML Request", "correct": false },
                        { "id": 2, "answer": "XAMPP Hosting Request", "correct": false },
                        { "id": 3, "answer": "XSS Header Request", "correct": false }
                    ]
                },
                {
                    "id": 74,
                    "question": "Hva er ikke en gyldig CSS-property i CSS 'flexbox'?",
                    "answers": [
                        { "id": 0, "answer": "flex-direction", "correct": false },
                        { "id": 1, "answer": "justify-content", "correct": false },
                        { "id": 2, "answer": "align-items", "correct": false },
                        { "id": 3, "answer": "display-mode", "correct": true }
                    ]
                },
                {
                    "id": 75,
                    "question": "Hva er ikke en gyldig HTML5-attributt for bildeelementet <img>?",
                    "answers": [
                        { "id": 0, "answer": "src", "correct": false },
                        { "id": 1, "answer": "alt", "correct": false },
                        { "id": 2, "answer": "caption", "correct": true },
                        { "id": 3, "answer": "width", "correct": false }
                    ]
                },
                {
                    "id": 76,
                    "question": "Hva representerer 'JSON' i webutvikling?",
                    "answers": [
                        { "id": 0, "answer": "JavaScript Object Notation", "correct": true },
                        { "id": 1, "answer": "JavaScript Order Notation", "correct": false },
                        { "id": 2, "answer": "JavaScript Online Notification", "correct": false },
                        { "id": 3, "answer": "JavaScript Object Naming", "correct": false }
                    ]
                },
                {
                    "id": 77,
                    "question": "Hva er ikke en gyldig HTML5-avsnittselement?",
                    "answers": [
                        { "id": 0, "answer": "<article>", "correct": false },
                        { "id": 1, "answer": "<aside>", "correct": false },
                        { "id": 2, "answer": "<div>", "correct": true },
                        { "id": 3, "answer": "<section>", "correct": false }
                    ]
                },
                {
                    "id": 78,
                    "question": "Hva er ikke en gyldig metode i JavaScript 'Math' -objektet?",
                    "answers": [
                        { "id": 0, "answer": "round()", "correct": false },
                        { "id": 1, "answer": "floor()", "correct": false },
                        { "id": 2, "answer": "average()", "correct": true },
                        { "id": 3, "answer": "random()", "correct": false }
                    ]
                },
                {
                    "id": 79,
                    "question": "Hva er ikke en gyldig egenskap i CSS 'box-sizing'?",
                    "answers": [
                        { "id": 0, "answer": "content-box", "correct": false },
                        { "id": 1, "answer": "border-box", "correct": false },
                        { "id": 2, "answer": "padding-box", "correct": true },
                        { "id": 3, "answer": "inherit", "correct": false }
                    ]
                },
                {
                    "id": 80,
                    "question": "Hva bruker vi for å definere hovedinnholdet på en nettside",
                    "answers": [
                        { "id": 0, "answer": "<main>", "correct": true },
                        { "id": 1, "answer": "<body>", "correct": false },
                        { "id": 2, "answer": "<section>", "correct": false },
                        { "id": 3, "answer": "<div>", "correct": false }
                    ]
                },
                {
                    "id": 81,
                    "question": "Hva representerer 'SVG' i webutvikling?",
                    "answers": [
                        { "id": 0, "answer": "Scalable Vector Graphics", "correct": true },
                        { "id": 1, "answer": "Simple Vector Graphics", "correct": false },
                        { "id": 2, "answer": "Static Vector Graphics", "correct": false },
                        { "id": 3, "answer": "Styled Vector Graphics", "correct": false }
                    ]
                },
                {
                    "id": 82,
                    "question": "Hva er ikke en gyldig HTML5-tag for en navigasjonsmeny?",
                    "answers": [
                        { "id": 0, "answer": "<nav>", "correct": false },
                        { "id": 1, "answer": "<menu>", "correct": true },
                        { "id": 2, "answer": "<ul>", "correct": false },
                        { "id": 3, "answer": "<ol>", "correct": false }
                    ]
                },
                {
                    "id": 83,
                    "question": "Hva er ikke en gyldig HTTP-metode?",
                    "answers": [
                        { "id": 0, "answer": "POST", "correct": false },
                        { "id": 1, "answer": "UPDATE", "correct": true },
                        { "id": 2, "answer": "GET", "correct": false },
                        { "id": 3, "answer": "DELETE", "correct": false }
                    ]
                },
                {
                    "id": 84,
                    "question": "Hva er ikke en gyldig attributt for en <input> -tag i HTML?",
                    "answers": [
                        { "id": 0, "answer": "value", "correct": false },
                        { "id": 1, "answer": "type", "correct": false },
                        { "id": 2, "answer": "format", "correct": true },
                        { "id": 3, "answer": "placeholder", "correct": false }
                    ]
                },
                {
                    "id": 85,
                    "question": "Hva er ikke en gyldig metode i JavaScript 'String' -objektet?",
                    "answers": [
                        { "id": 0, "answer": "substring()", "correct": false },
                        { "id": 1, "answer": "slice()", "correct": false },
                        { "id": 2, "answer": "concat()", "correct": false },
                        { "id": 3, "answer": "push()", "correct": true }
                    ]
                },
                {
                    "id": 86,
                    "question": "Hva er ikke en gyldig enhet for skriftstørrelse i CSS?",
                    "answers": [
                        { "id": 0, "answer": "em", "correct": false },
                        { "id": 1, "answer": "pt", "correct": false },
                        { "id": 2, "answer": "vh", "correct": false },
                        { "id": 3, "answer": "hp", "correct": true }
                    ]
                },
                {
                    "id": 87,
                    "question": "Hva er ikke en gyldig attributt for en <textarea> -tag i HTML?",
                    "answers": [
                        { "id": 0, "answer": "value", "correct": false },
                        { "id": 1, "answer": "text", "correct": true },
                        { "id": 2, "answer": "placeholder", "correct": false },
                        { "id": 3, "answer": "rows", "correct": false }
                    ]
                },
                {
                    "id": 88,
                    "question": "Hva representerer 'SEO' i webutvikling?",
                    "answers": [
                        { "id": 0, "answer": "Search Engine Optimization", "correct": true },
                        { "id": 1, "answer": "Semantic Enhancing Operations", "correct": false },
                        { "id": 2, "answer": "Social Engagement Opportunities", "correct": false },
                        { "id": 3, "answer": "Site Efficiency Optimization", "correct": false }
                    ]
                },
                {
                    "id": 89,
                    "question": "Hva er ikke en gyldig CSS-enhet for farge?",
                    "answers": [
                        { "id": 0, "answer": "hex", "correct": false },
                        { "id": 1, "answer": "rgb", "correct": false },
                        { "id": 2, "answer": "hsl", "correct": false },
                        { "id": 3, "answer": "hlg", "correct": true }
                    ]
                },
                {
                    "id": 90,
                    "question": "Hvordan definerer du variabler i CSS?",
                    "answers": [
                        { "id": 0, "answer": "--variabel", "correct": true },
                        { "id": 1, "answer": "@variabel", "correct": false },
                        { "id": 2, "answer": "const variabel", "correct": false },
                        { "id": 3, "answer": "$variabel", "correct": false }
                    ]
                },
                {
                    "id": 91,
                    "question": "Hvordan definerer du en overskrift i HTML?",
                    "answers": [
                        { "id": 0, "answer": "<heading1>", "correct": false },
                        { "id": 1, "answer": "<header>", "correct": false },
                        { "id": 2, "answer": "<h>", "correct": false },
                        { "id": 3, "answer": "<h1>", "correct": true }
                    ]
                },
                {
                    "id": 92,
                    "question": "Hva er ikke en gyldig HTML5-tag for et skjemafelt?",
                    "answers": [
                        { "id": 0, "answer": "<input>", "correct": false },
                        { "id": 1, "answer": "<field>", "correct": true },
                        { "id": 2, "answer": "<select>", "correct": false },
                        { "id": 3, "answer": "<textarea>", "correct": false }
                    ]
                },
                {
                    "id": 93,
                    "question": "Hva er ikke en gyldig egenskap for CSS 'background'?",
                    "answers": [
                        { "id": 0, "answer": "background-color", "correct": false },
                        { "id": 1, "answer": "background-image", "correct": false },
                        { "id": 2, "answer": "background-height", "correct": true },
                        { "id": 3, "answer": "background-repeat", "correct": false }
                    ]
                },
                {
                    "id": 94,
                    "question": "Hva er ikke en gyldig HTML5-tag for en bildefigur?",
                    "answers": [
                        { "id": 0, "answer": "<figure>", "correct": false },
                        { "id": 1, "answer": "<img>", "correct": false },
                        { "id": 2, "answer": "<picture>", "correct": false },
                        { "id": 3, "answer": "<graphic>", "correct": true }
                    ]
                },
                {
                    "id": 95,
                    "question": "Hva er resultatet av følgende JavaScript-uttrykk: typeof(null)?",
                    "answers": [
                        { "id": 0, "answer": "null", "correct": false },
                        { "id": 1, "answer": "object", "correct": true },
                        { "id": 2, "answer": "undefined", "correct": false },
                        { "id": 3, "answer": "string", "correct": false }
                    ]
                },
                {
                    "id": 96,
                    "question": "Hva er ikke en gyldig HTTP-metode for en RESTful API?",
                    "answers": [
                        { "id": 0, "answer": "POST", "correct": false },
                        { "id": 1, "answer": "PUT", "correct": false },
                        { "id": 2, "answer": "UPDATE", "correct": true },
                        { "id": 3, "answer": "DELETE", "correct": false }
                    ]
                },
                {
                    "id": 97,
                    "question": "Hva representerer 'RWD' i webutvikling?",
                    "answers": [
                        { "id": 0, "answer": "Responsible Web Design", "correct": false },
                        { "id": 1, "answer": "Responsive Web Design", "correct": true },
                        { "id": 2, "answer": "Rapid Web Development", "correct": false },
                        { "id": 3, "answer": "Reliable Web Deployment", "correct": false }
                    ]
                },
                {
                    "id": 98,
                    "question": "Hvilken CSS-selektor brukes til å velge alle direkte barn av et element?",
                    "answers": [
                        { "id": 0, "answer": ">", "correct": true },
                        { "id": 1, "answer": "+", "correct": false },
                        { "id": 2, "answer": "~", "correct": false },
                        { "id": 3, "answer": "!", "correct": false }
                    ]
                },
                {
                    "id": 99,
                    "question": "Hva representerer 'JWT' i webutvikling?",
                    "answers": [
                        { "id": 0, "answer": "JavaScript Web Token", "correct": false },
                        { "id": 1, "answer": "JSON Web Token", "correct": true },
                        { "id": 2, "answer": "Java Web Token", "correct": false },
                        { "id": 3, "answer": "JavaScript Web Transfer", "correct": false }
                    ]
                },
                {
                    "id": 100,
                    "question": "Hva representerer 'IIFE' i JavaScript?",
                    "answers": [
                        { "id": 0, "answer": "Inline Instance Function Execution", "correct": false },
                        { "id": 1, "answer": "Instantiated Inherited Function Expression", "correct": false },
                        { "id": 2, "answer": "Immediately Invoked Function Expression", "correct": true },
                        { "id": 3, "answer": "Inline Iterative Function Execution", "correct": false }
                    ]
                },
                {
                    "id": 101,
                    "question": "Hvilken CSS-selektor brukes til å velge alle tilgjengelige valg?",
                    "answers": [
                        { "id": 0, "answer": "$", "correct": false },
                        { "id": 1, "answer": "+", "correct": false },
                        { "id": 2, "answer": "-", "correct": false },
                        { "id": 3, "answer": "*", "correct": true }
                    ]
                },
                {
                    "id": 102,
                    "question": "Hva er resultatet av følgende JavaScript-uttrykk: typeof(null)?",
                    "answers": [
                        { "id": 0, "answer": "null", "correct": false },
                        { "id": 1, "answer": "object", "correct": true },
                        { "id": 2, "answer": "undefined", "correct": false },
                        { "id": 3, "answer": "string", "correct": false }
                    ]
                },
                {
                    "id": 103,
                    "question": "Hva er resultatet av følgende JavaScript-uttrykk: typeof(undefined)?",
                    "answers": [
                        { "id": 0, "answer": "null", "correct": false },
                        { "id": 1, "answer": "object", "correct": false },
                        { "id": 2, "answer": "undefined", "correct": true },
                        { "id": 3, "answer": "string", "correct": false }
                    ]
                },
                {
                    "id": 104,
                    "question": "Hva er resultatet av følgende JavaScript-uttrykk: typeof(NaN)?",
                    "answers": [
                        { "id": 0, "answer": "null", "correct": false },
                        { "id": 1, "answer": "object", "correct": false },
                        { "id": 2, "answer": "undefined", "correct": false },
                        { "id": 3, "answer": "string", "correct": true }
                    ]
                },
                {
                    "id": 105,
                    "question": "Hva er resultatet av følgende JavaScript-uttrykk: typeof(true)?",
                    "answers": [
                        { "id": 0, "answer": "null", "correct": false },
                        { "id": 1, "answer": "object", "correct": false },
                        { "id": 2, "answer": "undefined", "correct": false },
                        { "id": 3, "answer": "boolean", "correct": true }
                    ]
                },
                {
                    "id": 106,
                    "question": "Hva er forskjellen mellom '==' og '===' operatorene i JavaScript?",
                    "answers": [
                        { "id": 0, "answer": "'==' sammenligner verdier uten å ta hensyn til datatype, mens '===' sammenligner både verdier og datatyper.", "correct": true },
                        { "id": 1, "answer": "'==' sammenligner både verdier og datatyper, mens '===' sammenligner kun verdier.", "correct": false },
                        { "id": 2, "answer": "'==' er kun for tall, mens '===' er for alle datatyper.", "correct": false },
                        { "id": 3, "answer": "'===' er kun for tekststrenger, mens '==' er for alle datatyper.", "correct": false }
                    ]
                },
                {
                    "id": 107,
                    "question": "Hva er forskjellen mellom 'let' og 'var' i JavaScript?",
                    "answers": [
                        { "id": 0, "answer": "'let' har blokkomfang, mens 'var' har funksjonsomfang.", "correct": true },
                        { "id": 1, "answer": "'let' kan bare brukes for numeriske variabler, mens 'var' kan bare brukes for tekstvariabler.", "correct": false },
                        { "id": 2, "answer": "'let' har funksjonsomfang, mens 'var' har globalt omfang.", "correct": false },
                        { "id": 3, "answer": "'let' er kun for lokale variabler, mens 'var' er for globale variabler.", "correct": false }
                    ]
                },
                {
                    "id": 108,
                    "question": "Hva betyr det å være 'asynkron' i JavaScript?",
                    "answers": [
                        { "id": 0, "answer": "Det betyr at koden vil kjøre i sekvensiell rekkefølge.", "correct": false },
                        { "id": 1, "answer": "Det betyr at koden vil kjøre parallelt med andre koder.", "correct": false },
                        { "id": 2, "answer": "Det betyr at koden kan fortsette å kjøre uten å vente på en respons.", "correct": true },
                        { "id": 3, "answer": "Det betyr at koden vil vente på en respons før den fortsetter å kjøre.", "correct": false }
                    ]
                },
                {
                    "id": 109,
                    "question": "Hva er 'event bubbling' i JavaScript?",
                    "answers": [
                        { "id": 0, "answer": "Det er en hendelse som oppstår når et element mister fokus.", "correct": false },
                        { "id": 1, "answer": "Det er en hendelse som oppstår når et element får fokus.", "correct": false },
                        { "id": 2, "answer": "Det er en hendelse der hendelsesbehandlingen starter fra det innerste elementet og beveger seg utover.", "correct": true },
                        { "id": 3, "answer": "Det er en hendelse der hendelsesbehandlingen starter fra det ytterste elementet og beveger seg innover.", "correct": false }
                    ]
                },
                {
                    "id": 110,
                    "question": "Hva er forskjellen mellom 'margin' og 'padding' i CSS?",
                    "answers": [
                        { "id": 0, "answer": "'Margin' er avstanden mellom elementet og dets naboer, mens 'padding' er avstanden mellom elementets kant og dets innhold.", "correct": true },
                        { "id": 1, "answer": "'Margin' er alltid synlig på nettsiden, mens 'padding' kan være skjult.", "correct": false },
                        { "id": 2, "answer": "'Margin' brukes for å justere elementets størrelse, mens 'padding' brukes for å justere elementets plassering.", "correct": false },
                        { "id": 3, "answer": "'Margin' og 'padding' har samme funksjon, men brukes forskjellig i ulike situasjoner.", "correct": false }
                    ]
                },
                {
                    "id": 111,
                    "question": "Hva er 'box-model' i CSS?",
                    "answers": [
                        { "id": 0, "answer": "En modell som beskriver hvordan elementer plasseres i en boks i forhold til hverandre.", "correct": false },
                        { "id": 1, "answer": "En modell som definerer hvordan elementers innhold, padding, border og margin er ordnet i forhold til hverandre.", "correct": true },
                        { "id": 2, "answer": "En modell som brukes til å tegne bokser i CSS, spesielt for komplekse layouter.", "correct": false },
                        { "id": 3, "answer": "En modell som brukes til å pakke inn tekst og bilder i bokser på nettsider.", "correct": false }
                    ]
                },
                {
                    "id": 112,
                    "question": "Hva betyr det når et HTML-element er 'semantisk'?",
                    "answers": [
                        { "id": 0, "answer": "Det betyr at elementet er synlig for brukerne på nettsiden.", "correct": false },
                        { "id": 1, "answer": "Det betyr at elementet har en spesifikk stil knyttet til det.", "correct": false },
                        { "id": 2, "answer": "Det betyr at elementet har en mening eller betydning i seg selv, og indikerer dets hensikt og innhold til både nettlesere og utviklere.", "correct": true },
                        { "id": 3, "answer": "Det betyr at elementet kan endres dynamisk ved hjelp av JavaScript.", "correct": false }
                    ]
                },
                {
                    "id": 113,
                    "question": "Hva er en 'query string' i en URL?",
                    "answers": [
                        { "id": 0, "answer": "En streng som brukes til å spørre databaser om informasjon.", "correct": false },
                        { "id": 1, "answer": "En streng som inneholder parameterverdier som sendes til serveren sammen med URL-en.", "correct": true },
                        { "id": 2, "answer": "En streng som brukes til å stille spørsmål til brukeren gjennom en nettside.", "correct": false },
                        { "id": 3, "answer": "En streng som brukes til å spørre om nettleserhistorikk.", "correct": false }
                    ]
                },
                {
                    "id": 114,
                    "question": "Hva er 'responsive web design'?",
                    "answers": [
                        { "id": 0, "answer": "En tilnærming til webdesign som bruker store bilder og tung animasjon for å fange oppmerksomheten til brukerne.", "correct": false },
                        { "id": 1, "answer": "En tilnærming til webdesign som tar sikte på å gjøre nettsider brukervennlige på alle enheter og skjermstørrelser.", "correct": true },
                        { "id": 2, "answer": "En tilnærming til webdesign som fokuserer på å bruke JavaScript-frameworks for å lage dynamiske nettsider.", "correct": false },
                        { "id": 3, "answer": "En tilnærming til webdesign som legger vekt på å bruke store mengder tekst for å gi omfattende informasjon.", "correct": false }
                    ]
                },
                {
                    "id": 115,
                    "question": "Hva er forskjellen mellom 'GET' og 'POST' i HTTP-protokollen?",
                    "answers": [
                        { "id": 0, "answer": "'GET' sender data gjennom URL-en, mens 'POST' sender data gjennom forespørselskroppen.", "correct": true },
                        { "id": 1, "answer": "'GET' kan bare brukes for å motta data, mens 'POST' kan brukes for både å sende og motta data.", "correct": false },
                        { "id": 2, "answer": "'GET' er sikrere enn 'POST' for å sende sensitive data.", "correct": false },
                        { "id": 3, "answer": "'GET' er mer effektivt enn 'POST' for store datamengder.", "correct": false }
                    ]
                },
                {
                    "id": 116,
                    "question": "Hva er en 'cookie' i webutvikling?",
                    "answers": [
                        { "id": 0, "answer": "En liten boks som vises på nettsiden for å samle inn brukerdata.", "correct": false },
                        { "id": 1, "answer": "En metode for å lagre informasjon på brukerens datamaskin når de besøker en nettside.", "correct": true },
                        { "id": 2, "answer": "En form for kryptering som brukes til å sikre dataoverføring mellom nettleser og server.", "correct": false },
                        { "id": 3, "answer": "En kode som brukes til å validere brukerinput på nettskjemaer.", "correct": false }
                    ]
                },
                {
                    "id": 117,
                    "question": "Hva betyr det å 'kompilere' i sammenheng med programmeringsspråk som JavaScript?",
                    "answers": [
                        { "id": 0, "answer": "Det betyr å kjøre koden direkte i nettleseren uten behov for ekstra verktøy.", "correct": false },
                        { "id": 1, "answer": "Det betyr å konvertere koden til maskinlesbar kode for å kunne kjøre den i nettleseren eller på serveren.", "correct": true },
                        { "id": 2, "answer": "Det betyr å optimalisere koden for bedre ytelse og ressursbruk.", "correct": false },
                        { "id": 3, "answer": "Det betyr å skrive koden i et mer leselig format for andre utviklere.", "correct": false }
                    ]
                },
                {
                    "id": 118,
                    "question": "Hva er 'DOM' i webutvikling?",
                    "answers": [
                        { "id": 0, "answer": "'DOM' står for Document Object Model og representerer hvordan nettleseren strukturerer HTML-dokumenter som et tre av objekter.", "correct": true },
                        { "id": 1, "answer": "'DOM' står for Dynamic Object Management og refererer til en metode for å administrere dynamisk genererte HTML-objekter.", "correct": false },
                        { "id": 2, "answer": "'DOM' står for Data Object Model og representerer modellen for datautveksling mellom nettleser og server.", "correct": false },
                        { "id": 3, "answer": "'DOM' står for Document Order Manager og refererer til en teknikk for å administrere rekkefølgen av HTML-elementer i et dokument.", "correct": false }
                    ]
                },
                {
                    "id": 119,
                    "question": "Hva er 'AJAX' i webutvikling?",
                    "answers": [
                        { "id": 0, "answer": "'AJAX' står for Asynchronous JavaScript and XML, og refererer til en teknikk for å oppdatere deler av en nettside uten å laste inn hele siden på nytt.", "correct": true },
                        { "id": 1, "answer": "'AJAX' står for Asynchronous JavaScript and XHTML, og refererer til en måte å generere dynamiske HTML-elementer ved hjelp av JavaScript.", "correct": false },
                        { "id": 2, "answer": "'AJAX' står for Asynchronous JavaScript and XHR, og refererer til en måte å sende XML-forespørsler til serveren uten å laste inn siden på nytt.", "correct": false },
                        { "id": 3, "answer": "'AJAX' står for Asynchronous JavaScript and HTML, og refererer til en måte å lage dynamiske HTML-sider ved hjelp av JavaScript.", "correct": false }
                    ]
                },
                {
                    "id": 120,
                    "question": "Hva er forskjellen mellom 'localStorage' og 'sessionStorage' i JavaScript?",
                    "answers": [
                        { "id": 0, "answer": "'localStorage' lagrer data uten utløpsdato, mens 'sessionStorage' lagrer data kun for økten.", "correct": true },
                        { "id": 1, "answer": "'localStorage' lagrer data kun for økten, mens 'sessionStorage' lagrer data uten utløpsdato.", "correct": false },
                        { "id": 2, "answer": "'localStorage' lagrer data i en cache, mens 'sessionStorage' lagrer data i serverens database.", "correct": false },
                        { "id": 3, "answer": "'localStorage' lagrer data i en cookie, mens 'sessionStorage' lagrer data i nettleserens cache.", "correct": false }
                    ]
                },
                {
                    "id": 121,
                    "question": "Hva er 'cross-site scripting' (XSS) i webutvikling?",
                    "answers": [
                        { "id": 0, "answer": "En teknikk for å style nettsider med kryssende koder (cross-code styling).", "correct": false },
                        { "id": 1, "answer": "En sikkerhetsrisiko hvor skadelig kode injiseres i nettsider og kjøres i besøkendes nettlesere.", "correct": true },
                        { "id": 2, "answer": "En måte å validere brukerinput for å forhindre uønsket datainntasting.", "correct": false },
                        { "id": 3, "answer": "En form for AJAX-teknikk som tillater kryssende dataoverføring mellom ulike domener.", "correct": false }
                    ]
                },
                {
                    "id": 122,
                    "question": "Hva er 'viewport' i responsiv webdesign?",
                    "answers": [
                        { "id": 0, "answer": "Det refererer til et område på nettsiden hvor bilder og videoer vises.", "correct": false },
                        { "id": 1, "answer": "Det er området på skjermen som viser innholdet til nettsiden, og kan tilpasses for å gi en bedre opplevelse på ulike enheter.", "correct": true },
                        { "id": 2, "answer": "Det er et verktøy for å teste nettsiders ytelse på ulike enheter og nettlesere.", "correct": false },
                        { "id": 3, "answer": "Det refererer til et system for å organisere CSS-stiler basert på skjermstørrelse.", "correct": false }
                    ]
                },
                {
                    "id": 123,
                    "question": "Hva er 'CSS grid'?",
                    "answers": [
                        { "id": 0, "answer": "En teknikk for å lage responsive bilderuter i CSS.", "correct": false },
                        { "id": 1, "answer": "Et layoutsystem i CSS som tillater utviklere å lage komplekse nettstiloppsett med rutenett.", "correct": true },
                        { "id": 2, "answer": "En CSS-egenskap som tillater utviklere å rotere elementer i en rutenettvisning.", "correct": false },
                        { "id": 3, "answer": "En form for animasjonseffekt som brukes til å vise bilder i et gittermønster.", "correct": false }
                    ]
                },
                {
                    "id": 124,
                    "question": "Hva er 'progressive enhancement' i webdesign?",
                    "answers": [
                        { "id": 0, "answer": "En tilnærming til webdesign som fokuserer på å legge til avanserte funksjoner først, deretter de grunnleggende.", "correct": false },
                        { "id": 1, "answer": "En tilnærming til webdesign som fokuserer på å lage nettsider som fungerer godt på alle enheter og nettlesere, og gradvis legge til mer avanserte funksjoner for nyere enheter.", "correct": true },
                        { "id": 2, "answer": "En tilnærming til webdesign som fokuserer på å bruke de nyeste og mest avanserte teknologiene først, og deretter tilpasse dem for eldre nettlesere.", "correct": false },
                        { "id": 3, "answer": "En tilnærming til webdesign som fokuserer på å bruke de mest populære designmønstrene først, og deretter tilpasse dem basert på brukerens tilbakemeldinger.", "correct": false }
                    ]
                },
                {
                    "id": 125,
                    "question": "Hva er 'HTTP/2' og hvordan skiller det seg fra 'HTTP/1.1'?",
                    "answers": [
                        { "id": 0, "answer": "'HTTP/2' er en ny versjon av HTTP-protokollen som støtter flere samtidige forespørsler over en enkelt TCP-tilkobling og kan komprimere overskrifter for å redusere overføringsstørrelsen.", "correct": true },
                        { "id": 1, "answer": "'HTTP/2' er en eldre versjon av HTTP-protokollen som støtter kun én forespørsel per TCP-tilkobling og har begrenset støtte for sikkerhet.", "correct": false },
                        { "id": 2, "answer": "'HTTP/2' er en versjon av HTTP-protokollen som er spesielt utviklet for å kjøre JavaScript-baserte applikasjoner raskere.", "correct": false },
                        { "id": 3, "answer": "'HTTP/2' er en variant av HTTP-protokollen som legger til støtte for Java-basert kryptering og autentisering av nettverkstilkoblinger.", "correct": false }
                    ]
                },
                {
                    "id": 126,
                    "question": "Hva er 'Single Page Application' (SPA) og hvordan fungerer det?",
                    "answers": [
                        { "id": 0, "answer": "En SPA er en nettside som har kun én HTML-side og laster innholdet dynamisk ved hjelp av JavaScript, vanligvis via AJAX-forespørsler.", "correct": true },
                        { "id": 1, "answer": "En SPA er en nettside som har flere sider, men alle sider deler en felles JavaScript-fil for dynamisk innhold.", "correct": false },
                        { "id": 2, "answer": "En SPA er en nettside som laster innholdet fra flere forskjellige servere for å forbedre ytelsen.", "correct": false },
                        { "id": 3, "answer": "En SPA er en nettside som fungerer uten JavaScript og laster inn separate HTML-sider for hvert trinn i brukerens interaksjon.", "correct": false }
                    ]
                },
                {
                    "id": 127,
                    "question": "Hva er 'WebSockets' og hvordan fungerer det?",
                    "answers": [
                        { "id": 0, "answer": "'WebSockets' er en protokoll som tillater toveis kommunikasjon mellom klient og server over en enkelt TCP-tilkobling, og det tillater sanntidsoppdateringer på nettsiden.", "correct": true },
                        { "id": 1, "answer": "'WebSockets' er en eldre versjon av HTTP som tillater klienter å sende forespørsler til serveren uten å vente på et svar.", "correct": false },
                        { "id": 2, "answer": "'WebSockets' er en form for kryptert dataoverføring som brukes spesielt for å sikre sensitiv informasjon på nettsider.", "correct": false },
                        { "id": 3, "answer": "'WebSockets' er en teknikk for å forbedre nettsideytelse ved å lagre statisk innhold lokalt på brukerens datamaskin.", "correct": false }
                    ]
                },
                {
                    "id": 128,
                    "question": "Hva er 'npm' og hva brukes det til i webutvikling?",
                    "answers": [
                        { "id": 0, "answer": "'npm' står for Node Package Manager og er et verktøy for å administrere avhengigheter og pakker i Node.js-prosjekter.", "correct": true },
                        { "id": 1, "answer": "'npm' står for Network Protocol Manager og brukes til å administrere nettverksprotokoller i webapplikasjoner.", "correct": false },
                        { "id": 2, "answer": "'npm' står for New Project Manager og brukes til å opprette nye webprosjekter ved hjelp av forhåndsdefinerte maler.", "correct": false },
                        { "id": 3, "answer": "'npm' står for Node Program Manager og brukes til å administrere kjøring av Node.js-applikasjoner på ulike operativsystemer.", "correct": false }
                    ]
                },
                {
                    "id": 129,
                    "question": "Hva er 'CORS' og hvorfor er det viktig i webutvikling?",
                    "answers": [
                        { "id": 0, "answer": "'CORS' står for Cross-Origin Resource Sharing og er en sikkerhetsmekanisme som hindrer nettlesere fra å sende AJAX-forespørsler til andre domener enn det nettstedet som ble lastet fra.", "correct": true },
                        { "id": 1, "answer": "'CORS' står for Cross-Origin Request Scripting og brukes til å tillate nettlesere å kjøre skript fra eksterne kilder.", "correct": false },
                        { "id": 2, "answer": "'CORS' står for Cross-Origin Rendering System og er en metode for å optimere visningen av nettsider på forskjellige enheter.", "correct": false },
                        { "id": 3, "answer": "'CORS' står for Cross-Origin Redirect System og er en teknikk for å omdirigere brukere til eksterne nettsider uten å forlate den opprinnelige nettsiden.", "correct": false }
                    ]
                },
                {
                    "id": 130,
                    "question": "Hva er 'Responsive Web Design' (RWD) og hvorfor er det viktig?",
                    "answers": [
                        { "id": 0, "answer": "'Responsive Web Design' er en tilnærming til webdesign som sikrer at nettsider tilpasser seg automatisk til ulike enheter og skjermstørrelser, og det er viktig for å gi en god brukeropplevelse på alle enheter.", "correct": true },
                        { "id": 1, "answer": "'Responsive Web Design' er en teknikk for å lage nettsider som kun fungerer på desktop-enheter, og det er viktig for å sikre høy ytelse på slike enheter.", "correct": false },
                        { "id": 2, "answer": "'Responsive Web Design' er en måte å organisere CSS-stiler på som tillater enkel tilpasning av fargevalg og fonter, og det er viktig for å sikre et enhetlig utseende på nettsiden.", "correct": false },
                        { "id": 3, "answer": "'Responsive Web Design' er en protokoll for å kryptere dataoverføring mellom nettleseren og serveren, og det er viktig for å sikre personvernet til brukerne.", "correct": false }
                    ]
                },
                {
                    "id": 131,
                    "question": "Hva er 'AJAX' (Asynchronous JavaScript and XML) og hvordan fungerer det?",
                    "answers": [
                        { "id": 0, "answer": "'AJAX' er en teknikk som tillater klienten å sende og motta data fra serveren uten å måtte laste inn hele nettsiden på nytt, og det fungerer ved å bruke JavaScript til å sende HTTP-forespørsler til serveren og oppdatere deler av nettsiden dynamisk.", "correct": true },
                        { "id": 1, "answer": "'AJAX' er en protokoll for å kryptere dataoverføring mellom nettleseren og serveren, og det fungerer ved å bruke XML for å strukturere dataene som sendes mellom klient og server.", "correct": false },
                        { "id": 2, "answer": "'AJAX' er en metode for å validere brukerinput på nettskjemaer ved hjelp av JavaScript, og det fungerer ved å sammenligne brukerens inndata med etablerte mønstre og kriterier.", "correct": false },
                        { "id": 3, "answer": "'AJAX' er en teknikk for å animere nettsideelementer ved hjelp av JavaScript og CSS, og det fungerer ved å manipulere stil- og attributtverdier dynamisk.", "correct": false }
                    ]
                },
                {
                    "id": 132,
                    "question": "Hva er 'RESTful API' og hvordan fungerer det?",
                    "answers": [
                        { "id": 0, "answer": "'RESTful API' er et grensesnitt for å kommunisere med en webapplikasjon ved hjelp av HTTP-forespørsler, og det fungerer ved å tillate klienter å utføre operasjoner på serverdata ved å sende forespørsler med ulike HTTP-metoder som GET, POST, PUT, DELETE, etc.", "correct": true },
                        { "id": 1, "answer": "'RESTful API' er en metode for å validere brukerinput på nettskjemaer ved hjelp av JavaScript, og det fungerer ved å sammenligne brukerens inndata med etablerte mønstre og kriterier.", "correct": false },
                        { "id": 2, "answer": "'RESTful API' er en protokoll for å kryptere dataoverføring mellom nettleseren og serveren, og det fungerer ved å bruke XML for å strukturere dataene som sendes mellom klient og server.", "correct": false },
                        { "id": 3, "answer": "'RESTful API' er en teknikk for å animere nettsideelementer ved hjelp av JavaScript og CSS, og det fungerer ved å manipulere stil- og attributtverdier dynamisk.", "correct": false }
                    ]
                },
                {
                    "id": 133,
                    "question": "Hva er 'SQL injection' og hvordan kan det forhindres?",
                    "answers": [
                        { "id": 0, "answer": "'SQL injection' er en sårbarhet som tillater angripere å injisere skadelig SQL-kode i databaseforespørsler, og det kan forhindres ved å bruke parameteriserte spørrer og korrekt håndtering av brukerinput.", "correct": true },
                        { "id": 1, "answer": "'SQL injection' er en metode for å validere brukerinput på nettskjemaer ved hjelp av JavaScript, og det kan forhindres ved å bruke regelmessige uttrykk for å begrense inndataene.", "correct": false },
                        { "id": 2, "answer": "'SQL injection' er en teknikk for å validere brukerinput på nettskjemaer ved å sammenligne inndataene med etablerte kriterier, og det kan forhindres ved å bruke sikkerhetsprotokoller som HTTPS.", "correct": false },
                        { "id": 3, "answer": "'SQL injection' er en protokoll for å kryptere dataoverføring mellom nettleseren og serveren, og det kan forhindres ved å bruke spesialiserte krypteringsalgoritmer.", "correct": false }
                    ]
                },
                {
                    "id": 134,
                    "question": "Hva er 'frontend' og 'backend' i webutvikling, og hva er deres roller?",
                    "answers": [
                        { "id": 0, "answer": "'Frontend' refererer til den delen av en webapplikasjon som brukeren samhandler direkte med gjennom nettleseren, mens 'backend' refererer til den delen av applikasjonen som kjører på serveren og håndterer logikk og databehandling.", "correct": true },
                        { "id": 1, "answer": "'Frontend' refererer til den delen av serveren som håndterer nettverkskommunikasjon, mens 'backend' refererer til den delen av nettleseren som håndterer brukergrensesnittet.", "correct": false },
                        { "id": 2, "answer": "'Frontend' refererer til den delen av serveren som håndterer databehandling, mens 'backend' refererer til den delen av nettleseren som håndterer logikk og brukergrensesnitt.", "correct": false },
                        { "id": 3, "answer": "'Frontend' refererer til den delen av nettleseren som håndterer databehandling, mens 'backend' refererer til den delen av serveren som håndterer brukergrensesnittet.", "correct": false }
                    ]
                },
                {
                    "id": 135,
                    "question": "Hva er forskjellen mellom 'GET' og 'POST' metoder i HTTP-protokollen?",
                    "answers": [
                        { "id": 0, "answer": "'GET' metoden brukes for å be om data fra en spesifisert ressurs, mens 'POST' metoden brukes for å sende data til en server for behandling.", "correct": true },
                        { "id": 1, "answer": "'GET' metoden brukes for å sende data til en server for behandling, mens 'POST' metoden brukes for å be om data fra en spesifisert ressurs.", "correct": false },
                        { "id": 2, "answer": "'GET' metoden er mer sikker enn 'POST' metoden for å overføre sensitive data, mens 'POST' metoden er mer effektiv for å hente store datasett.", "correct": false },
                        { "id": 3, "answer": "'GET' metoden tillater bare sending av data i URL-forespørsler, mens 'POST' metoden tillater sending av data i forespørselskroppen.", "correct": false }
                    ]
                },
                {
                    "id": 136,
                    "question": "Hva er en 'cookie' i sammenheng med webutvikling?",
                    "answers": [
                        { "id": 0, "answer": "En 'cookie' er en liten datafil som lagres på brukerens datamaskin av nettleseren, og den brukes til å lagre informasjon om brukerens aktiviteter og preferanser på nettstedet.", "correct": true },
                        { "id": 1, "answer": "En 'cookie' er en kryptert streng som brukes til å autentisere brukere ved pålogging på et nettsted.", "correct": false },
                        { "id": 2, "answer": "En 'cookie' er en kodeblokk som brukes til å implementere dynamisk innhold på nettsider ved hjelp av JavaScript.", "correct": false },
                        { "id": 3, "answer": "En 'cookie' er en del av URL-en som brukes til å referere til bestemte ressurser på et nettsted.", "correct": false }
                    ]
                },
                {
                    "id": 137,
                    "question": "Hva er 'HTTP statuskode 404'?",
                    "answers": [
                        { "id": 0, "answer": "'HTTP statuskode 404' indikerer at den forespurte ressursen ikke ble funnet på serveren.", "correct": true },
                        { "id": 1, "answer": "'HTTP statuskode 404' indikerer at den forespurte ressursen har endret plassering og ble midlertidig omdirigert.", "correct": false },
                        { "id": 2, "answer": "'HTTP statuskode 404' indikerer at det oppstod en intern serverfeil under behandling av forespørselen.", "correct": false },
                        { "id": 3, "answer": "'HTTP statuskode 404' indikerer at den forespurte ressursen ble funnet, men er midlertidig utilgjengelig.", "correct": false }
                    ]
                },
                {
                    "id": 138,
                    "question": "Hva er 'Semantic HTML'?",
                    "answers": [
                        { "id": 0, "answer": "'Semantic HTML' refererer til bruken av HTML-koder som reflekterer betydningen av innholdet de beskriver, noe som bidrar til bedre tilgjengelighet og søkemotoroptimalisering.", "correct": true },
                        { "id": 1, "answer": "'Semantic HTML' refererer til bruken av avanserte HTML-elementer for å lage komplekse brukergrensesnitt og interaktive funksjoner.", "correct": false },
                        { "id": 2, "answer": "'Semantic HTML' refererer til en spesifikk HTML-synktaks som tillater enkel integrasjon av JavaScript-baserte funksjoner.", "correct": false },
                        { "id": 3, "answer": "'Semantic HTML' refererer til bruken av HTML-koder for å style nettsider ved å tilordne semantiske klassenavn til elementer.", "correct": false }
                    ]
                },
                {
                    "id": 139,
                    "question": "Hva er 'Web Accessibility'?",
                    "answers": [
                        { "id": 0, "answer": "'Web Accessibility' refererer til prinsippet om å lage nettsider og applikasjoner som er tilgjengelige for alle, inkludert personer med funksjonshemninger.", "correct": true },
                        { "id": 1, "answer": "'Web Accessibility' refererer til teknikker for å forbedre nettstedets synlighet på søkemotorer for å øke trafikken.", "correct": false },
                        { "id": 2, "answer": "'Web Accessibility' refererer til sikkerhetsprinsipper og protokoller for å beskytte sensitive dataoverføringer mellom klient og server.", "correct": false },
                        { "id": 3, "answer": "'Web Accessibility' refererer til en tilnærming til webdesign som fokuserer på å skape visuelt tiltalende brukergrensesnitt.", "correct": false }
                    ]
                },
                {
                    "id": 140,
                    "question": "Hva er forskjellen mellom 'margin' og 'padding' i CSS?",
                    "answers": [
                        { "id": 0, "answer": "'Margin' er avstanden mellom grensen til et element og grensene til andre elementer rundt det, mens 'padding' er avstanden mellom elementets innhold og dets grense.", "correct": true },
                        { "id": 1, "answer": "'Margin' refererer til stilen til en elementramme, mens 'padding' refererer til stilen til innholdet inne i rammen.", "correct": false },
                        { "id": 2, "answer": "'Margin' brukes til å legge til mellomrom mellom linjene i en tekst, mens 'padding' brukes til å legge til luft rundt tekstblokker.", "correct": false },
                        { "id": 3, "answer": "'Margin' brukes til å justere vertikal plassering av et element, mens 'padding' brukes til å justere den horisontale plasseringen.", "correct": false }
                    ]
                },
                {
                    "id": 141,
                    "question": "Hva er 'Cross-Site Scripting' (XSS) og hvordan kan det forhindres?",
                    "answers": [
                        { "id": 0, "answer": "'Cross-Site Scripting' er en type nettangrep der angripere injiserer skadelig kode i websider som blir vist for andre brukere, og det kan forhindres ved å sanere og validere brukerinput og bruke sikre HTML-encodingmetoder.", "correct": true },
                        { "id": 1, "answer": "'Cross-Site Scripting' er en teknikk for å skjule skadelig kode inne i bildelinkene på et nettsted, og det kan forhindres ved å begrense tilgangen til bildetjenester.", "correct": false },
                        { "id": 2, "answer": "'Cross-Site Scripting' er en sårbarhet som tillater angripere å få tilgang til andre nettsteder ved å omgå nettleserens sikkerhetsbegrensninger, og det kan forhindres ved å oppdatere nettleseren jevnlig.", "correct": false },
                        { "id": 3, "answer": "'Cross-Site Scripting' er en metode for å manipulere HTTP-forespørsler mellom klient og server, og det kan forhindres ved å bruke krypterte protokoller som HTTPS.", "correct": false }
                    ]
                },
                {
                    "id": 142,
                    "question": "Hva er 'Git' og hva brukes det til i webutvikling?",
                    "answers": [
                        { "id": 0, "answer": "'Git' er et distribuert versjonskontrollsystem som brukes til å spore endringer i kildekodefiler og koordinere arbeidet mellom flere utviklere, og det brukes til å administrere kodebasen til webapplikasjoner.", "correct": true },
                        { "id": 1, "answer": "'Git' er et verktøy for å lage og administrere databaser som brukes til å lagre informasjon om brukere og innhold på et nettsted.", "correct": false },
                        { "id": 2, "answer": "'Git' er et skybasert webutviklingsmiljø som tillater samarbeid og deling av kodeprosjekter mellom flere utviklere, og det brukes til å implementere funksjoner på nettsider.", "correct": false },
                        { "id": 3, "answer": "'Git' er en frontend-rammeverk for å utvikle responsivt og interaktivt innhold på nettsider ved hjelp av HTML, CSS og JavaScript.", "correct": false }
                    ]
                },
                {
                    "id": 143,
                    "question": "Hva er 'Session Storage' og 'Local Storage' i JavaScript, og hva er forskjellen mellom dem?",
                    "answers": [
                        { "id": 0, "answer": "'Session Storage' og 'Local Storage' er to mekanismer som lar deg lagre data i nettleseren, men 'Session Storage' lagrer data for en enkelt sesjon og tømmes når nettleservinduet lukkes, mens 'Local Storage' lagrer data permanent på brukerens enhet.", "correct": true },
                        { "id": 1, "answer": "'Session Storage' og 'Local Storage' er begge metoder for å lagre data midlertidig på en server og kan nås fra hvilken som helst enhet som er koblet til internett.", "correct": false },
                        { "id": 2, "answer": "'Session Storage' og 'Local Storage' refererer til to forskjellige API-er for å manipulere DOM-elementer i JavaScript, der 'Session Storage' brukes for midlertidige endringer og 'Local Storage' for permanente endringer.", "correct": false },
                        { "id": 3, "answer": "'Session Storage' og 'Local Storage' er to metoder for å kryptere og lagre sensitiv informasjon i nettleseren, og de brukes ofte til autentisering og autorisasjon i webapplikasjoner.", "correct": false }
                    ]
                },
                {
                    "id": 144,
                    "question": "Hva er 'Responsive Images' og hvorfor er det viktig for webutvikling?",
                    "answers": [
                        { "id": 0, "answer": "'Responsive Images' er bilder som tilpasser seg skjermstørrelsen og oppløsningen til enheten som viser dem, og det er viktig for å forbedre ytelse og brukeropplevelse på nettsider på tvers av ulike enheter og nettverkshastigheter.", "correct": true },
                        { "id": 1, "answer": "'Responsive Images' er bilder som endrer farger og effekter avhengig av brukerens interaksjon med nettstedet, og det er viktig for å skape engasjerende visuelle opplevelser.", "correct": false },
                        { "id": 2, "answer": "'Responsive Images' refererer til bilder som er optimalisert for deling på sosiale medieplattformer, og det er viktig for å øke nettstedets synlighet og delbarhet.", "correct": false },
                        { "id": 3, "answer": "'Responsive Images' refererer til bilder som inneholder skjult informasjon eller metadata som kan tolkes av søkemotorer, og det er viktig for søkemotoroptimalisering (SEO).", "correct": false }
                    ]
                },
                {
                    "id": 145,
                    "question": "Hva er forskjellen mellom 'display: block', 'display: inline', og 'display: inline-block' i CSS?",
                    "answers": [
                        { "id": 0, "answer": "'display: block' gjør elementet til et blokkelement som tar opp hele bredden til foreldrelementet og starter på en ny linje, 'display: inline' gjør elementet til et innholdselement som bare tar opp plassen den trenger, og 'display: inline-block' gjør elementet til et innholdsblokk som tar opp plassen den trenger, men tillater likevel andre elementer å stå ved siden av det.", "correct": true },
                        { "id": 1, "answer": "'display: block' og 'display: inline' gjør begge elementet til blokkelementer som tar opp hele bredden til foreldrelementet og starter på en ny linje, mens 'display: inline-block' gjør elementet til et innholdselement som bare tar opp plassen den trenger.", "correct": false },
                        { "id": 2, "answer": "'display: block' og 'display: inline' gjør begge elementet til innholdselementer som bare tar opp plassen de trenger, mens 'display: inline-block' gjør elementet til et blokkelement som tar opp hele bredden til foreldrelementet.", "correct": false },
                        { "id": 3, "answer": "'display: block' og 'display: inline' gjør begge elementet til blokkelementer som tar opp hele bredden til foreldrelementet og starter på en ny linje, mens 'display: inline-block' gjør elementet til et innholdselement som også tar opp hele bredden til foreldrelementet.", "correct": false }
                    ]
                },
                {
                    "id": 146,
                    "question": "Hva er 'AJAX' og hvordan brukes det i webutvikling?",
                    "answers": [
                        { "id": 0, "answer": "'AJAX' står for Asynchronous JavaScript and XML, og det er en teknikk for å oppdatere deler av en webside uten å måtte laste inn hele siden på nytt, ved å sende og motta data i bakgrunnen via HTTP-forespørsler.", "correct": true },
                        { "id": 1, "answer": "'AJAX' står for Asynchronous JavaScript and XHTML, og det er en metode for å lage dynamiske nettapplikasjoner ved å bruke XML til å strukturere data i klient-server-kommunikasjon.", "correct": false },
                        { "id": 2, "answer": "'AJAX' står for Asynchronous JavaScript and XML, og det brukes til å lage animasjoner og overganger på nettsider ved hjelp av JavaScript og XML.", "correct": false },
                        { "id": 3, "answer": "'AJAX' står for Asynchronous JavaScript and XHTML, og det er en protokoll for å overføre data mellom klienten og serveren på en sikker måte uten å måtte laste inn hele nettsiden på nytt.", "correct": false }
                    ]
                },
                {
                    "id": 147,
                    "question": "Hva er 'MVC' (Model-View-Controller) og hvordan fungerer det i webutvikling?",
                    "answers": [
                        { "id": 0, "answer": "'MVC' er en programvarearkitektur som deler en applikasjon i tre komponenter: Modell, Visning og Kontroller, der Modellen representerer dataene, Visningen representerer brukergrensesnittet og Kontrolleren håndterer input og prosesserer dataene, og det fungerer ved å separere logikken for data, presentasjon og kontroll, noe som gjør koden mer modulær og vedlikeholdbar.", "correct": true },
                        { "id": 1, "answer": "'MVC' er en frontend-rammeverk som tillater utviklere å opprette dynamiske brukergrensesnitt ved å kombinere HTML, CSS og JavaScript, og det fungerer ved å organisere koden i moduler og komponenter for å forenkle utviklingsprosessen.", "correct": false },
                        { "id": 2, "answer": "'MVC' er en sikkerhetsprotokoll som brukes til å kryptere dataoverføringer mellom klient og server, og det fungerer ved å etablere en sikker tunnel for kommunikasjonen.", "correct": false },
                        { "id": 3, "answer": "'MVC' er en nettstandard som tillater ulike nettlesere å tolke og vise nettsider på samme måte, uavhengig av operativsystem og enhet, og det fungerer ved å definere regler og formater for HTML, CSS og JavaScript.", "correct": false }
                    ]
                },
                {
                    "id": 148,
                    "question": "Hva er 'Webpack' og hvordan brukes det i moderne webutvikling?",
                    "answers": [
                        { "id": 0, "answer": "'Webpack' er en modulpakker for JavaScript-applikasjoner som brukes til å pakke, transformere og optimalisere ressurser som JavaScript-filer, CSS-filer, bilder og skrifter, og det brukes til å strukturere og bygge komplekse webapplikasjoner.", "correct": true },
                        { "id": 1, "answer": "'Webpack' er et frontend-rammeverk som brukes til å lage dynamiske og interaktive brukergrensesnitt ved hjelp av HTML, CSS og JavaScript, og det brukes til å organisere og administrere koden for bedre ytelse og vedlikeholdbarhet.", "correct": false },
                        { "id": 2, "answer": "'Webpack' er en backend-teknologi som brukes til å bygge og administrere serverinfrastruktur for webapplikasjoner, og det brukes til å håndtere databehandling og ressursallokering på servernivå.", "correct": false },
                        { "id": 3, "answer": "'Webpack' er en skybasert tjeneste som tilbyr serverressurser for å kjøre webapplikasjoner uten behov for lokal hosting, og det brukes til å distribuere og skalere webapplikasjoner i stor skala.", "correct": false }
                    ]
                },
                {
                    "id": 149,
                    "question": "Hva er 'Single Page Application' (SPA) og hvordan fungerer det?",
                    "answers": [
                        { "id": 0, "answer": "'Single Page Application' er en type webapplikasjon som laster all nødvendig HTML, CSS og JavaScript ved den første innlasting, og dynamisk oppdaterer innholdet uten å laste inn nye sider fra serveren, ved å kommunisere med en backend-API for å hente og oppdatere data i bakgrunnen.", "correct": true },
                        { "id": 1, "answer": "'Single Page Application' er en nettapplikasjon som er begrenset til bare å ha én HTML-side, og all navigasjon og innholdsendringer skjer innenfor denne ene siden, uten behov for å laste inn nye dokumenter fra serveren.", "correct": false },
                        { "id": 2, "answer": "'Single Page Application' er en webapplikasjon som bruker bare én CSS-fil for å style alle sider, og dette gjør det enklere å administrere stilenheten og forbedre ytelsen.", "correct": false },
                        { "id": 3, "answer": "'Single Page Application' er en type nettapplikasjon som kjører helt på klientens side, uten behov for en server for å behandle og levere data, og dette gjør det lettere å skalere og distribuere applikasjonen.", "correct": false }
                    ]
                },
                {
                    "id": 150,
                    "question": "Hva er forskjellen mellom 'GET' og 'POST' i HTTP-forespørsler?",
                    "answers": [
                        { "id": 0, "answer": "'GET' brukes for å be om data fra en spesifisert ressurs, og dataene sendes i URL-en som en del av forespørselen, mens 'POST' brukes for å sende data til en server for å opprette eller oppdatere ressursen, og dataene sendes i forespørselskroppen.", "correct": true },
                        { "id": 1, "answer": "'GET' brukes for å sende data til en server for å opprette eller oppdatere ressursen, og dataene sendes i URL-en som en del av forespørselen, mens 'POST' brukes for å be om data fra en spesifisert ressurs.", "correct": false },
                        { "id": 2, "answer": "'GET' brukes for å sende data til en server for å opprette eller oppdatere ressursen, og dataene sendes i forespørselskroppen, mens 'POST' brukes for å be om data fra en spesifisert ressurs.", "correct": false },
                        { "id": 3, "answer": "'GET' brukes for å be om data fra en spesifisert ressurs, og dataene sendes i forespørselskroppen, mens 'POST' brukes for å sende data til en server for å opprette eller oppdatere ressursen, og dataene sendes i URL-en som en del av forespørselen.", "correct": false }
                    ]
                },
                {
                    "id": 151,
                    "question": "Hva er 'Responsive Web Design' (RWD) og hvorfor er det viktig?",
                    "answers": [
                        { "id": 0, "answer": "'Responsive Web Design' er en tilnærming til webdesign som tar sikte på å lage nettsteder som gir en optimal visningsopplevelse på tvers av ulike enheter og skjermstørrelser, ved å tilpasse og endre layouten og innholdet dynamisk basert på enheten.", "correct": true },
                        { "id": 1, "answer": "'Responsive Web Design' er en metode for å lage nettsider som automatisk justerer seg basert på brukerens preferanser og tidligere interaksjoner med nettstedet, og det er viktig for å forbedre brukerengasjementet.", "correct": false },
                        { "id": 2, "answer": "'Responsive Web Design' er en tilnærming til webdesign som fokuserer på å skape nettsider som rangerer høyt i søkemotorresultatene, og det er viktig for å øke nettstedets synlighet og trafikk.", "correct": false },
                        { "id": 3, "answer": "'Responsive Web Design' er en teknikk for å implementere avanserte animasjoner og overganger på nettsider ved hjelp av JavaScript og CSS, og det er viktig for å skape engasjerende brukeropplevelser.", "correct": false }
                    ]
                },
                {
                    "id": 152,
                    "question": "Hva er 'CSS Grid' og hvordan fungerer det?",
                    "answers": [
                        { "id": 0, "answer": "'CSS Grid' er en to-dimensjonal layoutmodul i CSS som lar utviklere opprette komplekse layouter ved å definere rader og kolonner, og deretter plassere elementer i cellene i rutenettet, og det gir en mer fleksibel og kraftig layoutkontroll enn tradisjonelle metoder som 'float' og 'flexbox'.", "correct": true },
                        { "id": 1, "answer": "'CSS Grid' er en CSS-egenskap som brukes til å definere det totale området som et element skal dekke på en webside, og det fungerer ved å angi grenser, marginer og polstring for elementet.", "correct": false },
                        { "id": 2, "answer": "'CSS Grid' er en JavaScript-basert rammeverk for å lage interaktive tabeller og datagrids på nettsider, og det fungerer ved å koble datakilder til tabellstrukturer.", "correct": false },
                        { "id": 3, "answer": "'CSS Grid' er en teknikk for å lage dynamiske og responsiv design på nettsider ved å bruke relative enheter og prosentandeler for å definere størrelsen og plasseringen av elementer, og det fungerer ved å tilpasse seg endringer i skjermstørrelsen og enhetsorienteringen.", "correct": false }
                    ]
                },
                {
                    "id": 153,
                    "question": "Hva er 'Semantic HTML' og hvorfor er det viktig for tilgjengelighet og SEO?",
                    "answers": [
                        { "id": 0, "answer": "'Semantic HTML' refererer til bruken av HTML-elementer som har en betydning knyttet til innholdet de omslutter, og det er viktig for tilgjengelighet og SEO fordi det gjør det lettere for skjermlesere og søkemotorer å forstå strukturen og betydningen av innholdet på en nettside.", "correct": true },
                        { "id": 1, "answer": "'Semantic HTML' refererer til bruken av HTML-elementer med en semantisk rolle, som å lage lister og tabeller, og det er viktig for tilgjengelighet og SEO fordi det forbedrer nettstedets rangering i søkemotorresultatene.", "correct": false },
                        { "id": 2, "answer": "'Semantic HTML' refererer til bruken av HTML-elementer med avanserte visuelle effekter og animasjoner, og det er viktig for tilgjengelighet og SEO fordi det skaper engasjerende brukeropplevelser.", "correct": false },
                        { "id": 3, "answer": "'Semantic HTML' refererer til bruken av HTML-elementer med en spesifisert stil og utseende, og det er viktig for tilgjengelighet og SEO fordi det gjør det lettere for utviklere å style nettstedet konsistent på tvers av ulike nettlesere og enheter.", "correct": false }
                    ]
                },
                {
                    "id": 154,
                    "question": "Hva er forskjellen mellom 'let', 'const' og 'var' i JavaScript for deklarering av variabler?",
                    "answers": [
                        { "id": 0, "answer": "'let' tillater re-deklarasjon av variabler, 'const' tillater ikke re-attribuering etter deklarasjon, mens 'var' har funksjonsomfang (function scope) og tillater re-deklarasjon og re-attribuering.", "correct": true },
                        { "id": 1, "answer": "'let' tillater ikke re-deklarasjon av variabler, 'const' har blokkomfang (block scope) og tillater re-attribuering etter deklarasjon, mens 'var' har funksjonsomfang og tillater re-deklarasjon og re-attribuering.", "correct": false },
                        { "id": 2, "answer": "'let' har blokkomfang, 'const' har funksjonsomfang, mens 'var' har globalt omfang (global scope) og tillater re-deklarasjon og re-attribuering.", "correct": false },
                        { "id": 3, "answer": "'let' har globalt omfang, 'const' har blokkomfang, mens 'var' har funksjonsomfang og tillater re-deklarasjon og re-attribuering.", "correct": false }
                    ]
                },
                {
                    "id": 155,
                    "question": "Hva er 'CORS' og hvordan håndteres det i webutvikling?",
                    "answers": [
                        { "id": 0, "answer": "'CORS' står for Cross-Origin Resource Sharing og er en sikkerhetsmekanisme som hindrer nettlesere fra å sende AJAX-forespørsler til en annen domene enn det som vert nettstedet, og det håndteres ved å angi og konfigurere riktige HTTP-overskrifter på serveren for å tillate eller begrense tilgangen til ressurser fra andre domener.", "correct": true },
                        { "id": 1, "answer": "'CORS' står for Cross-Origin Request Scripting og er en teknikk for å sende skadelig JavaScript-kode fra et eksternt domene til et annet, og det håndteres ved å begrense bruk av tredjeparts-skript i nettleseren.", "correct": false },
                        { "id": 2, "answer": "'CORS' står for Cross-Origin Resource Sharing og er en metode for å dele ressurser mellom forskjellige HTML-dokumenter på samme domene, og det håndteres ved å aktivere delingsfunksjoner i nettleseren.", "correct": false },
                        { "id": 3, "answer": "'CORS' står for Cross-Origin Request Security og er en protokoll for å sikre at AJAX-forespørsler mellom ulike domener er kryptert og autentisert, og det håndteres ved å implementere SSL-sertifikater på serveren.", "correct": false }
                    ]
                },
                {
                    "id": 156,
                    "question": "Hva er 'Progressive Web App' (PWA) og hva er fordelene ved å implementere det?",
                    "answers": [
                        { "id": 0, "answer": "'Progressive Web App' er en type webapplikasjon som kombinerer beste praksis fra både websider og mobile apper, og fordelene ved å implementere det inkluderer raskere lastetid, offline tilgjengelighet, push-varsler og muligheten til å installere appen på hjemskjermen til enheten.", "correct": true },
                        { "id": 1, "answer": "'Progressive Web App' er en metode for å utvikle webapplikasjoner som kun er kompatible med spesifikke nettlesere, og fordelene ved å implementere det inkluderer en konsistent brukeropplevelse på tvers av ulike enheter.", "correct": false },
                        { "id": 2, "answer": "'Progressive Web App' er en teknikk for å lage webapplikasjoner med avanserte visuelle effekter og animasjoner, og fordelene ved å implementere det inkluderer engasjerende brukeropplevelser og høy synlighet i søkemotorresultatene.", "correct": false },
                        { "id": 3, "answer": "'Progressive Web App' er en standard for å utvikle webapplikasjoner som er fullstendig uavhengige av nettverkstilgang, og fordelene ved å implementere det inkluderer høy sikkerhet og beskyttelse mot skadelig programvare.", "correct": false }
                    ]
                },
                {
                    "id": 157,
                    "question": "Hva er 'JSON Web Token' (JWT) og hvordan brukes det for autentisering?",
                    "answers": [
                        { "id": 0, "answer": "'JSON Web Token' er en standard for å lage kompakte, selvstendige og sikre tokens som kan overføre informasjon mellom parter, og det brukes ofte for autentisering ved å inkludere brukerens identifikasjonsinformasjon i et signert JWT som sendes mellom klienten og serveren.", "correct": true },
                        { "id": 1, "answer": "'JSON Web Token' er en protokoll for å kryptere dataoverføringer mellom klienten og serveren for å sikre konfidensialitet, integritet og autentisering, og det brukes for å oppnå sikker datautveksling.", "correct": false },
                        { "id": 2, "answer": "'JSON Web Token' er en metode for å lagre sensitiv informasjon som passord og brukernavn på klientens side, og det brukes for å unngå unødvendige serverforespørsler for autentisering.", "correct": false },
                        { "id": 3, "answer": "'JSON Web Token' er en standard for å komprimere og redusere størrelsen på JSON-data før de sendes over nettverket, og det brukes for å forbedre ytelsen og responstiden til webapplikasjoner.", "correct": false }
                    ]
                },
                {
                    "id": 158,
                    "question": "Hva er 'npm' og hvordan brukes det i JavaScript-prosjekter?",
                    "answers": [
                        { "id": 0, "answer": "'npm' står for Node Package Manager og er et verktøy som brukes til å administrere pakker og avhengigheter i JavaScript-prosjekter, og det brukes til å installere, oppdatere, og fjerne pakker fra prosjektet ved å bruke npm-kommandoer i terminalen.", "correct": true },
                        { "id": 1, "answer": "'npm' står for Node Package Module og er en modul som brukes til å strukturere og organisere koden i JavaScript-prosjekter, og det brukes til å importere og eksportere funksjoner og variabler mellom forskjellige filer.", "correct": false },
                        { "id": 2, "answer": "'npm' står for Node Package Manifest og er en JSON-fil som inneholder metadata og konfigurasjonsinformasjon om et JavaScript-prosjekt, og det brukes til å definere prosjektavhengigheter, versjonsnumre og kommandolinjealternativer.", "correct": false },
                        { "id": 3, "answer": "'npm' står for Node Package Middleware og er et verktøy som brukes til å administrere mellomvarefunksjoner i Node.js-applikasjoner, og det brukes til å legge til, fjerne, og konfigurere mellomvarekomponenter i applikasjonens kjøretid.", "correct": false }
                    ]
                },
                {
                    "id": 159,
                    "question": "Hva er forskjellen mellom '=='' og '===' i JavaScript?",
                    "answers": [
                        { "id": 0, "answer": "'==' sammenligner verdier uten å sjekke typen, mens '===' sammenligner både verdien og typen til to verdier.", "correct": true },
                        { "id": 1, "answer": "'==' sammenligner verdier og typen til to verdier, mens '===' sammenligner bare verdien.", "correct": false },
                        { "id": 2, "answer": "'==' og '===' er synonymer og kan brukes om hverandre i alle tilfeller.", "correct": false },
                        { "id": 3, "answer": "'==' og '===' er begge brukt til å tildele verdier til variabler i JavaScript.", "correct": false }
                    ]
                },
                {
                    "id": 160,
                    "question": "Hva er en SQL-injeksjon og hvordan kan den unngås?",
                    "answers": [
                        { "id": 0, "answer": "En SQL-injeksjon er en teknikk der en angriper setter inn skadelige SQL-kommandoer i en SQL-forespørsel for å manipulere databasen. Det kan unngås ved å bruke parameteriserte spørringer eller forberedte uttalelser, og ved å validere og desinfisere brukerinput før det blir brukt i SQL-forespørsler.", "correct": true },
                        { "id": 1, "answer": "En SQL-injeksjon er en teknikk der en angriper stjeler data fra en SQL-database ved å utnytte svakheter i autentiseringsmekanismer. Det kan unngås ved å kryptere dataoverføringer mellom applikasjonen og databasen.", "correct": false },
                        { "id": 2, "answer": "En SQL-injeksjon er en metode for å legge til ekstra data i en SQL-database ved hjelp av manipulerte SQL-kommandoer. Det kan unngås ved å begrense tilgangen til databasen og bruke sterke autentiseringsmekanismer.", "correct": false },
                        { "id": 3, "answer": "En SQL-injeksjon er en form for databasedriftfeil som oppstår når det er problemer med SQL-serveren. Det kan unngås ved å oppdatere SQL-serverprogramvaren til den nyeste versjonen.", "correct": false }
                    ]
                },
                {
                    "id": 161,
                    "question": "Hva er 'AJAX' og hvordan brukes det i webutvikling?",
                    "answers": [
                        { "id": 0, "answer": "'AJAX' står for Asynchronous JavaScript and XML, og det er en teknikk som brukes til å lage dynamiske nettsider ved å sende og motta data fra en server uten å måtte laste inn hele nettsiden på nytt. Det brukes ved å sende HTTP-forespørsler fra JavaScript til serveren og behandle responsen asynkront.", "correct": true },
                        { "id": 1, "answer": "'AJAX' står for Advanced JavaScript and XML, og det er et rammeverk for å utvikle avanserte JavaScript-applikasjoner. Det brukes ved å integrere AJAX-biblioteker som jQuery i JavaScript-koden.", "correct": false },
                        { "id": 2, "answer": "'AJAX' står for Asynchronous JavaScript and XML, og det er en metode for å bygge asynkrone API-forespørsler i JavaScript-applikasjoner. Det brukes ved å lage spesifikke AJAX-endepunkter på serveren for å behandle dataforespørsler fra klienten.", "correct": false },
                        { "id": 3, "answer": "'AJAX' står for Asynchronous JavaScript and XML, og det er en protokoll for å kryptere og sikre dataoverføringer mellom klienten og serveren. Det brukes ved å integrere AJAX-komponenter i HTML-former for å sikre konfidensialitet og integritet i dataoverføringer.", "correct": false }
                    ]
                },
                {
                    "id": 162,
                    "question": "Hva er 'Cross-Site Scripting' (XSS) og hvordan kan det unngås?",
                    "answers": [
                        { "id": 0, "answer": "'Cross-Site Scripting' (XSS) er en type nettangrep der angripere injiserer skadelig kode i nettsteder som tillater brukergenerert innhold. Det kan unngås ved å validere og desinfisere brukerinput, begrense tilgangen til DOM, og bruke sikre metoder for å manipulere DOM.", "correct": true },
                        { "id": 1, "answer": "'Cross-Site Scripting' (XSS) er en teknikk der angripere stjeler informasjon fra en brukers økter ved å utnytte svakheter i krypteringen av dataoverføringer mellom klienten og serveren. Det kan unngås ved å implementere HTTPS-protokollen for å kryptere dataoverføringer.", "correct": false },
                        { "id": 2, "answer": "'Cross-Site Scripting' (XSS) er en type databasedriftfeil som oppstår når det er problemer med SQL-serveren. Det kan unngås ved å oppdatere SQL-serverprogramvaren til den nyeste versjonen.", "correct": false },
                        { "id": 3, "answer": "'Cross-Site Scripting' (XSS) er en metode for å manipulere data i en SQL-database ved hjelp av skadelige SQL-kommandoer. Det kan unngås ved å bruke sterke autentiseringsmekanismer og begrense tilgangen til databasen.", "correct": false }
                    ]
                },
                {
                    "id": 163,
                    "question": "Hva er forskjellen mellom HTTP og HTTPS, og hvorfor er HTTPS viktig for sikkerheten på nettet?",
                    "answers": [
                        { "id": 0, "answer": "HTTP står for Hypertext Transfer Protocol, mens HTTPS står for Hypertext Transfer Protocol Secure. HTTPS bruker SSL/TLS-kryptering for å sikre dataoverføringer mellom klienten og serveren, mens HTTP overfører data i klartekst. HTTPS er viktig for sikkerheten på nettet fordi det beskytter mot avlytting, datainnhøsting og manipulasjon av dataoverføringer.", "correct": true },
                        { "id": 1, "answer": "HTTP står for Hypertext Transfer Protocol, mens HTTPS står for Hypertext Encryption Protocol. HTTPS bruker en kraftigere krypteringsalgoritme enn HTTP for å beskytte dataoverføringer. HTTPS er viktig for sikkerheten på nettet fordi det sikrer mot nettverksfeil og dataslipp.", "correct": false },
                        { "id": 2, "answer": "HTTP står for Hypertext Transfer Protocol, mens HTTPS står for Hypertext Secure Protocol. HTTPS bruker en mer effektiv dataoverføringsprotokoll enn HTTP for å sikre lynrask ytelse på nettet. HTTPS er viktig for sikkerheten på nettet fordi det gir bedre kompatibilitet med moderne nettlesere.", "correct": false },
                        { "id": 3, "answer": "HTTP står for Hypertext Transmission Protocol, mens HTTPS står for Hypertext Security Protocol. HTTPS bruker avanserte nettverkssikkerhetsalgoritmer for å beskytte mot DDoS-angrep og andre nettverksangrep. HTTPS er viktig for sikkerheten på nettet fordi det gir bedre responsivitet og nettverkshastighet.", "correct": false }
                    ]
                },
                {
                    "id": 164,
                    "question": "Hva er 'JWT' (JSON Web Token) og hvordan fungerer det i autentiseringssystemer?",
                    "answers": [
                        { "id": 0, "answer": "'JWT' (JSON Web Token) er en sikkerhetsstandard for å lage kompakte og selvstendige tokens som kan overføre informasjon mellom parter på en pålitelig måte. I autentiseringssystemer fungerer JWT ved at en server genererer et JWT etter at en bruker har autentisert seg, og inkluderer brukerens identifikasjonsinformasjon og eventuelle tilleggsegenskaper i tokenet. Deretter sender serveren JWT til klienten som kan lagre det lokalt og inkludere det i fremtidige forespørsler til serveren for å bevise sin identitet og få tilgang til beskyttede ressurser.", "correct": true },
                        { "id": 1, "answer": "'JWT' (JSON Web Token) er en JavaScript-basert autentiseringsprotokoll for å håndtere brukerinnlogging og sesjonshåndtering på nettet. I autentiseringssystemer fungerer JWT ved å sende brukerens påloggingsdata i klartekst over nettverket til serveren for autentisering og autorisasjon.", "correct": false },
                        { "id": 2, "answer": "'JWT' (JSON Web Token) er en standard for å lage dynamiske nettverkstilstander i JavaScript-applikasjoner. I autentiseringssystemer fungerer JWT ved å bruke klientens nettverksresurser til å opprettholde påloggingsstatusen og brukerens tilgangstillatelser mellom forskjellige økter.", "correct": false },
                        { "id": 3, "answer": "'JWT' (JSON Web Token) er en proprietær autentiseringsprotokoll utviklet av store teknologiselskaper for å beskytte brukerens personlige data på nettet. I autentiseringssystemer fungerer JWT ved å validere brukerens konto og tilgangstillatelser ved hjelp av sikre nettverkskommunikasjonsprotokoller som SSL/TLS.", "correct": false }
                    ]
                },
                {
                    "id": 165,
                    "question": "Hva er forskjellen mellom en 'session' og en 'cookie' i webutvikling, og hvordan brukes de for å opprettholde brukerens tilstand?",
                    "answers": [
                        { "id": 0, "answer": "En 'session' er en midlertidig lagringsenhet på serveren som opprettes når en bruker logger inn på en nettside, mens en 'cookie' er en liten tekstfil som lagres lokalt på brukerens enhet av nettleseren. En 'session' brukes til å lagre brukerens tilstand og opplysninger om økten på serveren, mens en 'cookie' brukes til å lagre data lokalt på brukerens enhet og sendes til serveren med hver forespørsel.", "correct": true },
                        { "id": 1, "answer": "En 'session' er en spesiell type informasjonskapsel som brukes til å lagre sensitiv brukerinformasjon på serveren, mens en 'cookie' er en standard datafil som lagres på brukerens enhet for å spore brukerens aktiviteter på nettstedet. En 'session' brukes til å lagre informasjon som kan leses og endres av serveren, mens en 'cookie' er begrenset til lesing og endring av klientens nettleser.", "correct": false },
                        { "id": 2, "answer": "En 'session' er en HTTP-informasjonskapsel som brukes til å lagre brukerens påloggingsstatus og preferanser på serveren, mens en 'cookie' er en midlertidig lagringsenhet i nettleserens minne som brukes til å opprettholde brukerens tilstand under en økt. En 'session' brukes til å sikre at brukeren forblir logget inn på nettsiden, mens en 'cookie' brukes til å lagre brukerens surfehistorikk og personlige innstillinger.", "correct": false },
                        { "id": 3, "answer": "En 'session' er en liten tekstfil som lagres på brukerens enhet for å lagre midlertidig informasjon om brukerens surfeaktiviteter, mens en 'cookie' er en dynamisk lagringsenhet på serveren som brukes til å lagre brukerens påloggingsstatus og tilgangstillatelser. En 'session' brukes til å spore brukerens økter på nettstedet, mens en 'cookie' brukes til å lagre personlige preferanser og surfehistorikk.", "correct": false }
                    ]
                },
                {
                    "id": 166,
                    "question": "Hva er 'CORS' (Cross-Origin Resource Sharing) og hvordan fungerer det? Gi eksempler på situasjoner der CORS-problemer kan oppstå og hvordan de kan løses.",
                    "answers": [
                        { "id": 0, "answer": "'CORS' er en sikkerhetsmekanisme i nettlesere som begrenser ressursforespørsler fra en nettside til en annen domene. Det fungerer ved å inkludere HTTP-overskrifter som tillater eller nekter tilgang til ressurser basert på kilde- og mål-domener. CORS-problemer kan oppstå når en nettleser blokkerer ressursforespørsler på grunn av kryssdomenereferanse. Dette kan løses ved å konfigurere serveren til å sende riktige CORS-overskrifter, for eksempel 'Access-Control-Allow-Origin'.", "correct": true },
                        { "id": 1, "answer": "'CORS' er en teknikk som tillater deling av ressurser mellom to nettsteder ved å validere og signere forespørsler og svar. Det fungerer ved å bruke asymmetrisk kryptering for å sikre kommunikasjonen mellom klient og server. CORS-problemer kan oppstå når SSL/TLS-sertifikater er ugyldige eller utløpt. Dette kan løses ved å fornye eller validere SSL/TLS-sertifikatene.", "correct": false },
                        { "id": 2, "answer": "'CORS' er en protokoll som brukes til å optimalisere og akselerere ressursforespørsler ved å implementere en mellomvarelagringsmekanisme for å lagre ofte brukte ressurser på klientens enhet. Det fungerer ved å overføre ressurser mellom klienten og serveren i bakgrunnen. CORS-problemer kan oppstå når mellomvarelageret ikke er riktig konfigurert. Dette kan løses ved å justere mellomvarelagerinnstillingene på serveren.", "correct": false },
                        { "id": 3, "answer": "'CORS' er en sikkerhetsteknikk som bruker komplekse algoritmer for å autentisere brukeren og beskytte mot uautorisert tilgang til ressurser. Det fungerer ved å generere og validere digitale signaturer for hver ressursforespørsel. CORS-problemer kan oppstå når digitale signaturer ikke stemmer overens. Dette kan løses ved å generere og validere signaturer på riktig måte.", "correct": false }
                    ]
                },
                {
                    "id": 167,
                    "question": "Hva er forskjellen mellom 'sessionStorage' og 'localStorage' i JavaScript, og hvordan påvirker de ytelsen til en nettapplikasjon?",
                    "answers": [
                        { "id": 0, "answer": "'sessionStorage' og 'localStorage' er to måter å lagre data lokalt på klientens enhet i JavaScript. Forskjellen ligger i levetiden til dataene: 'sessionStorage' lagrer data for en økt (når nettleservinduet er åpent), mens 'localStorage' lagrer data permanent (selv etter at nettleseren er lukket og åpnet på nytt). Ytelsen påvirkes av antall data, lagring og hentingstid. 'localStorage' har høyere lagringskapasitet, men kan påvirke ytelsen negativt ved store datamengder.", "correct": true },
                        { "id": 1, "answer": "'sessionStorage' og 'localStorage' er to metoder for å håndtere brukersesjoner i JavaScript. 'sessionStorage' lagrer data for økten, mens 'localStorage' lagrer data permanent. Ytelsen påvirkes minimalt da de bruker optimaliserte algoritmer for datahåndtering. Begge har samme lagringskapasitet uavhengig av datamengden.", "correct": false },
                        { "id": 2, "answer": "'sessionStorage' og 'localStorage' er to alternativer for å implementere datahåndtering i JavaScript-applikasjoner. Forskjellen ligger i synkron eller asynkron tilgang til dataene. 'sessionStorage' bruker asynkron tilgang for raskere ytelse, mens 'localStorage' bruker synkron tilgang for bedre datatilgjengelighet.", "correct": false },
                        { "id": 3, "answer": "'sessionStorage' og 'localStorage' er to teknikker for å håndtere datakapsler i JavaScript. 'sessionStorage' lagrer data midlertidig for økten, mens 'localStorage' lagrer data permanent. Ytelsen påvirkes minimalt, da de bruker avanserte kapslingsalgoritmer for effektiv datahåndtering.", "correct": false }
                    ]
                },
                {
                    "id": 168,
                    "question": "Hva er 'Service Workers' i Progressive Web Apps (PWA), og hvordan bidrar de til å forbedre ytelsen og opplevelsen for brukeren?",
                    "answers": [
                        { "id": 0, "answer": "'Service Workers' er JavaScript-skript som kjører i bakgrunnen og håndterer nettverksforespørsler og push-varsler i Progressive Web Apps (PWA). De forbedrer ytelsen ved å muliggjøre kaching av ressurser, slik at appen kan fungere offline. De forbedrer også opplevelsen ved å tillate push-varsler selv når nettleseren er lukket.", "correct": true },
                        { "id": 1, "answer": "'Service Workers' er klientskript som bruker lokalt datalager for å lagre og hente appdata i Progressive Web Apps (PWA). De forbedrer ytelsen ved å redusere behovet for hyppige serverforespørsler. De forbedrer også opplevelsen ved å gi raskere responstid for datahenting.", "correct": false },
                        { "id": 2, "answer": "'Service Workers' er serverbaserte skript som håndterer autentisering og autorisasjon i Progressive Web Apps (PWA). De forbedrer ytelsen ved å gi en sikker måte å håndtere brukeridentitet på. De forbedrer også opplevelsen ved å tilby sømløs tilgang til beskyttede ressurser.", "correct": false },
                        { "id": 3, "answer": "'Service Workers' er JavaScript-biblioteker som brukes til å implementere brukerstyrte interaksjoner i Progressive Web Apps (PWA). De forbedrer ytelsen ved å gi raskere navigasjon og datainnlasting. De forbedrer også opplevelsen ved å tilby en mer interaktiv brukeropplevelse.", "correct": false }
                    ]
                },
                {
                    "id": 169,
                    "question": "Hva er 'Lazy Loading' og hvordan kan det implementeres i nettapplikasjoner for å forbedre ytelsen?",
                    "answers": [
                        { "id": 0, "answer": "'Lazy Loading' er en teknikk der ressurser lastes inn i en nettapplikasjon bare når de er nødvendige. Dette kan omfatte bilder, JavaScript-filer eller annet innhold som ikke er synlig på skjermen når siden lastes. Det forbedrer ytelsen ved å redusere lastetiden og båndbreddeforbruket til nettstedet.", "correct": true },
                        { "id": 1, "answer": "'Lazy Loading' er en metode for å redusere kompleksiteten til nettapplikasjoner ved å utsette lasting av ressurser til en senere tid. Dette gjør at applikasjonen laster raskere og gir en bedre brukeropplevelse. Lazy Loading implementeres ved å bruke avanserte kodingsmetoder som utsetter lasting av ressurser til de trengs.", "correct": false },
                        { "id": 2, "answer": "'Lazy Loading' er en protokoll som brukes til å overføre store datamengder i nettapplikasjoner i små, håndterbare deler. Dette forbedrer ytelsen ved å redusere tiden det tar å laste ned og behandle dataene. Lazy Loading implementeres ved å konfigurere serveren til å sende data i segmenterte pakker.", "correct": false },
                        { "id": 3, "answer": "'Lazy Loading' er en sikkerhetsfunksjon som begrenser tilgangen til sensitive ressurser i nettapplikasjoner. Dette forbedrer ytelsen ved å beskytte mot uautorisert tilgang og angrep. Lazy Loading implementeres ved å bruke avanserte autentiserings- og autorisasjonsmetoder.", "correct": false }
                    ]
                },
                {
                    "id": 170,
                    "question": "Hva er 'Progressive Enhancement' og hvordan skiller det seg fra 'Graceful Degradation' i webdesign?",
                    "answers": [
                        { "id": 0, "answer": "'Progressive Enhancement' er en designfilosofi som fokuserer på å bygge grunnleggende funksjonalitet som er tilgjengelig for alle brukere, uavhengig av nettleser eller enhet. Deretter legges det til flere funksjoner for mer avanserte enheter og nettlesere. 'Graceful Degradation', derimot, fokuserer på å bygge en fullstendig fungerende versjon av nettstedet og deretter gjøre tilpasninger for eldre eller mindre avanserte nettlesere. 'Progressive Enhancement' er en 'top-down'-tilnærming, mens 'Graceful Degradation' er 'bottom-up'.", "correct": true },
                        { "id": 1, "answer": "'Progressive Enhancement' er en teknikk for å forbedre ytelsen til nettapplikasjoner ved å legge til avanserte funksjoner gradvis etter hvert som brukerens enhet og nettleser støtter dem. 'Graceful Degradation', derimot, fokuserer på å redusere funksjonaliteten til nettapplikasjonen for å gjøre den kompatibel med eldre nettlesere og enheter. 'Progressive Enhancement' er en 'bottom-up'-tilnærming, mens 'Graceful Degradation' er 'top-down'.", "correct": false },
                        { "id": 2, "answer": "'Progressive Enhancement' er en metode for å øke synligheten til nettapplikasjoner ved å forbedre rangeringen i søkemotorer. 'Graceful Degradation', derimot, fokuserer på å redusere nettstedets funksjonalitet for å tilpasse seg eldre eller mindre avanserte enheter og nettlesere. 'Progressive Enhancement' er en 'top-down'-tilnærming, mens 'Graceful Degradation' er 'bottom-up'.", "correct": false },
                        { "id": 3, "answer": "'Progressive Enhancement' er en tilnærming som fokuserer på å forbedre brukeropplevelsen ved å legge til nye funksjoner gradvis etter hvert som de blir tilgjengelige. 'Graceful Degradation', derimot, fokuserer på å redusere funksjonaliteten til nettapplikasjonen for å sikre kompatibilitet med eldre nettlesere og enheter. 'Progressive Enhancement' og 'Graceful Degradation' er to sider av samme mynt og kan implementeres sammen for å forbedre nettstedets ytelse og brukeropplevelse.", "correct": false }
                    ]
                },
                {
                    "id": 171,
                    "question": "Hva er 'WebSockets' og hvordan skiller de seg fra tradisjonelle HTTP-forespørsler i nettapplikasjoner?",
                    "answers": [
                        { "id": 0, "answer": "'WebSockets' er en teknologi som tillater toveis kommunikasjon mellom klienten og serveren i sanntid. De skiller seg fra tradisjonelle HTTP-forespørsler ved å opprette en vedvarende forbindelse som tillater dataoverføring i begge retninger når som helst. Dette muliggjør sanntidsoppdateringer uten behov for hyppige forespørsler. 'WebSockets' er ideelle for chatapplikasjoner, spill og andre applikasjoner som krever sanntidskommunikasjon.", "correct": true },
                        { "id": 1, "answer": "'WebSockets' er en teknologi som brukes til å optimalisere nettverkskommunikasjonen i nettapplikasjoner ved å redusere forsinkelsen og båndbreddeforbruket. De skiller seg fra tradisjonelle HTTP-forespørsler ved å bruke en mer effektiv protokoll for dataoverføring. Dette muliggjør raskere dataoverføring og bedre ytelse for applikasjonen.", "correct": false },
                        { "id": 2, "answer": "'WebSockets' er en protokoll som brukes til å implementere sikker kommunikasjon mellom klienten og serveren i nettapplikasjoner. De skiller seg fra tradisjonelle HTTP-forespørsler ved å bruke asymmetrisk kryptering for å beskytte dataene under overføring. Dette muliggjør trygg datautveksling uten risiko for avlytting eller manipulasjon.", "correct": false },
                        { "id": 3, "answer": "'WebSockets' er en teknologi som brukes til å sikre tilkoblingen mellom klienten og serveren i nettapplikasjoner. De skiller seg fra tradisjonelle HTTP-forespørsler ved å opprette en kryptert tunnel for dataoverføring. Dette muliggjør sikker datautveksling selv over usikre nettverk.", "correct": false }
                    ]
                },
                {
                    "id": 172,
                    "question": "Hva er 'Content Security Policy' (CSP) og hvordan bidrar det til å forbedre sikkerheten til nettapplikasjoner?",
                    "answers": [
                        { "id": 0, "answer": "'Content Security Policy' (CSP) er en sikkerhetspolicy som definerer hvilke typer ressurser en nettapplikasjon har lov til å laste inn. Det begrenser potensielle angrepsvektorer, for eksempel cross-site scripting (XSS), clickjacking og datainnsprøyting, ved å tillate bare kjente og godkjente kilder for innhold og skript. CSP bidrar til å forhindre skadelig kodeutførelse og beskytter brukerens data mot uautorisert tilgang.", "correct": true },
                        { "id": 1, "answer": "'Content Security Policy' (CSP) er en protokoll som brukes til å beskytte sensitive data i nettapplikasjoner mot uautorisert tilgang. Den definerer retningslinjer for hvordan dataene skal behandles og hvem som har lov til å få tilgang til dem. CSP bidrar til å sikre personvern og overholdelse av forskrifter som GDPR og CCPA.", "correct": false },
                        { "id": 2, "answer": "'Content Security Policy' (CSP) er en praksis som brukes til å optimalisere ytelsen til nettapplikasjoner ved å begrense tilgangen til ressurser som ikke er nødvendige for funksjonaliteten. Det reduserer belastningen på nettverket og forbedrer lastetiden for siden. CSP bidrar til å gi en raskere og mer responsiv brukeropplevelse.", "correct": false },
                        { "id": 3, "answer": "'Content Security Policy' (CSP) er en protokoll som brukes til å sikre kommunikasjonen mellom klienten og serveren i nettapplikasjoner. Den krypterer dataene som sendes over nettverket for å forhindre avlytting eller manipulasjon. CSP bidrar til å sikre konfidensialitet og integritet for dataene som overføres.", "correct": false }
                    ]
                },
                {
                    "id": 173,
                    "question": "Hva er 'Single Page Applications' (SPAs) og hvordan skiller de seg fra tradisjonelle flerside-applikasjoner?",
                    "answers": [
                        { "id": 0, "answer": "'Single Page Applications' (SPAs) er nettapplikasjoner som laster inn all nødvendig kode og ressurser ved oppstart og deretter dynamisk oppdaterer innholdet i respons på brukerinteraksjon. De skiller seg fra tradisjonelle flerside-applikasjoner ved at de ikke laster inn nye sider fra serveren, men i stedet oppdaterer innholdet i eksisterende siden uten å laste siden på nytt. Dette gir en raskere og mer responsiv brukeropplevelse.", "correct": true },
                        { "id": 1, "answer": "'Single Page Applications' (SPAs) er nettapplikasjoner som bruker kun en enkelt HTML-fil for å vise all innhold. De skiller seg fra tradisjonelle flerside-applikasjoner ved å laste inn all nødvendig kode og ressurser ved oppstart, og deretter dynamisk oppdatere innholdet uten å laste nye sider fra serveren. Dette reduserer serverbelastningen og forbedrer ytelsen til applikasjonen.", "correct": false },
                        { "id": 2, "answer": "'Single Page Applications' (SPAs) er nettapplikasjoner som tillater brukerne å utføre handlinger uten å laste inn en ny side fra serveren. De skiller seg fra tradisjonelle flerside-applikasjoner ved å bruke avanserte klientbaserte teknologier som AJAX og WebSockets for å oppnå sømløs dynamisk innlasting av innhold. Dette gir en raskere og mer responsiv brukeropplevelse.", "correct": false },
                        { "id": 3, "answer": "'Single Page Applications' (SPAs) er nettapplikasjoner som er optimalisert for mobilbrukere. De skiller seg fra tradisjonelle flerside-applikasjoner ved å tilpasse seg skjermstørrelsen og enheten til brukeren for å gi en bedre brukeropplevelse. Dette oppnås ved å bruke responsivt design og progressive webapplikasjoner (PWAs).", "correct": false }
                    ]
                },
                {
                    "id": 174,
                    "question": "Hva er 'Cross-Site Scripting' (XSS) og hvordan kan det forhindre XSS-angrep i nettapplikasjoner?",
                    "answers": [
                        { "id": 0, "answer": "'Cross-Site Scripting' (XSS) er en type nettangrep der angripere injiserer skadelig kode i webapplikasjoner som deretter kjøres i brukerens nettleser. Dette kan tillate angripere å stjele informasjon, manipulere innholdet på siden eller utføre handlinger på brukerens vegne. XSS-angrep kan forhindres ved å implementere sikkerhetsbest practices som inputvalidering, outputfiltrering, bruk av Content Security Policy (CSP) og å unngå å bruke innerHTML til å manipulere DOM-elementer.", "correct": true },
                        { "id": 1, "answer": "'Cross-Site Scripting' (XSS) er en sikkerhetsmekanisme som brukes til å beskytte nettapplikasjoner mot skadelig kode som kan injiseres av angripere. Dette oppnås ved å validere og filtrere all brukergenerert input før det vises på siden. XSS-angrep kan forhindres ved å implementere strenge regler for dataformatering og godkjennelse.", "correct": false },
                        { "id": 2, "answer": "'Cross-Site Scripting' (XSS) er en kryptografisk teknikk som brukes til å autentisere og autorisere brukere i nettapplikasjoner. Dette oppnås ved å generere og validere digitale signaturer for hver forespørsel og respons. XSS-angrep kan forhindres ved å implementere avanserte krypteringsalgoritmer og nøkkeladministrasjonssystemer.", "correct": false },
                        { "id": 3, "answer": "'Cross-Site Scripting' (XSS) er en protokoll som brukes til å optimalisere ytelsen til nettapplikasjoner ved å redusere lastetiden og båndbreddeforbruket. Dette oppnås ved å koble til eksterne ressurser som JavaScript-biblioteker og tjenester. XSS-angrep kan forhindres ved å begrense tilgangen til tredjepartsressurser og bruke sikre tilkoblingsprotokoller som HTTPS.", "correct": false }
                    ]
                },
                {
                    "id": 175,
                    "question": "Hva er 'Cross-Site Request Forgery' (CSRF) og hvordan kan det forhindre CSRF-angrep i nettapplikasjoner?",
                    "answers": [
                        { "id": 0, "answer": "'Cross-Site Request Forgery' (CSRF) er en type nettangrep der angripere tvinger en autentisert bruker til å utføre uønskede handlinger på en nettapplikasjon der brukeren er autentisert. Dette oppnås ved å utnytte tillit mellom brukerens nettleser og applikasjonen. CSRF-angrep kan forhindres ved å bruke sikkerhetsmekanismer som 'CSRF Tokens', som er unike, tilfeldig genererte verdier som må sendes med hver forespørsel for å bekrefte brukerens intensjon.", "correct": true },
                        { "id": 1, "answer": "'Cross-Site Request Forgery' (CSRF) er en protokoll som brukes til å beskytte sensitiv informasjon i nettapplikasjoner mot uautorisert tilgang. Dette oppnås ved å kryptere dataene som sendes mellom klienten og serveren og validere brukerens identitet. CSRF-angrep kan forhindres ved å implementere avanserte kryptografialgoritmer og nøkkeladministrasjonssystemer.", "correct": false },
                        { "id": 2, "answer": "'Cross-Site Request Forgery' (CSRF) er en sikkerhetsmekanisme som brukes til å validere og signere forespørsler og svar i nettapplikasjoner. Dette oppnås ved å bruke asymmetrisk kryptering for å sikre kommunikasjonen mellom klienten og serveren. CSRF-angrep kan forhindres ved å generere og validere digitale signaturer for hver forespørsel.", "correct": false },
                        { "id": 3, "answer": "'Cross-Site Request Forgery' (CSRF) er en protokoll som brukes til å optimalisere ytelsen til nettapplikasjoner ved å redusere lastetiden og båndbreddeforbruket. Dette oppnås ved å begrense antall nettverksforespørsler som sendes mellom klienten og serveren. CSRF-angrep kan forhindres ved å begrense tilgangen til ressurser og bruke sikre tilkoblingsprotokoller som HTTPS.", "correct": false }
                    ]
                },
                {
                    "id": 176,
                    "question": "Hva er forskjellen mellom 'debounce' og 'throttle' i JavaScript, og hvordan brukes de for å optimalisere ytelsen til hendelseshåndtering?",
                    "answers": [
                        { "id": 0, "answer": "'Debounce' og 'throttle' er begge teknikker som brukes til å begrense hyppigheten av utførelsen av en funksjon, men de brukes i forskjellige scenarier. 'Debounce' sikrer at en funksjon bare blir kalt etter at en viss tid har gått uten ytterligere anrop, mens 'throttle' sikrer at en funksjon ikke blir kalt mer enn én gang innenfor et bestemt tidsintervall. 'Debounce' brukes vanligvis for å håndtere hendelser som utløses hyppig, som f.eks. søkefelt, mens 'throttle' brukes for å begrense hyppigheten av hendelser som rulleskroll eller vindusresizinger.", "correct": true },
                        { "id": 1, "answer": "'Debounce' og 'throttle' er begge teknikker som brukes til å sikre at en funksjon blir kalt flere ganger i løpet av en kort tidsperiode. 'Debounce' brukes til å sikre at en funksjon blir kalt minst én gang innenfor en bestemt tidsperiode, mens 'throttle' sikrer at en funksjon ikke blir kalt oftere enn én gang innenfor en bestemt tidsperiode. 'Debounce' brukes vanligvis for animasjonseffekter, mens 'throttle' brukes for å håndtere brukerinteraksjoner.", "correct": false },
                        { "id": 2, "answer": "'Debounce' og 'throttle' er begge teknikker som brukes til å optimalisere ytelsen til JavaScript-applikasjoner, men de brukes på forskjellige måter. 'Debounce' brukes til å begrense antall asynkrone anrop til API-er, mens 'throttle' brukes til å begrense hyppigheten av DOM-manipulasjoner. 'Debounce' brukes vanligvis for å forhindre overbelastning av serveren, mens 'throttle' brukes for å forbedre responsiviteten til brukergrensesnittet.", "correct": false },
                        { "id": 3, "answer": "'Debounce' og 'throttle' er begge metoder for å redusere mengden JavaScript-kode som kjører på en nettside. 'Debounce' brukes til å begrense antall HTTP-forespørsler til serveren, mens 'throttle' brukes til å begrense antall JavaScript-hendelser som utløses av brukerens interaksjoner. 'Debounce' brukes vanligvis for å forbedre ytelsen til AJAX-forespørsler, mens 'throttle' brukes for å optimalisere dynamisk innholdslasting.", "correct": false }
                    ]
                },
                {
                    "id": 177,
                    "question": "Hva er 'closure' (lukkede funksjoner) i JavaScript, og hvordan brukes de til å opprettholde tilstanden?",
                    "answers": [
                        { "id": 0, "answer": "'Closure' er et konsept i JavaScript som tillater en funksjon å beholde tilgang til det omsluttende omfanget (scope) selv etter at den har returnert. Dette oppnås ved å opprette en indre funksjon som har tilgang til variabler i det omsluttende omfanget selv etter at den omsluttende funksjonen har returnert. 'Closure' brukes ofte til å opprettholde tilstanden og skape privatliv for variabler i JavaScript-koden.", "correct": true },
                        { "id": 1, "answer": "'Closure' er en metode for å begrense tilgangen til visse funksjoner og variabler i JavaScript-koden. Dette oppnås ved å plassere funksjoner og variabler innenfor separate moduler og eksponere bare det nødvendige grensesnittet for ekstern tilgang. 'Closure' brukes vanligvis til å organisere og strukturere store JavaScript-prosjekter.", "correct": false },
                        { "id": 2, "answer": "'Closure' er et konsept i JavaScript som tillater en funksjon å være tilgjengelig over hele applikasjonen uten behov for å bli kalt på nytt. Dette oppnås ved å opprette en global referanse til funksjonen i JavaScript-koden. 'Closure' brukes vanligvis til å opprettholde tilstanden og kontrollere flyten av informasjon i JavaScript-applikasjoner.", "correct": false },
                        { "id": 3, "answer": "'Closure' er et sikkerhetskonsept i JavaScript som hindrer uautorisert tilgang til sensitive data i applikasjonen. Dette oppnås ved å begrense tilgangen til visse funksjoner og variabler til bare autoriserte brukere. 'Closure' brukes vanligvis til å beskytte sensitive data og forhindre angrep som XSS (Cross-Site Scripting).", "correct": false }
                    ]
                },
                {
                    "id": 178,
                    "question": "Hva er 'memoization' i JavaScript, og hvordan brukes det til å forbedre ytelsen til funksjoner?",
                    "answers": [
                        { "id": 0, "answer": "'Memoization' er en optimaliseringsmetode i JavaScript som innebærer å huske resultatene av tidligere beregninger og gjenbruke dem når de samme inngangsverdiene dukker opp igjen. Dette reduserer behovet for gjentatte beregninger og forbedrer dermed ytelsen til funksjoner som kaller den memoiserte funksjonen. 'Memoization' brukes vanligvis i funksjoner som har dyre beregninger eller komplekse datamodeller.", "correct": true },
                        { "id": 1, "answer": "'Memoization' er en teknikk for å organisere og strukturere koden i JavaScript-prosjekter ved å opprette en sentralisert kodedatabase som kan gjenbrukes i hele applikasjonen. Dette forenkler vedlikeholdet og utvidelsen av JavaScript-applikasjoner ved å redusere redundans og forbedre gjenbrukbarheten av kodeblokker.", "correct": false },
                        { "id": 2, "answer": "'Memoization' er en sikkerhetsfunksjon i JavaScript som brukes til å beskytte sensitive data og begrense tilgangen til visse funksjoner og variabler i applikasjonen. Dette oppnås ved å autentisere brukere og tildele tilgangstillatelser basert på deres rolle og privilegier. 'Memoization' brukes vanligvis til å forhindre uautorisert tilgang og forbedre sikkerheten til JavaScript-applikasjoner.", "correct": false },
                        { "id": 3, "answer": "'Memoization' er en metode for å håndtere asynkrone operasjoner i JavaScript ved å organisere dem i en minnebasert køstruktur. Dette muliggjør effektiv utførelse av parallelle oppgaver og forbedrer dermed ytelsen til JavaScript-applikasjoner. 'Memoization' brukes vanligvis til å optimalisere nettverkskommunikasjon og databehandling i moderne webapplikasjoner.", "correct": false }
                    ]
                },
                {
                    "id": 179,
                    "question": "Hva er forskjellen mellom 'GET' og 'POST' metoder i HTTP-protokollen, og når bør hver metode brukes?",
                    "answers": [
                        { "id": 0, "answer": "'GET' metoden brukes for å be om data fra en spesifisert ressurs, mens 'POST' metoden brukes for å sende data til en server for opprettelse eller oppdatering. 'GET' bør brukes når dataene ikke inneholder sensitive opplysninger og kan vises i nettleserens adresselinje. 'POST' bør brukes når dataene er sensitive eller når størrelsen på dataene er stor.", "correct": true },
                        { "id": 1, "answer": "'GET' metoden brukes for å sende data til en server for opprettelse eller oppdatering, mens 'POST' metoden brukes for å be om data fra en spesifisert ressurs. 'GET' bør brukes når dataene er sensitive eller når størrelsen på dataene er stor. 'POST' bør brukes når dataene ikke inneholder sensitive opplysninger og kan vises i nettleserens adresselinje.", "correct": false },
                        { "id": 2, "answer": "'GET' metoden brukes for å validere data før de sendes til en server, mens 'POST' metoden brukes for å bekrefte mottakelsen av data fra en server. 'GET' bør brukes når dataene ikke inneholder sensitive opplysninger og når responsen fra serveren er viktig. 'POST' bør brukes når dataene er sensitive eller når størrelsen på dataene er stor.", "correct": false },
                        { "id": 3, "answer": "'GET' metoden brukes for å sende data til en server for opprettelse eller oppdatering, mens 'POST' metoden brukes for å be om data fra en spesifisert ressurs. 'GET' bør brukes når dataene er sensitive eller når størrelsen på dataene er stor. 'POST' bør brukes når dataene ikke inneholder sensitive opplysninger og kan vises i nettleserens adresselinje.", "correct": false }
                    ]
                },
                {
                    "id": 180,
                    "question": "Hva er forskjellen mellom '== 'og '===' i JavaScript, og når bør hver brukes?",
                    "answers": [
                        { "id": 0, "answer": "'== 'sammenligner verdier uten å vurdere datatype, mens '===' sammenligner både verdier og datatype. '== 'bør brukes når du trenger å sammenligne verdier uten å ta hensyn til datatypekonvertering. '===' bør brukes når både verdier og datatyper må være like.", "correct": true },
                        { "id": 1, "answer": "'== 'sammenligner verdier og datatype, mens '===' sammenligner bare verdier. '== 'bør brukes når både verdier og datatyper må være like. '===' bør brukes når du trenger å sammenligne verdier uten å ta hensyn til datatypekonvertering.", "correct": false },
                        { "id": 2, "answer": "'== 'sammenligner verdier uten å vurdere datatype, mens '===' sammenligner både verdier og datatype. '== 'bør brukes når du trenger å sammenligne verdier uten å ta hensyn til datatypekonvertering. '===' bør brukes når både verdier og datatyper må være like.", "correct": false },
                        { "id": 3, "answer": "'== 'sammenligner verdier og datatype, mens '===' sammenligner bare verdier. '== 'bør brukes når verdier kan være av forskjellige typer. '===' bør brukes når du trenger å sammenligne verdier og datatype nøyaktig.", "correct": false }
                    ]
                },
                {
                    "id": 181,
                    "question": "Hva er 'localStorage' og 'sessionStorage' i JavaScript, og hva er forskjellen mellom dem?",
                    "answers": [
                        { "id": 0, "answer": "'localStorage' og 'sessionStorage' er to mekanismer som lar deg lagre data lokalt i nettleseren. 'localStorage' lagrer data uten utløpsdato, mens 'sessionStorage' lagrer data for en enkelt økt (når nettleseren lukkes, slettes dataene). 'localStorage' er egnet for langvarig lagring av data, mens 'sessionStorage' er nyttig når du bare trenger å lagre data for økten.", "correct": true },
                        { "id": 1, "answer": "'localStorage' og 'sessionStorage' er to alternativer for server-side dataoppbevaring i JavaScript-applikasjoner. 'localStorage' lagrer data på serveren, mens 'sessionStorage' lagrer data midlertidig på klientens maskin. 'localStorage' er egnet for store datamengder, mens 'sessionStorage' er begrenset til mindre mengder data.", "correct": false },
                        { "id": 2, "answer": "'localStorage' og 'sessionStorage' er to metoder for å lagre data i JavaScript-objekter. 'localStorage' lagrer data midlertidig på klientens maskin, mens 'sessionStorage' lagrer data på serveren. 'localStorage' er egnet for datamengder som kan endres, mens 'sessionStorage' er egnet for statiske data.", "correct": false },
                        { "id": 3, "answer": "'localStorage' og 'sessionStorage' er to former for nettverkskommunikasjon i JavaScript-applikasjoner. 'localStorage' brukes til å lagre data midlertidig på klientens maskin, mens 'sessionStorage' brukes til å lagre data på serveren. 'localStorage' er egnet for store datamengder, mens 'sessionStorage' er begrenset til mindre mengder data.", "correct": false }
                    ]
                },
                {
                    "id": 182,
                    "question": "Hva er forskjellen mellom 'margin' og 'padding' i CSS?",
                    "answers": [
                        { "id": 0, "answer": "Margin er plassen utenfor elementets ramme, mens padding er plassen innenfor elementets ramme.", "correct": true },
                        { "id": 1, "answer": "Margin er plassen innenfor elementets ramme, mens padding er plassen utenfor elementets ramme.", "correct": false },
                        { "id": 2, "answer": "Margin og padding er det samme.", "correct": false },
                        { "id": 3, "answer": "Margin og padding er begge egenskaper for å endre størrelsen på elementet.", "correct": false }
                    ]
                },
                {
                    "id": 183,
                    "question": "Hva er forskjellen mellom 'null' og 'undefined' i JavaScript?",
                    "answers": [
                        { "id": 0, "answer": "Null er et bevisst satt fravær av verdi, mens undefined er når en variabel ikke har blitt tildelt en verdi.", "correct": true },
                        { "id": 1, "answer": "Null og undefined betyr det samme i JavaScript.", "correct": false },
                        { "id": 2, "answer": "Null er når en variabel ikke har blitt tildelt en verdi, mens undefined er et bevisst satt fravær av verdi.", "correct": false },
                        { "id": 3, "answer": "Null og undefined er begge standardverdier i JavaScript.", "correct": false }
                    ]
                },
                {
                    "id": 184,
                    "question": "Hva er 'viewport' i responsivt webdesign?",
                    "answers": [
                        { "id": 0, "answer": "Viewport er den synlige delen av en nettside i nettleservinduet.", "correct": true },
                        { "id": 1, "answer": "Viewport er en CSS-egenskap for å endre størrelsen på elementer på en nettside.", "correct": false },
                        { "id": 2, "answer": "Viewport er et JavaScript-bibliotek for animasjoner på nettsider.", "correct": false },
                        { "id": 3, "answer": "Viewport er et element i HTML som angir hele nettsidens innhold.", "correct": false }
                    ]
                },
                {
                    "id": 185,
                    "question": "Hva betyr 'SEO'?",
                    "answers": [
                        { "id": 0, "answer": "Search Engine Optimization", "correct": true },
                        { "id": 1, "answer": "Social Engagement Opportunities", "correct": false },
                        { "id": 2, "answer": "Semantic Enhancing Operations", "correct": false },
                        { "id": 3, "answer": "Site Efficiency Optimization", "correct": false }
                    ]
                },
                {
                    "id": 186,
                    "question": "Hva representerer 'IIFE' i JavaScript?",
                    "answers": [
                        { "id": 0, "answer": "Immediately Invoked Function Expression", "correct": true },
                        { "id": 1, "answer": "Internal Iterative Function Execution", "correct": false },
                        { "id": 2, "answer": "Inline Integrated File Execution", "correct": false },
                        { "id": 3, "answer": "Instance-based Interface Function Extension", "correct": false }
                    ]
                },
                {
                    "id": 187,
                    "question": "Hva er forskjellen mellom 'let' og 'var' i JavaScript?",
                    "answers": [
                        { "id": 0, "answer": "'let' har blokk-scope, mens 'var' har funksjonsscope.", "correct": true },
                        { "id": 1, "answer": "'var' har blokk-scope, mens 'let' har funksjonsscope.", "correct": false },
                        { "id": 2, "answer": "'let' og 'var' fungerer på samme måte i JavaScript.", "correct": false },
                        { "id": 3, "answer": "'var' har global scope, mens 'let' har blokk-scope.", "correct": false }
                    ]
                },
                {
                    "id": 188,
                    "question": "Hva er 'HTTP' og 'HTTPS'?",
                    "answers": [
                        { "id": 0, "answer": "'HTTP' står for HyperText Transfer Protocol, mens 'HTTPS' står for HyperText Transfer Protocol Secure. 'HTTPS' krypterer dataene som sendes mellom nettleseren og nettstedet, mens 'HTTP' ikke gjør det.", "correct": true },
                        { "id": 1, "answer": "'HTTP' står for HyperText Transfer Protocol Secure, mens 'HTTPS' står for HyperText Transfer Protocol. 'HTTPS' er den usikrede versjonen av protokollen, mens 'HTTP' er den sikre versjonen.", "correct": false },
                        { "id": 2, "answer": "'HTTP' og 'HTTPS' betyr det samme.", "correct": false },
                        { "id": 3, "answer": "'HTTP' og 'HTTPS' er to forskjellige protokoller for filoverføring på internett.", "correct": false }
                    ]
                },
                {
                    "id": 189,
                    "question": "Hva er 'SQL Injection'?",
                    "answers": [
                        { "id": 0, "answer": "'SQL Injection' er en type nettangrep der angriperen utnytter sårbarheter i en applikasjon for å injisere SQL-kode i en SQL-spørring. Dette kan føre til uautorisert tilgang til databasen eller endre databasen uventet.", "correct": true },
                        { "id": 1, "answer": "'SQL Injection' er en sikkerhetsprotokoll for å hindre uautorisert tilgang til en database.", "correct": false },
                        { "id": 2, "answer": "'SQL Injection' er en teknikk for å kryptere SQL-spørringer for å sikre databasen.", "correct": false },
                        { "id": 3, "answer": "'SQL Injection' er en metode for å optimalisere SQL-spørringer for raskere ytelse.", "correct": false }
                    ]
                },
                {
                    "id": 190,
                    "question": "Hva er forskjellen mellom 'git pull' og 'git fetch'?",
                    "answers": [
                        { "id": 0, "answer": "'git pull' henter endringer fra en ekstern kilde og integrerer dem automatisk med den lokale grenen, mens 'git fetch' henter endringer fra en ekstern kilde, men integrerer dem ikke automatisk.", "correct": true },
                        { "id": 1, "answer": "'git pull' og 'git fetch' utfører samme oppgave med å hente endringer fra en ekstern kilde.", "correct": false },
                        { "id": 2, "answer": "'git pull' og 'git fetch' er begge kommandoer for å laste ned Git-prosjekter fra en nettbasert repository.", "correct": false },
                        { "id": 3, "answer": "'git pull' utfører en 'merge' operasjon, mens 'git fetch' utfører en 'rebase' operasjon.", "correct": false }
                    ]
                },
                {
                    "id": 191,
                    "question": "Hva er en CDN?",
                    "answers": [
                        { "id": 0, "answer": "En Content Delivery Network som distribuerer innhold over flere servere geografisk for raskere levering til brukerne.", "correct": true },
                        { "id": 1, "answer": "En Cloud Data Network for lagring av data på skyen.", "correct": false },
                        { "id": 2, "answer": "En Computer Data Network for internett-tilkoblinger.", "correct": false },
                        { "id": 3, "answer": "En Centralized Data Network for sentralisert databehandling.", "correct": false }
                    ]
                },
                {
                    "id": 192,
                    "question": "Hva er 'AJAX'?",
                    "answers": [
                        { "id": 0, "answer": "Asynchronous JavaScript and XML for å sende og motta data fra en server uten å måtte laste inn hele siden på nytt.", "correct": true },
                        { "id": 1, "answer": "En ny type JavaScript-rammeverk for å lage dynamiske nettsider.", "correct": false },
                        { "id": 2, "answer": "En HTML-utvidelse for å lage animerte elementer.", "correct": false },
                        { "id": 3, "answer": "En type nettleser for raskere nettsideytelse.", "correct": false }
                    ]
                },
                {
                    "id": 193,
                    "question": "Hva er 'JSON'?",
                    "answers": [
                        { "id": 0, "answer": "JavaScript Object Notation, et lettvektsdatautvekslingsformat.", "correct": true },
                        { "id": 1, "answer": "JavaScript Object Navigation, et JavaScript-bibliotek for å navigere i objekter.", "correct": false },
                        { "id": 2, "answer": "JavaScript Object Networking, et rammeverk for nettverkskommunikasjon i JavaScript.", "correct": false },
                        { "id": 3, "answer": "JavaScript Object Naming, en konvensjon for å navngi variabler i JavaScript.", "correct": false }
                    ]
                },
                {
                    "id": 194,
                    "question": "Hva er 'RESTful API'?",
                    "answers": [
                        { "id": 0, "answer": "Representational State Transfer, et arkitekturparadigme for distribuerte systemer, med spesiell vekt på ressurser.", "correct": true },
                        { "id": 1, "answer": "Remote Server Transfer, en protokoll for overføring av data mellom servere.", "correct": false },
                        { "id": 2, "answer": "Responsive Server Toolkit, et verktøysett for å lage dynamiske serverapplikasjoner.", "correct": false },
                        { "id": 3, "answer": "Remote State Transfer, en teknikk for å overføre data mellom klient og server.", "correct": false }
                    ]
                },
                {
                    "id": 195,
                    "question": "Hva er en 'DOM'?",
                    "answers": [
                        { "id": 0, "answer": "Document Object Model.", "correct": true },
                        { "id": 1, "answer": "Data Object Model.", "correct": false },
                        { "id": 2, "answer": "Document Object Method.", "correct": false },
                        { "id": 3, "answer": "Dynamic Object Model.", "correct": false }
                    ]
                },
                {
                    "id": 196,
                    "question": "Hva er 'CSS'?",
                    "answers": [
                        { "id": 0, "answer": "Cascading Style Sheets.", "correct": true },
                        { "id": 1, "answer": "Cascading Script Style.", "correct": false },
                        { "id": 2, "answer": "Coded Style Sheets.", "correct": false },
                        { "id": 3, "answer": "Creative Style Sheets.", "correct": false }
                    ]
                },
                {
                    "id": 197,
                    "question": "Hva er 'HTML'?",
                    "answers": [
                        { "id": 0, "answer": "HyperText Markup Language.", "correct": true },
                        { "id": 1, "answer": "Hyper Transfer Markup Language.", "correct": false },
                        { "id": 2, "answer": "High-Level Markup Language.", "correct": false },
                        { "id": 3, "answer": "Hyperlinks and Text Markup Language.", "correct": false }
                    ]
                },
                {
                    "id": 198,
                    "question": "Hva er en 'URI'?",
                    "answers": [
                        { "id": 0, "answer": "Uniform Resource Identifier.", "correct": true },
                        { "id": 1, "answer": "Uniform Resource Interface.", "correct": false },
                        { "id": 2, "answer": "Universal Resource Identifier.", "correct": false },
                        { "id": 3, "answer": "Unified Resource Identifier.", "correct": false }
                    ]
                },
                {
                    "id": 199,
                    "question": "Hva er en 'URL'?",
                    "answers": [
                        { "id": 0, "answer": "Uniform Resource Locator.", "correct": true },
                        { "id": 1, "answer": "Uniform Resource Link.", "correct": false },
                        { "id": 2, "answer": "Unified Resource Locator.", "correct": false },
                        { "id": 3, "answer": "Universal Resource Locator.", "correct": false }
                    ]
                },
                {
                    "id": 200,
                    "question": "Er HTML et programmeringsspråk?",
                    "answers": [
                        { "id": 0, "answer": "Ja", "correct": false },
                        { "id": 1, "answer": "Nei", "correct": true }
                    ]
                },
                {
                    "id": 201,
                    "question": "Kan CSS brukes til å legge til interaktivitet på en nettside?",
                    "answers": [
                        { "id": 0, "answer": "Ja", "correct": false },
                        { "id": 1, "answer": "Nei", "correct": true }
                    ]
                },
                {
                    "id": 202,
                    "question": "Er JavaScript et dynamisk og tolket språk?",
                    "answers": [
                        { "id": 0, "answer": "Ja", "correct": true },
                        { "id": 1, "answer": "Nei", "correct": false }
                    ]
                },
                {
                    "id": 203,
                    "question": "Kan en HTML-fil inneholde CSS-kode?",
                    "answers": [
                        { "id": 0, "answer": "Ja", "correct": true },
                        { "id": 1, "answer": "Nei", "correct": false }
                    ]
                },
                {
                    "id": 204,
                    "question": "Er 'git' et versjonskontrollsystem?",
                    "answers": [
                        { "id": 0, "answer": "Ja", "correct": true },
                        { "id": 1, "answer": "Nei", "correct": false }
                    ]
                },
                {
                    "id": 205,
                    "question": "Er 'Python' et objektorientert programmeringsspråk?",
                    "answers": [
                        { "id": 0, "answer": "Ja", "correct": true },
                        { "id": 1, "answer": "Nei", "correct": false }
                    ]
                },
                {
                    "id": 206,
                    "question": "Kan en 'div'-tag inneholde tekst i HTML?",
                    "answers": [
                        { "id": 0, "answer": "Ja", "correct": true },
                        { "id": 1, "answer": "Nei", "correct": false }
                    ]
                },
                {
                    "id": 207,
                    "question": "Er 'React' et rammeverk for JavaScript?",
                    "answers": [
                        { "id": 0, "answer": "Ja", "correct": false },
                        { "id": 1, "answer": "Nei", "correct": true }
                    ]
                },
                {
                    "id": 208,
                    "question": "Kan du bruke 'position: fixed' for å plassere et element relativt til et annet?",
                    "answers": [
                        { "id": 0, "answer": "Ja", "correct": false },
                        { "id": 1, "answer": "Nei", "correct": true }
                    ]
                },
                {
                    "id": 209,
                    "question": "Er 'HTTP' en protokoll for sikker dataoverføring over nettverk?",
                    "answers": [
                        { "id": 0, "answer": "Ja", "correct": false },
                        { "id": 1, "answer": "Nei", "correct": true }
                    ]
                },
                {
                    "id": 210,
                    "question": "Kan en JavaScript-funksjon returnere flere verdier samtidig?",
                    "answers": [
                        { "id": 0, "answer": "Ja", "correct": false },
                        { "id": 1, "answer": "Nei", "correct": true }
                    ]
                },
                {
                    "id": 211,
                    "question": "Kan du endre verdien til en konstant (const) i JavaScript?",
                    "answers": [
                        { "id": 0, "answer": "Ja", "correct": false },
                        { "id": 1, "answer": "Nei", "correct": true }
                    ]
                },
                {
                    "id": 212,
                    "question": "Er HTML-kode en syntaktisk form for XML?",
                    "answers": [
                        { "id": 0, "answer": "Ja", "correct": true },
                        { "id": 1, "answer": "Nei", "correct": false }
                    ]
                },
                {
                    "id": 213,
                    "question": "Kan du bruke 'margin' for å legge til ekstra plass mellom to elementer i CSS?",
                    "answers": [
                        { "id": 0, "answer": "Ja", "correct": true },
                        { "id": 1, "answer": "Nei", "correct": false }
                    ]
                },
                {
                    "id": 214,
                    "question": "Er det mulig å inkludere JavaScript-kode direkte i HTML-filen?",
                    "answers": [
                        { "id": 0, "answer": "Ja", "correct": true },
                        { "id": 1, "answer": "Nei", "correct": false }
                    ]
                },
                {
                    "id": 215,
                    "question": "Hva er en 'loop' i programmering?",
                    "answers": [
                        { "id": 0, "answer": "En repetitiv struktur som gjør det mulig å utføre en serie med instruksjoner gjentatte ganger.", "correct": true },
                        { "id": 1, "answer": "En datatype som inneholder en samling av elementer.", "correct": false },
                        { "id": 2, "answer": "En type feil i koden som forhindrer kjøring.", "correct": false },
                        { "id": 3, "answer": "En variabel som holder verdien av gjeldende klokkeslett.", "correct": false }
                    ]
                },
                {
                    "id": 216,
                    "question": "Hva er 'version control'?",
                    "answers": [
                        { "id": 0, "answer": "En systematisk tilnærming til styring av endringer i koden over tid.", "correct": true },
                        { "id": 1, "answer": "En metode for å teste kode før den blir utgitt.", "correct": false },
                        { "id": 2, "answer": "En måte å beskytte datamaskinen mot virus.", "correct": false },
                        { "id": 3, "answer": "En protokoll for å overføre filer over internett.", "correct": false }
                    ]
                },
                {
                    "id": 217,
                    "question": "Hva er 'debugging'?",
                    "answers": [
                        { "id": 0, "answer": "Prosessen med å identifisere og rette feil i koden.", "correct": true },
                        { "id": 1, "answer": "En teknikk for å forbedre ytelsen til en nettside.", "correct": false },
                        { "id": 2, "answer": "En metode for å kryptere sensitiv informasjon i koden.", "correct": false },
                        { "id": 3, "answer": "En protokoll for å validere HTML-dokumenter.", "correct": false }
                    ]
                },
                {
                    "id": 218,
                    "question": "Hva er 'API'?",
                    "answers": [
                        { "id": 0, "answer": "Application Programming Interface, en samling av definerte regler og protokoller for å bygge programvareapplikasjoner.", "correct": true },
                        { "id": 1, "answer": "Automated Program Integration, en metode for å koble sammen ulike programmer automatisk.", "correct": false },
                        { "id": 2, "answer": "Advanced Programming Interface, et sett med avanserte funksjoner for å utvikle programvare.", "correct": false },
                        { "id": 3, "answer": "Accessible Programming Interface, et grensesnitt som gjør det mulig for personer med nedsatt funksjonsevne å programmere.", "correct": false }
                    ]
                },
                {
                    "id": 219,
                    "question": "Hva er en 'database'?",
                    "answers": [
                        { "id": 0, "answer": "En strukturert samling av data som er organisert på en måte som gjør det enkelt å hente, lagre og administrere.", "correct": true },
                        { "id": 1, "answer": "En dynamisk nettside som endrer seg basert på brukerens handlinger.", "correct": false },
                        { "id": 2, "answer": "En form for datasikkerhetskopiering som lagrer dataene eksternt.", "correct": false },
                        { "id": 3, "answer": "En type nettverksprotokoll for å overføre data mellom servere.", "correct": false }
                    ]
                },
                {
                    "id": 220,
                    "question": "Hva er hovedformålet med en 'for'-løkke i programmering?",
                    "answers": [
                        { "id": 0, "answer": "Å gjenta en serie med instruksjoner et spesifisert antall ganger.", "correct": true },
                        { "id": 1, "answer": "Å organisere data i en liste.", "correct": false },
                        { "id": 2, "answer": "Å sortere data i stigende rekkefølge.", "correct": false },
                        { "id": 3, "answer": "Å definere en funksjon som kan kalles senere.", "correct": false },
                        { "id": 4, "answer": "Å lagre variabler midlertidig i minnet.", "correct": false },
                        { "id": 5, "answer": "Å hente data fra en ekstern kilde.", "correct": false }
                    ]
                },
                {
                    "id": 221,
                    "question": "Hva er en vanlig bruksområde for 'if'-setninger i programmering?",
                    "answers": [
                        { "id": 0, "answer": "Å gjenta en serie med instruksjoner et spesifisert antall ganger.", "correct": false },
                        { "id": 1, "answer": "Å organisere data i en liste.", "correct": false },
                        { "id": 2, "answer": "Å sortere data i stigende rekkefølge.", "correct": false },
                        { "id": 3, "answer": "Å definere en funksjon som kan kalles senere.", "correct": false },
                        { "id": 4, "answer": "Å kontrollere om en betingelse er sann og utføre visse handlinger basert på dette.", "correct": true },
                        { "id": 5, "answer": "Å lagre variabler midlertidig i minnet.", "correct": false }
                    ]
                },
                {
                    "id": 222,
                    "question": "Hva er et vanlig eksempel på 'datastruktur' i programmering?",
                    "answers": [
                        { "id": 0, "answer": "Variabler", "correct": false },
                        { "id": 1, "answer": "Funksjoner", "correct": false },
                        { "id": 2, "answer": "Arrays", "correct": true },
                        { "id": 3, "answer": "Betingede uttrykk", "correct": false },
                        { "id": 4, "answer": "Loops", "correct": false },
                        { "id": 5, "answer": "Objekter", "correct": false }
                    ]
                },
                {
                    "id": 223,
                    "question": "Hvilken funksjon har 'HTML' i webutvikling?",
                    "answers": [
                        { "id": 0, "answer": "Håndtering av serverlogikk", "correct": false },
                        { "id": 1, "answer": "Utforming av grensesnitt", "correct": false },
                        { "id": 2, "answer": "Strukturering av innhold på nettet", "correct": true },
                        { "id": 3, "answer": "Administrering av databaser", "correct": false },
                        { "id": 4, "answer": "Kryptering av data", "correct": false },
                        { "id": 5, "answer": "Utførelse av dynamiske funksjoner", "correct": false }
                    ]
                },
                {
                    "id": 224,
                    "question": "Hva er 'HTTP' i forhold til webkommunikasjon?",
                    "answers": [
                        { "id": 0, "answer": "En protokoll for sikker dataoverføring", "correct": false },
                        { "id": 1, "answer": "En metode for å kryptere data på nettet", "correct": false },
                        { "id": 2, "answer": "En protokoll for å overføre hypertext-dokumenter over nettet", "correct": true },
                        { "id": 3, "answer": "En enhet for å overvåke nettrafikk", "correct": false },
                        { "id": 4, "answer": "En nettleserutvidelse for sikker surfing", "correct": false },
                        { "id": 5, "answer": "En programvare for å blokkere annonser", "correct": false }
                    ]
                },
                {
                    "id": 225,
                    "question": "Hva er 'SQL'?",
                    "answers": [
                        { "id": 0, "answer": "En protokoll for å overføre data mellom servere.", "correct": false },
                        { "id": 1, "answer": "En spørringsspråk for databaser.", "correct": true },
                        { "id": 2, "answer": "En nettleser for å utforske internett.", "correct": false },
                        { "id": 3, "answer": "En krypteringsalgoritme for data.", "correct": false }
                    ]
                },
                {
                    "id": 226,
                    "question": "Hva er en 'array' i programmering?",
                    "answers": [
                        { "id": 0, "answer": "En type database.", "correct": false },
                        { "id": 1, "answer": "En rekke av tall.", "correct": false },
                        { "id": 2, "answer": "En datastruktur som holder en samling av elementer.", "correct": true },
                        { "id": 3, "answer": "En metode for å sortere data.", "correct": false }
                    ]
                },
                {
                    "id": 227,
                    "question": "Hva er 'Git'?",
                    "answers": [
                        { "id": 0, "answer": "En kodesammenføyningstjeneste.", "correct": false },
                        { "id": 1, "answer": "Et versjonskontrollsystem.", "correct": true },
                        { "id": 2, "answer": "En protokoll for å kryptere dataoverføring.", "correct": false },
                        { "id": 3, "answer": "En databaseadministrasjonsverktøy.", "correct": false }
                    ]
                },
                {
                    "id": 228,
                    "question": "Hva er 'frontend' i webutvikling?",
                    "answers": [
                        { "id": 0, "answer": "Serverdelen av en nettapplikasjon.", "correct": false },
                        { "id": 1, "answer": "En type database for frontend-teknologier.", "correct": false },
                        { "id": 2, "answer": "Brukergrensesnittet og opplevelsen til en nettside eller applikasjon.", "correct": true },
                        { "id": 3, "answer": "En metode for å sikre nettapplikasjoner.", "correct": false }
                    ]
                },
                {
                    "id": 229,
                    "question": "Hva er 'backend' i webutvikling?",
                    "answers": [
                        { "id": 0, "answer": "Brukergrensesnittet og opplevelsen til en nettside eller applikasjon.", "correct": false },
                        { "id": 1, "answer": "En type database for backend-teknologier.", "correct": false },
                        { "id": 2, "answer": "Serverdelen av en nettapplikasjon.", "correct": true },
                        { "id": 3, "answer": "En metode for å validere brukerinput.", "correct": false }
                    ]
                },
            ]} />
        </div>
    );
}