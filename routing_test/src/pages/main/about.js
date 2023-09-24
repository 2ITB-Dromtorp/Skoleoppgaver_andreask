const About = () => {
    const websiteName = 'Moai Coding';
    return (
        <>
            <div className="standard_content_container">
                <div className="standard_content">
                    <h1>About {websiteName}</h1>
                    <p>Welcome to {websiteName} – Your Ultimate Resource for Web Development Learning!</p>
                    <p>At {websiteName}, we're passionate about helping aspiring web developers, seasoned professionals, and everyone in between, embark on a journey of mastering the building blocks of the modern web: HTML, CSS, JavaScript, and React. Our mission is to make web development accessible and enjoyable for all, whether you're a beginner taking your first steps or an experienced coder looking to stay up-to-date with the latest industry trends.</p>
                    <span className="section_space medium"></span>
                    <h3>Our Commitment</h3>
                    <dl className="desc_list">
                        <dt>Comprehensive Documentation</dt>
                        <dd>We provide in-depth documentation for HTML, CSS, JavaScript, and React, serving as your go-to reference guide. From basic syntax to advanced concepts, you'll find everything you need to build web projects with confidence.</dd>
                        <dt>Step-by-Step Tutorials</dt>
                        <dd>Our tutorials are designed to take you from novice to ninja. We offer hands-on, easy-to-follow tutorials that walk you through practical exercises, projects, and real-world applications.</dd>
                        <dt>Stay Current</dt>
                        <dd>The web development landscape evolves rapidly, and we're dedicated to keeping you informed. We regularly update our content to reflect the latest best practices and emerging technologies.</dd>
                    </dl>
                    <span className="section_space medium"></span>
                    <h3>Our Team</h3>
                    <p>We are a team of passionate web developers, designers, and educators who share a common vision – to empower individuals like you to create stunning, functional, and interactive websites and web applications. With years of industry experience, we understand the challenges you may face and are here to provide guidance every step of the way.</p>
                    <span className="section_space medium"></span>
                    <h3>Why Choose {websiteName}?</h3>
                    <dl>
                        <dt>Quality Content</dt>
                        <dd>Our tutorials and documentation are carefully curated to ensure accuracy, relevance, and depth, ensuring you receive the highest quality education.</dd>
                        <dt>Community Support</dt>
                        <dd>Join our vibrant community of learners and experts. Share your experiences, ask questions, and collaborate with fellow developers to foster growth and creativity.</dd>
                        <dt>Beginner-Friendly</dt>
                        <dd>We welcome beginners with open arms. No prior experience? No problem! We offer beginner-friendly content designed to build your confidence and skills progressively.</dd>
                    </dl>
                    <span className="section_space medium"></span>
                    <h3>Get Started Today</h3>
                    <p>Ready to embark on your web development journey or take your skills to the next level? Start exploring our documentation and tutorials now! Whether you're interested in HTML and CSS for web design, JavaScript for interactivity, or React for building dynamic web applications, we have you covered.</p>
                    <p>Thank you for choosing {websiteName} as your trusted resource for web development knowledge. We're excited to be part of your learning journey and can't wait to see the amazing web projects you'll create.</p>
                    <p>Happy coding!</p>
                </div>
            </div>
        </>
    );
}

export default About;