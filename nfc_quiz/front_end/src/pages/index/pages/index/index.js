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
            ]} />
        </div>
    );
}