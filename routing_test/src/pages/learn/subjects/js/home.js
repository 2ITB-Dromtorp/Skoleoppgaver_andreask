import Button from '../../../../button';
import { Link } from 'react-router-dom';

const Introduction = () => {
    return (
        <>
            <h1>JavaScript</h1>
            <p><b>JavaScript</b> is a versatile and essential programming language that powers the interactive elements of the World Wide Web. Created in the mid-1990s by Brendan Eich while he was working at Netscape Communications, JavaScript has since become a fundamental tool for web developers worldwide. Unlike its namesake, Java, JavaScript is not related to Java in terms of syntax or structure, but it plays a crucial role in enhancing the functionality and interactivity of websites.</p>
            <p>JavaScript is a client-side scripting language, which means it runs directly in your web browser. This enables web developers to create dynamic and responsive web applications, allowing users to interact with web content seamlessly. Whether you're building a simple website with basic interactivity or a complex web application, JavaScript is an essential component of modern web development.</p>
            <p>In this introduction to JavaScript, we'll explore its fundamental concepts, syntax, and key features, providing you with a solid foundation to begin your journey into the exciting world of web development. Whether you're a novice looking to learn your first programming language or an experienced developer seeking to expand your skill set, JavaScript offers a vibrant and ever-evolving ecosystem that continues to shape the digital landscape. So, let's dive into the world of JavaScript and unlock its incredible potential for building dynamic, interactive, and engaging web experiences.</p>
            <Link className="button_link" to="./introduction"><Button>Introduction</Button></Link>
        </>
    );
}

export default Introduction;