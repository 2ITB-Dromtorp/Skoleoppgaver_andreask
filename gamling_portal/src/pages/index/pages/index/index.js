import './index.css';

import { CustomButton, FancyButton } from "../../../../components/input";
import { Link } from 'react-router-dom';

import { ArrowRightSvg, CheckmarkIcon } from '../../../../svg';
import { useContext, useRef } from 'react';
import { SessionDataContext, UserDataContext } from '../../../../context';

const courseCols = {
    norwegian: [255, 84, 249],
    computerknowledge: [255, 228, 51],
    gym: [97, 244, 255],
}

function Course({ courseName, courseTitle, courseDesc, courseImage }) {
    const { 0: sessionData } = useContext(SessionDataContext);
    const { 0: userData } = useContext(UserDataContext);
    const col = courseCols[courseName];
    let bottomAddContent;
    if (sessionData && sessionData.logged_in === true && userData && userData.joined_courses.includes(courseName)) {
        bottomAddContent = (
            <div className='joined_course_message'>
                <CheckmarkIcon className="joined_course_checkmark_icon" />
                Meldt på
            </div>
        );
    }
    return (
        <div className='course_card' style={{ '--r': col[0], '--g': col[1], '--b': col[2] }}>
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
                <CustomButton element={Link} className='course_view_button' to={`/course/${courseName}`}>
                    Se kurs&nbsp;<ArrowRightSvg className="text_icon" />
                </CustomButton>
                {bottomAddContent}
            </div>
        </div>
    );
}

function Index() {
    const coursesRef = useRef();

    return (
        <div id="index_container">
            <header id="main_header_section">
                <div id="main_header">
                    <h1 id="main_header_header">
                        Opplæring for godt voksne
                    </h1>
                    <p id="main_header_desc">
                        Velkommen til vår nettside dedikert til opplæring for voksne! Enten du ønsker å tilegne deg nye ferdigheter, oppdatere dine kunnskaper eller utforske en ny karrierevei, er vårt opplæringsprogram skreddersydd for å møte dine behov som voksenstudent. Vi tilbyr et mangfoldig utvalg av kurs innen ulike fagområder, levert av erfarne instruktører som forstår de unike utfordringene voksne elever står overfor.
                    </p>
                    <FancyButton primary={true} onClick={() => {
                        coursesRef.current.scrollIntoView({ behavior: 'smooth' });
                    }}>
                        Se kurs&nbsp;<ArrowRightSvg className="text_icon" />
                    </FancyButton>
                </div>
            </header>
            <section id="course_cards_section" ref={coursesRef}>
                <div id="course_cards">
                    <Course courseName='norwegian' courseTitle='Norsk' courseDesc='Dykk inn i vårt norskopplæringskurs skreddersydd for voksne.' courseImage={<img className='course_image_image' src="https://images.unsplash.com/photo-1553729784-e91953dec042?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29uJTIwcmVhZGluZ3xlbnwwfHwwfHx8MA%3D%3D" alt="person_reading_book" />} />
                    <Course courseName='computerknowledge' courseTitle='Datakunnskap' courseDesc='Vår datakunnskapsskurs gir voksne en grunnleggende forståelse av datamaskiner.' courseImage={<img className='course_image_image' src="https://img.freepik.com/free-photo/male-entrepreneur-using-computer-while-working-office_637285-8680.jpg" alt="person_using_computer" />} />
                    <Course courseName='gym' courseTitle='Kroppsøving' courseDesc='Ta din treningsrutine til nye høyder med vårt intensive gymkurs!' courseImage={<img className='course_image_image' src="https://hips.hearstapps.com/hmg-prod/images/running-is-one-of-the-best-ways-to-stay-fit-royalty-free-image-1036780592-1553033495.jpg?crop=0.88976xw:1xh;center,top&resize=1200:*" alt="person_jogging" />} />
                </div>
            </section>
        </div>
    );
}

export default Index;