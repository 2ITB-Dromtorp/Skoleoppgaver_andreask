import Button from '../../button';
import { Link } from 'react-router-dom';

const Home = () => {
    const websiteName = 'Moai Academy';
    return (
        <>
            <div id="home_top_container">

            </div>
            <div className="standard_content_container">
                <div className="standard_content">
                    <p className="text_center">Are you ready to embark on a journey into the fascinating world of web development? Look no further! {websiteName} is your one-stop destination for comprehensive documentation and tutorials on HTML, CSS, JavaScript, and React. Whether you're a beginner taking your first steps into the world of coding or an experienced developer seeking to refine your skills, we have something for everyone.</p>
                    <span className="section_space medium"></span>
                    <h2>Why {websiteName}?</h2>
                    <h3>In-Depth Tutorials</h3>
                    <p>In-Depth Tutorials: Our expertly crafted tutorials cover everything from the basics to advanced concepts. Whether you're learning the ropes of HTML, mastering the intricacies of CSS, diving into the dynamic world of JavaScript, or harnessing the power of React, we've got you covered.</p>
                    <span className="section_space small"></span>
                    <h3>Interactive Learning</h3>
                    <p>We believe that hands-on practice is the key to becoming a proficient developer. That's why we offer interactive coding exercises and projects alongside our tutorials, helping you apply your knowledge in real-world scenarios.</p>
                    <span className="section_space small"></span>
                    <h3>Up-to-Date Content</h3>
                    <p>The world of web development evolves rapidly, and so do we. Our content is continuously updated to keep pace with the latest industry trends and best practices, ensuring you always stay at the forefront of web development.</p>
                    <span className="section_space small"></span>
                    <h3>Community Support</h3>
                    <p>Join our vibrant community of developers, where you can connect, ask questions, and share your experiences. Learning is more enjoyable when you're part of a supportive network.</p>
                    <span className="section_space small"></span>
                    <h3>Resource Library</h3>
                    <p>Explore our extensive resource library, packed with cheat sheets, reference guides, and downloadable assets to streamline your development process.</p>
                    <span className="section_space small"></span>
                    <Link className="button_link" to="./learn"><Button>View courses</Button></Link>
                </div>
            </div>
        </>
    );
}

export default Home;