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
                                                id: curQuestionId,
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
                    id: 0,
                    question: 'Hva er en funksjon?',
                    answers: [
                        {
                            id: 0,
                            answer: 'En algoritme',
                            correct: false,
                        },
                        {
                            id: 1,
                            answer: 'En kode som brukes i algoritme',
                            correct: false,
                        },
                        {
                            id: 2,
                            answer: 'En gjenbrukbar algoritme',
                            correct: true,
                        },
                    ],
                },
                {
                    id: 1,
                    question: 'Hvilket kodespråk brukes for å gi en nettside funksjonalitet?',
                    answers: [
                        {
                            id: 0,
                            answer: 'Python',
                            correct: false,
                        },
                        {
                            id: 1,
                            answer: 'C++',
                            correct: false,
                        },
                        {
                            id: 2,
                            answer: 'C#',
                            correct: false,
                        },
                        {
                            id: 3,
                            answer: 'JavaScript',
                            correct: true,
                        },
                    ],
                },
                {
                    id: 2,
                    question: 'Hvilket kodespråk brukes for å gi en nettside utseende?',
                    answers: [
                        {
                            id: 0,
                            answer: 'HTML',
                            correct: false,
                        },
                        {
                            id: 1,
                            answer: 'CSS',
                            correct: true,
                        },
                        {
                            id: 2,
                            answer: 'style',
                            correct: false,
                        },
                    ],
                },
                {
                    id: 3,
                    question: 'Hva bruker vi for å definere innhold på en nettside?',
                    answers: [
                        {
                            id: 0,
                            answer: 'JavaScript',
                            correct: false,
                        },
                        {
                            id: 1,
                            answer: 'CSS',
                            correct: false,
                        },
                        {
                            id: 2,
                            answer: 'HTML',
                            correct: true,
                        },
                    ],
                },
                {
                    id: 4,
                    question: 'Hva står CSS for?',
                    answers: [
                        {
                            id: 0,
                            answer: 'Cool Style Sheets',
                            correct: false,
                        },
                        {
                            id: 1,
                            answer: 'Cascading Style Stuff',
                            correct: false,
                        },
                        {
                            id: 2,
                            answer: 'Cascading Style Sheets',
                            correct: true,
                        },
                    ],
                },
                {
                    id: 5,
                    question: 'Hva står HTML for?',
                    answers: [
                        {
                            id: 0,
                            answer: 'HyperText Markup Lore',
                            correct: false,
                        },
                        {
                            id: 1,
                            answer: 'HyperText Markup Language',
                            correct: true,
                        },
                        {
                            id: 2,
                            answer: 'How To Make Link',
                            correct: false,
                        },
                    ],
                },
                {
                    id: 6,
                    question: 'Hva skal hjemmesiden til en nettside hete?',
                    answers: [
                        {
                            id: 0,
                            answer: 'front_page.html',
                            correct: false,
                        },
                        {
                            id: 1,
                            answer: 'Index.html',
                            correct: false,
                        },
                        {
                            id: 2,
                            answer: 'index.html',
                            correct: true,
                        },
                    ],
                },
                {
                    id: 7,
                    question: 'Hvilken versjon av CSS bruker vi?',
                    answers: [
                        {
                            id: 0,
                            answer: '1',
                            correct: false,
                        },
                        {
                            id: 1,
                            answer: '2',
                            correct: false,
                        },
                        {
                            id: 2,
                            answer: '3',
                            correct: true,
                        },
                        {
                            id: 3,
                            answer: '4',
                            correct: false,
                        },
                        {
                            id: 4,
                            answer: '5',
                            correct: false,
                        },
                        {
                            id: 5,
                            answer: '6',
                            correct: false,
                        },
                    ],
                },
                {
                    id: 8,
                    question: 'Hva er en loop i kode?',
                    answers: [
                        {
                            id: 0,
                            answer: 'En algoritme som kan gjenbrukes',
                            correct: false,
                        },
                        {
                            id: 1,
                            answer: 'En algoritme som gjentar seg',
                            correct: true,
                        },
                    ],
                },
                {
                    id: 9,
                    question: 'Hva er object datatypen i JavaScript?',
                    answers: [
                        {
                            id: 0,
                            answer: 'En verdi som har "key" "value" verdier som ligner en array.',
                            correct: false,
                        },
                        {
                            id: 1,
                            answer: 'En liste med verdier.',
                            correct: false,
                        },
                        {
                            id: 2,
                            answer: 'En foranderlig verdi som inneholder andre verdier.',
                            correct: true,
                        },
                    ],
                },
                {
                    id: 10,
                    question: 'Hva betyr NaN?',
                    answers: [
                        {
                            id: 0,
                            answer: 'Not A Number',
                            correct: true,
                        },
                        {
                            id: 1,
                            answer: 'Non Applicable Number',
                            correct: false,
                        },
                        {
                            id: 2,
                            answer: 'Not Any Number',
                            correct: false,
                        },
                    ],
                },
                {
                    id: 11,
                    question: 'Hva er en vanlig måte å lagre brukerdata på nettleseren?',
                    answers: [
                        {
                            id: 0,
                            answer: 'LocalStorage',
                            correct: false,
                        },
                        {
                            id: 1,
                            answer: 'Cookies',
                            correct: true,
                        },
                    ],
                },
                {
                    id: 12,
                    question: 'Hva er en API (Application Programming Interface) i webutvikling?',
                    answers: [
                        {
                            id: 0,
                            answer: 'En måte for ulike programmer å kommunisere med hverandre.',
                            correct: true,
                        },
                        {
                            id: 1,
                            answer: 'Et verktøy for å lage responsive nettsider.',
                            correct: false,
                        },
                        {
                            id: 2,
                            answer: 'En protokoll for å kryptere data som sendes over Internett.',
                            correct: false,
                        },
                        {
                            id: 3,
                            answer: 'En CSS-teknikk for å style tekst.',
                            correct: false,
                        },
                    ],
                },
                {
                    id: 13,
                    question: 'Hva er et vanlig filformat for bilder på nettet?',
                    answers: [
                        {
                            id: 0,
                            answer: 'PNG',
                            correct: true,
                        },
                        {
                            id: 1,
                            answer: 'GIF',
                            correct: false,
                        },
                    ],
                },
                {
                    id: 14,
                    question: 'Hva er forskjellen mellom frontend og backend i webutvikling?',
                    answers: [
                        {
                            id: 0,
                            answer: 'Frontend er ansvarlig for å administrere databaser, mens backend håndterer brukergrensesnittet.',
                            correct: false,
                        },
                        {
                            id: 1,
                            answer: 'Frontend og backend er synonyme begreper.',
                            correct: false,
                        },
                        {
                            id: 2,
                            answer: 'Frontend refererer til det som vises for brukeren i nettleseren, mens backend håndterer serverlogikk og databehandling.',
                            correct: true,
                        },
                    ],
                },
                {
                    id: 15,
                    question: 'Hva er forskjellen mellom HTTP og HTTPS?',
                    answers: [
                        {
                            id: 0,
                            answer: 'HTTP er raskere enn HTTPS.',
                            correct: false,
                        },
                        {
                            id: 1,
                            answer: 'HTTPS bruker kryptering for å sikre dataoverføringen, mens HTTP ikke gjør det.',
                            correct: true,
                        },
                        {
                            id: 2,
                            answer: 'HTTPS krever ingen sertifikater for å fungere, mens HTTP gjør det.',
                            correct: false,
                        },
                        {
                            id: 3,
                            answer: 'HTTP fungerer bare for statiske nettsider, mens HTTPS fungerer for dynamiske nettsider.',
                            correct: false,
                        },
                    ],
                },
                {
                    id: 16,
                    question: 'Hva er en "content management system" (CMS) i webutvikling?',
                    answers: [
                        {
                            id: 0,
                            answer: 'Et bibliotek med forhåndsdefinerte CSS-stiler for å akselerere webdesignprosessen.',
                            correct: false,
                        },
                        {
                            id: 1,
                            answer: 'En protokoll for å sikre dataoverføringen mellom server og klient.',
                            correct: false,
                        },
                        {
                            id: 2,
                            answer: 'En programvare som lar brukere opprette, administrere og publisere innhold på nettet, ofte uten behov for avansert teknisk kunnskap.',
                            correct: true,
                        },
                        {
                            id: 3,
                            answer: 'Et verktøy for å administrere databaser på serveren.',
                            correct: false,
                        },
                    ],
                },
                {
                    id: 17,
                    question: 'Hva er en "favicon" i forbindelse med webutvikling?',
                    answers: [
                        {
                            id: 0,
                            answer: 'Et eget ikon for favorittnettsteder',
                            correct: false,
                        },
                        {
                            id: 1,
                            answer: 'En type plugin for å optimalisere bilder på nettsider.',
                            correct: false,
                        },
                        {
                            id: 2,
                            answer: 'En form for JavaScript-bibliotek for å lage animerte ikoner.',
                            correct: false,
                        },
                        {
                            id: 3,
                            answer: 'En spesiell type CSS-regel for å style tekst med ikoner.',
                            correct: false,
                        },
                        {
                            id: 4,
                            answer: 'Et lite ikon som vises i nettlesertabben og bokmerker for å identifisere en nettside.',
                            correct: true,
                        },
                    ],
                },
                {
                    id: 18,
                    question: 'Hva er "version control" i webutvikling?',
                    answers: [
                        {
                            id: 0,
                            answer: 'En type database for å lagre bilder og andre mediefiler på nettet.',
                            correct: false,
                        },
                        {
                            id: 1,
                            answer: 'En protokoll for å sikre overføringen av kodedata over Internett.',
                            correct: false,
                        },
                        {
                            id: 2,
                            answer: 'Et system for å spore endringer i koden over tid og muliggjøre samarbeid mellom utviklere.',
                            correct: true,
                        },
                        {
                            id: 3,
                            answer: 'En metode for å versjonere HTML-dokumenter for ulike enheter.',
                            correct: false,
                        },
                    ],
                },
                {
                    id: 19,
                    question: 'Hva er et "frontend framework" i webutvikling?',
                    answers: [
                        {
                            id: 0,
                            answer: 'En serverkonfigurasjon for å håndtere nettverkstrafikk.',
                            correct: false,
                        },
                        {
                            id: 1,
                            answer: 'En samling av forhåndsdefinerte kodeelementer og strukturer for å akselerere utviklingen av brukergrensesnitt.',
                            correct: true,
                        },
                        {
                            id: 2,
                            answer: 'Et verktøy for å administrere backend-logikk.',
                            correct: false,
                        },
                        {
                            id: 3,
                            answer: 'En type JavaScript-bibliotek for å lage animerte grensesnitt.',
                            correct: false,
                        },
                    ],
                },
                {
                    id: 20,
                    question: 'Hva er en "cookie" i webutvikling?',
                    answers: [
                        {
                            id: 0,
                            answer: 'En type server-side kodesnutt for å håndtere brukerinput på nettsider.',
                            correct: false,
                        },
                        {
                            id: 1,
                            answer: 'En form for kryptering som brukes til å sikre dataoverføringen mellom klient og server.',
                            correct: false,
                        },
                        {
                            id: 2,
                            answer: 'En liten tekstfil som lagres på brukerens datamaskin og brukes til å lagre informasjon om brukerens handlinger og preferanser på en nettside.',
                            correct: true,
                        },
                        {
                            id: 3,
                            answer: 'En metode for å validere skjemaer på klientsiden.',
                            correct: false,
                        },
                    ],
                },
                {
                    id: 21,
                    question: 'Hva er en "RESTful API"?',
                    answers: [
                        {
                            id: 0,
                            answer: 'En databasearkitektur for å lagre og administrere brukerdata.',
                            correct: false,
                        },
                        {
                            id: 1,
                            answer: 'En metode for å implementere dynamiske effekter på nettsider ved hjelp av JavaScript.',
                            correct: false,
                        },
                        {
                            id: 2,
                            answer: 'En type protokoll for å kryptere dataoverføringen mellom klient og server.',
                            correct: false,
                        },
                        {
                            id: 3,
                            answer: 'Et grensesnitt for å kommunisere med serveren ved hjelp av HTTP-protokollen, og som følger REST-prinsippene for arkitektur.',
                            correct: true,
                        },
                    ],
                },
                {
                    id: 22,
                    question: '',
                    answers: [
                        {
                            id: 0,
                            answer: '',
                            correct: false,
                        },
                        {
                            id: 1,
                            answer: '',
                            correct: false,
                        },
                        {
                            id: 2,
                            answer: '',
                            correct: false,
                        },
                        {
                            id: 3,
                            answer: '',
                            correct: false,
                        },
                    ],
                },
                {
                    id: 23,
                    question: 'Hva står HTML for?',
                    answers: [
                        {
                            id: 0,
                            answer: 'Hyper Text Markup Language',
                            correct: true,
                        },
                        {
                            id: 1,
                            answer: 'Hyperlinks and Text Markup Language',
                            correct: false,
                        },
                        {
                            id: 2,
                            answer: 'Home Tool Markup Language',
                            correct: false,
                        },
                    ],
                },
                {
                    id: 24,
                    question: 'Hva er CSS?',
                    answers: [
                        {
                            id: 0,
                            answer: 'Cascading Style Sheets',
                            correct: true,
                        },
                        {
                            id: 1,
                            answer: 'Creative Style Sheets',
                            correct: false,
                        },
                        {
                            id: 2,
                            answer: 'Computer Style Sheets',
                            correct: false,
                        },
                    ],
                },
                {
                    id: 25,
                    question: 'Hva brukes JavaScript primært til i webutvikling?',
                    answers: [
                        {
                            id: 0,
                            answer: 'Å style nettsider',
                            correct: false,
                        },
                        {
                            id: 1,
                            answer: 'Å legge til interaktivitet',
                            correct: true,
                        },
                        {
                            id: 2,
                            answer: 'Å definere strukturen til nettsider',
                            correct: false,
                        },
                    ],
                },
                {
                    id: 26,
                    question: 'Hva er en vanlig form for databasespråk brukt i webutvikling?',
                    answers: [
                        {
                            id: 0,
                            answer: 'SQL',
                            correct: true,
                        },
                        {
                            id: 1,
                            answer: 'NoSQL',
                            correct: false,
                        },
                        {
                            id: 2,
                            answer: 'Python',
                            correct: false,
                        },
                    ],
                },
                {
                    id: 27,
                    question: 'Hva står HTTP for?',
                    answers: [
                        {
                            id: 0,
                            answer: 'HyperText Transfer Protocol',
                            correct: true,
                        },
                        {
                            id: 1,
                            answer: 'HyperText Transmission Protocol',
                            correct: false,
                        },
                        {
                            id: 2,
                            answer: 'HyperText Transfer Process',
                            correct: false,
                        },
                    ],
                },
                {
                    id: 28,
                    question: 'Hva er en vanlig måte å definere stil på nettstedet ditt?',
                    answers: [
                        {
                            id: 0,
                            answer: 'HTML',
                            correct: false,
                        },
                        {
                            id: 1,
                            answer: 'CSS',
                            correct: true,
                        },
                        {
                            id: 2,
                            answer: 'JavaScript',
                            correct: false,
                        },
                    ],
                },
                {
                    id: 29,
                    question: 'Hva er en vanlig frontend-rammeverk?',
                    answers: [
                        {
                            id: 0,
                            answer: 'React',
                            correct: true,
                        },
                        {
                            id: 1,
                            answer: 'Django',
                            correct: false,
                        },
                        {
                            id: 2,
                            answer: 'Flask',
                            correct: false,
                        },
                    ],
                },
                {
                    id: 30,
                    question: 'Hva er en vanlig backend-rammeverk?',
                    answers: [
                        {
                            id: 0,
                            answer: 'Express.js',
                            correct: true,
                        },
                        {
                            id: 1,
                            answer: 'Angular.js',
                            correct: false,
                        },
                        {
                            id: 2,
                            answer: 'Vue.js',
                            correct: false,
                        },
                    ],
                },
                {
                    id: 31,
                    question: 'Hva er en vanlig form for asynkron kommunikasjon i webutvikling?',
                    answers: [
                        {
                            id: 0,
                            answer: 'Promises',
                            correct: true,
                        },
                        {
                            id: 1,
                            answer: 'Callbacks',
                            correct: false,
                        },
                        {
                            id: 2,
                            answer: 'Threads',
                            correct: false,
                        },
                    ],
                },
                {
                    id: 32,
                    question: 'Hva er en vanlig måte å lagre data på klientens side i webutvikling?',
                    answers: [
                        {
                            id: 0,
                            answer: 'LocalStorage',
                            correct: true,
                        },
                        {
                            id: 1,
                            answer: 'SessionStorage',
                            correct: false,
                        },
                        {
                            id: 2,
                            answer: 'Cookies',
                            correct: false,
                        },
                    ],
                },
            ]} />
        </div>
    );
}