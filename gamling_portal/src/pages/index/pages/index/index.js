import './index.css';

import { CustomButton, FancyButton } from "../../../../components/input";
import { Link } from 'react-router-dom';

import { ArrowRightIcon, CheckmarkIcon } from '../../../../svg';
import { useState, useContext, useEffect, useRef } from 'react';
import { SessionDataContext, UserDataContext, TutorialRefsContext } from '../../../../context';
import { useToolTip } from '../../../../custom_hooks';

function Course({ courseId, courseTitle, courseDesc, courseImage }) {
    const { 0: sessionData } = useContext(SessionDataContext);
    const { 0: userData } = useContext(UserDataContext);
    let bottomAddContent;
    if (sessionData && sessionData.logged_in === true && userData && userData.joined_courses.includes(courseId)) {
        bottomAddContent = (
            <div className='joined_course_message'>
                <CheckmarkIcon className="joined_course_checkmark_icon" />
                Meldt på
            </div>
        );
    }
    return (
        <div className='course_card'>
            <div className='course_card_image'>
                {courseImage}
            </div>
            <div className='course_card_name'>
                {courseTitle}
            </div>
            <div className='course_card_desc'>
                {courseDesc}
            </div>
            <div className='course_bottom'>
                <CustomButton element={Link} className='course_view_button' to={`/course/${courseId}`}>
                    Se kurs&nbsp;<ArrowRightIcon className="text_icon" />
                </CustomButton>
                {bottomAddContent}
            </div>
        </div>
    );
}

function Index() {
    const { homeButtonRef, loginButtonRef, signupButtonRef, accountButtonRef, viewCoursesRef } = useContext(TutorialRefsContext);

    const coursesRef = useRef();

    /*
    const createToolTip = useToolTip();
    const { 0: sessionData } = useContext(SessionDataContext);
    const [isFirstRender, setIsFirstRender] = useState(true);
    useEffect(() => {
        if (isFirstRender && (sessionData && 'logged_in' in sessionData)) {
            setIsFirstRender(false);
            createToolTip(({ toolTip }) => {
                return (
                    <>
                        Trykk her for å gå tilbake til hjemmesiden
                        <FancyButton primary={true} onClick={(e) => {
                            toolTip.destroy();
                        }}>
                            Jeg forstår
                        </FancyButton>
                    </>
                );
            }, 'right', true, homeButtonRef);
            if (loginButtonRef.current) {
                createToolTip(({ toolTip }) => {
                    return (
                        <>
                            Trykk her for å logge inn
                            <FancyButton primary={true} onClick={(e) => {
                                toolTip.destroy();
                            }}>
                                Jeg forstår
                            </FancyButton>
                        </>
                    );
                }, 'left', true, loginButtonRef);
            }
            if (signupButtonRef.current) {
                createToolTip(({ toolTip }) => {
                    return (
                        <>
                            Trykk her for å se registrere ny bruker
                            <FancyButton primary={true} onClick={(e) => {
                                toolTip.destroy();
                            }}>
                                Jeg forstår
                            </FancyButton>
                        </>
                    );
                }, 'bottom', true, signupButtonRef);
            }
            if (accountButtonRef.current) {
                createToolTip(({ toolTip }) => {
                    return (
                        <>
                            Trykk her for å se og redigere brukeren din
                            <FancyButton primary={true} onClick={(e) => {
                                toolTip.destroy();
                            }}>
                                Jeg forstår
                            </FancyButton>
                        </>
                    );
                }, 'bottom', true, accountButtonRef);
            }
            if (viewCoursesRef.current) {
                createToolTip(({ toolTip }) => {
                    return (
                        <>
                            Trykk her for å se tilgjengelige kurs
                            <FancyButton primary={true} onClick={(e) => {
                                toolTip.destroy();
                            }}>
                                Jeg forstår
                            </FancyButton>
                        </>
                    );
                }, 'bottom', true, viewCoursesRef);
            }
        }
    }, [isFirstRender, sessionData, createToolTip]);
    */

    /*
    <svg id='tutorial_highlight_svg' preserveAspectRatio='none' viewBox='0 0 100 100'>
        <defs>
            <mask id="window_mask">
                <rect x="0%" y="0%" width="100%" height="100%" fill="rgb(255, 255, 255)" />
                <rect x="25%" y="25%" width="50%" height="50%" fill="rgb(0, 0, 0)" />
            </mask>
        </defs>
        <rect x="0%" y="0%" width="100%" height="100%" fill="rgba(0, 0, 0, 0.8)" mask="url(#window_mask)" />
    </svg>
    */

    return (
        <div id="index_container">
            <header id="main_header_section">
                <img id="main_header_image" src="https://elevatedachievement.com/wp-content/uploads/2022/04/shutterstock_760359742-scaled.jpg" alt="adults_in_a_classroom" />
                <div id="main_header">
                    <h1 id="main_header_header">
                        Opplæring for godt voksne
                    </h1>
                    <p id="main_header_desc">
                        Velkommen til vår nettside dedikert til opplæring for voksne! Enten du ønsker å tilegne deg nye ferdigheter, oppdatere dine kunnskaper eller utforske en ny karrierevei, er vårt opplæringsprogram skreddersydd for å møte dine behov som voksenstudent. Vi tilbyr et mangfoldig utvalg av kurs innen ulike fagområder, levert av erfarne instruktører som forstår de unike utfordringene voksne elever står overfor.
                    </p>
                    <FancyButton ref={viewCoursesRef} primary={true} id="main_header_view_courses_button" onClick={() => {
                        coursesRef.current.scrollIntoView({ behavior: 'smooth' });
                    }}>
                        Se kurs&nbsp;<ArrowRightIcon className="text_icon" />
                    </FancyButton>
                </div>
            </header>
            <section id="course_cards_section" ref={coursesRef}>
                <h2 id="courses_header">
                    Kurs
                </h2>
                <div id="course_cards">
                    <Course courseId={0} courseTitle='Norsk' courseDesc='Dykk inn i vårt norskopplæringskurs skreddersydd for voksne.' courseImage={<img className='course_image_image' src="https://images.unsplash.com/photo-1553729784-e91953dec042?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29uJTIwcmVhZGluZ3xlbnwwfHwwfHx8MA%3D%3D" alt="person_reading_book" />} />
                    <Course courseId={1} courseTitle='Datakunnskap' courseDesc='Vår datakunnskapsskurs gir voksne en grunnleggende forståelse av datamaskiner.' courseImage={<img className='course_image_image' src="https://img.freepik.com/free-photo/male-entrepreneur-using-computer-while-working-office_637285-8680.jpg" alt="person_using_computer" />} />
                    <Course courseId={2} courseTitle='Heimkunnskap' courseDesc='Lær praktiske ferdigheter i matlaging, ernæring og husholdning på dette engasjerende kurs.' courseImage={<img className='course_image_image' src="https://www.mashed.com/img/gallery/this-is-why-people-are-baking-more-during-the-pandemic-according-to-a-chef-exclusive/intro-1599689497.jpg" alt="person_baking" />} />
                    <Course courseId={3} courseTitle='Kroppsøving' courseDesc='Ta din treningsrutine til nye høyder med vårt intensive gymkurs.' courseImage={<img className='course_image_image' src="https://hips.hearstapps.com/hmg-prod/images/running-is-one-of-the-best-ways-to-stay-fit-royalty-free-image-1036780592-1553033495.jpg?crop=0.88976xw:1xh;center,top&resize=1200:*" alt="person_jogging" />} />
                </div>
            </section>
        </div>
    );
}

export default Index;