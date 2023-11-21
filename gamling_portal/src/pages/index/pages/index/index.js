import './index.css';

import { FancyButton } from "../../../../components/input";

function Course({ courseName, courseDesc, courseImage }) {
    return (
        <div className={`course ${courseName}`}>
            <div className='course_image'>
                {courseImage}
            </div>
            <div className='course_name'>
                {courseName}
            </div>
            <div className='course_desc'>
                {courseDesc}
            </div>
        </div>
    );
}

function Index() {
    return (
        <div id="index_container">
            <header id="main_header">
                <h1>
                    Opplæring for godt voksne
                </h1>
                <p>
                    Lorem ipsim bing chill kai cenat skibidi toilet ohio level 5 ohio gyatt rizz fanum tax lorem ipsim bing chill kai cenat skibidi toilet ohio level 5 ohio gyatt rizz fanum tax lorem ipsim bing chill kai cenat skibidi toilet ohio level 5 ohio gyatt rizz fanum tax lorem ipsim bing chill kai cenat skibidi toilet ohio level 5 ohio gyatt rizz fanum tax.
                </p>
                <FancyButton primary={true}>Se kurs</FancyButton>
            </header>
            <section id="courses_section">
                <Course courseName='norwegian' title='Norsk' desc='Lær deg norsk, lorem ipsum abaw ownd aowdnwadioadw wadaw' />
                <Course courseName='computerknowledge' title='Datakunnskap' desc='Lær deg mer om datamaskiner, lorem ipsum abaw ownd aowdnwadioadw wadaw' />
                <Course courseName='gym' title='Kroppsøving' desc='Bli bodybuilder, lorem ipsum abaw ownd aowdnwadioadw wadaw' />
            </section>
        </div>
    );
}

export default Index;