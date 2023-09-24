import Button from '../../../../button';
import { Link } from 'react-router-dom';

const Introduction = () => {
    return (
        <>
            <h1>HTML</h1>
            <p><b>HTML</b>, which stands for HyperText Markup Language, is the backbone of the World Wide Web. It is a fundamental technology used to create and structure web content, allowing us to display information, media, and interactive elements on websites. HTML serves as the building blocks for web pages, defining the structure and organization of content, as well as how it should be presented in web browsers.</p>
            <p>HTML is not a programming language; rather, it's a markup language. This means that it uses a set of tags and attributes to describe the content's structure and presentation, rather than containing complex logic or algorithms. Web developers use HTML to create the framework of a web page, which can then be enhanced and styled using other technologies like CSS (Cascading Style Sheets) for styling and JavaScript for interactivity.</p>
            <p>In this introduction to HTML, we'll explore the basics of HTML syntax, commonly used tags, and how they work together to create web content. Whether you're a beginner looking to get started with web development or someone interested in understanding the foundation of the web, this guide will provide you with the essential knowledge to begin your journey into the world of HTML.</p>
            <Link className="button_link" to="./introduction"><Button>Introduction</Button></Link>
        </>
    );
}

export default Introduction;