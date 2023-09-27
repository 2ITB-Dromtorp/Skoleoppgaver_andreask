import { Outlet, Link } from 'react-router-dom';

const SUBJECT_DATA = {
    'html': {
        subject_name: 'HTML',
        main_pages: [
            {
                text: 'Introduction',
            },
        ],
        tutorials: [
            {
                text: 'Beginner',
                to: 'beginner',
            },
            {
                text: 'Forms',
                to: 'forms',
            },
            {
                text: 'Login Form',
                to: 'loginform',
            },
        ],
        references: {
            relative: 'element',
            pages: [
                {
                    text: 'html',
                    to: 'html',
                },
                {
                    text: 'body',
                    to: 'body',
                },
                {
                    text: 'div',
                    to: 'div',
                },
                {
                    text: 'p',
                    to: 'p',
                },
            ],
        },
    },
    'css': {
        subject_name: 'HTML',
        main_pages: [
            {
                text: 'Introduction',
            },
        ],
        tutorials: [
            {
                text: 'Beginner',
                to: 'beginner',
            },
        ],
        references: {
            relative: 'element',
            pages: [
                {
                    text: 'html',
                    to: 'html',
                },
                {
                    text: 'body',
                    to: 'body',
                },
                {
                    text: 'div',
                    to: 'div',
                },
                {
                    text: 'p',
                    to: 'p',
                },
            ],
        },
    },
    'js': {
        subject_name: 'HTML',
        main_pages: [
            {
                text: 'Introduction',
            },
        ],
        tutorials: [
            {
                text: 'Beginner',
                to: 'beginner',
            },
        ],
        references: {
            relative: 'element',
            pages: [
                {
                    text: 'html',
                    to: 'html',
                },
                {
                    text: 'body',
                    to: 'body',
                },
                {
                    text: 'div',
                    to: 'div',
                },
                {
                    text: 'p',
                    to: 'p',
                },
            ],
        },
    },
    'react': {
        subject_name: 'HTML',
        main_pages: [
            {
                text: 'Introduction',
            },
        ],
        tutorials: [
            {
                text: 'Beginner',
                to: 'beginner',
            },
        ],
        references: {
            relative: 'element',
            pages: [
                {
                    text: 'html',
                    to: 'html',
                },
                {
                    text: 'body',
                    to: 'body',
                },
                {
                    text: 'div',
                    to: 'div',
                },
                {
                    text: 'p',
                    to: 'p',
                },
            ],
        },
    },
    'router': {
        subject_name: 'HTML',
        main_pages: [
            {
                text: 'Introduction',
            },
        ],
        tutorials: [
            {
                text: 'Beginner',
                to: 'beginner',
            },
        ],
        references: {
            relative: 'element',
            pages: [
                {
                    text: 'html',
                    to: 'html',
                },
                {
                    text: 'body',
                    to: 'body',
                },
                {
                    text: 'div',
                    to: 'div',
                },
                {
                    text: 'p',
                    to: 'p',
                },
            ],
        },
    },
};

const ReferenceLink = ({ children, to, ...props }) => {
    return (
        <Link {...props} to={to} className="side_bar_link button_link">
            {children}
        </Link>
    );
}

const ListLinkLi = ({ children, ...props }) => {
    return (
        <li {...props}>
            {children}
        </li>
    );
}

const FullReferenceLink = ({ ...props }) => {
    return (
        <ListLinkLi>
            <ReferenceLink {...props}></ReferenceLink>
        </ListLinkLi>
    );
}

const Layout = ({subject, ...props}) => {
    return (
        <>
            <div className="learn_content_container">
                <nav id="side_bar">
                    <ol id="side_bar_main_list">
                        <li>
                            <ol className="side_bar_main_section_list">
                                <li>
                                    <h2>HTML</h2>
                                </li>
                                <li>
                                    <ol className="side_bar_main_section_list_link_list">
                                        <FullReferenceLink to="./introduction">Introduction</FullReferenceLink>
                                    </ol>
                                </li>
                            </ol>
                        </li>
                        <li>
                            <ol className="side_bar_main_section_list">
                                <li>
                                    <h2>Tutorials</h2>
                                </li>
                                <li>
                                    <ol className="side_bar_main_section_list_link_list">
                                        <FullReferenceLink to="tutorial/beginner">Beginner</FullReferenceLink>
                                    </ol>
                                </li>
                            </ol>
                        </li>
                        <li>
                            <ol className="side_bar_main_section_list">
                                <li>
                                    <h2>References</h2>
                                </li>
                                <li>
                                    <ol className="side_bar_main_section_list_link_list">
                                        <FullReferenceLink to="reference/element/html">html</FullReferenceLink>
                                        <FullReferenceLink to="reference/element/body">body</FullReferenceLink>
                                        <FullReferenceLink to="reference/element/div">div</FullReferenceLink>
                                        <FullReferenceLink to="reference/element/p">p</FullReferenceLink>
                                    </ol>
                                </li>
                            </ol>
                        </li>
                    </ol>
                </nav>
                <div className="learn_content">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;