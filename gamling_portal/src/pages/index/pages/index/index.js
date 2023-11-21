import './index.css';

import { CustomButton, FancyButton } from "../../../../components/input";
import { Link } from 'react-router-dom';

//get some icon from svgrepo
import { ReactComponent as ArrowRightSvg } from '../../../../svgs/arrow_right.svg';

const courseCols = {
    norwegian: [255, 84, 249],
    computerknowledge: [255, 228, 51],
    gym: [97, 244, 255],
}

function Course({ courseName, courseTitle, courseDesc, courseImage }) {
    const col = courseCols[courseName];
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
            <CustomButton element={Link} to={`/course/${courseName}`}>
                Se kurs
            </CustomButton>
        </div>
    );
}

function Index() {
    return (
        <div id="index_container">
            <header id="main_header_section">
                <div id="main_header">
                    <h1 id="main_header_header">
                        Opplæring for godt voksne
                    </h1>
                    <p id="main_header_desc">
                        Lorem ipsim bing chill kai cenat skibidi toilet ohio level 5 ohio gyatt rizz fanum tax lorem ipsim bing chill kai cenat skibidi toilet ohio level 5 ohio gyatt rizz fanum tax lorem ipsim bing chill kai cenat skibidi toilet ohio level 5 ohio gyatt rizz fanum tax lorem ipsim bing chill kai cenat skibidi toilet ohio level 5 ohio gyatt rizz fanum tax.
                    </p>
                    <FancyButton primary={true}>Se kurs</FancyButton>
                </div>
            </header>
            <section id="course_cards_section">
                <div id="course_cards">
                    <Course courseName='norwegian' courseTitle='Norsk' courseDesc='Lær deg norsk, lorem ipsum abaw ownd aowdnwadioadw wadaw' courseImage={<img className='course_image_image' src="https://images.unsplash.com/photo-1553729784-e91953dec042?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29uJTIwcmVhZGluZ3xlbnwwfHwwfHx8MA%3D%3D" alt="person_reading_book" />} />
                    <Course courseName='computerknowledge' courseTitle='Datakunnskap' courseDesc='Lær deg mer om datamaskiner, lorem ipsum abaw ownd aowdnwadioadw wadaw' courseImage={<img className='course_image_image' src="https://img.freepik.com/free-photo/male-entrepreneur-using-computer-while-working-office_637285-8680.jpg" alt="person_using_computer" />} />
                    <Course courseName='gym' courseTitle='Kroppsøving' courseDesc='Bli bodybuilder, lorem ipsum abaw ownd aowdnwadioadw wadaw' courseImage={<img className='course_image_image' src="https://hips.hearstapps.com/hmg-prod/images/running-is-one-of-the-best-ways-to-stay-fit-royalty-free-image-1036780592-1553033495.jpg?crop=0.88976xw:1xh;center,top&resize=1200:*" alt="person_jogging" />} />
                </div>
            </section>
        </div>
    );
}

export default Index;