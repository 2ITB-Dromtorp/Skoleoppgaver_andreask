import './index.css';

import { CustomButton, FancyButton } from "../../../../components/input";
import { Link } from 'react-router-dom';

import { ArrowRightIcon, CheckmarkIcon } from '../../../../svg';
import { useContext, useRef } from 'react';
import { SessionDataContext, UserDataContext, TutorialRefsContext, CoursesContext } from '../../../../context';

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
                <img className='course_card_image_image' src={courseImage} alt="kurs_bilde" />
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
    const { viewCoursesRef } = useContext(TutorialRefsContext);

    const { 0: courses } = useContext(CoursesContext);

    const coursesRef = useRef();

    /*
    const createToolTip = useToolTip();
    const { 0: sessionData } = useContext(SessionDataContext);
    createToolTip(({ toolTip }) => {
        return (
            <>
                Her er alle kursene
                <FancyButton primary={true} onClick={(e) => {
                    toolTip.destroy();
                }}>
                    Jeg forstår
                </FancyButton>
            </>
        );
    }, 'top', true, viewCoursesRef);
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
            <header className="main_header">
                <img className="main_header_image" src="https://elevatedachievement.com/wp-content/uploads/2022/04/shutterstock_760359742-scaled.jpg" alt="adults_in_a_classroom" />
                <div className="main_header_content_container">
                    <div className="main_header_content">
                        <h1 className="main_header_header">
                            Opplæring for godt voksne
                        </h1>
                        <p className="main_header_desc">
                            Velkommen til vår nettside dedikert til opplæring for voksne! Enten du ønsker å tilegne deg nye ferdigheter, oppdatere dine kunnskaper eller utforske en ny karrierevei, er vårt opplæringsprogram skreddersydd for å møte dine behov som voksenstudent. Vi tilbyr et mangfoldig utvalg av kurs innen ulike fagområder, levert av erfarne instruktører som forstår de unike utfordringene voksne elever står overfor.
                        </p>
                        <FancyButton ref={viewCoursesRef} primary={true} className="main_header_button" onClick={() => {
                            coursesRef.current.scrollIntoView({ behavior: 'smooth' });
                        }}>
                            Se kurs&nbsp;<ArrowRightIcon className="text_icon" />
                        </FancyButton>
                    </div>
                </div>
            </header>
            <section id="course_cards_section" ref={coursesRef}>
                <h2 id="courses_header">
                    Kurs
                </h2>
                <div id="course_cards">
                    {courses.map((course) => {
                        return (
                            <Course key={course.id} courseId={course.id} courseTitle={course.name} courseDesc={course.short_description} courseImage={course.image} />
                        );
                    })}
                </div>
            </section>
        </div>
    );
}

export default Index;