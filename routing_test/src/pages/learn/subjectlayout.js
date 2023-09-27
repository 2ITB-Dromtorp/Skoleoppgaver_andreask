import { Outlet, Link } from 'react-router-dom';

const SUBJECT_DATA = {
    'html': {
        subject_name: 'HTML',
        main_pages: [
            {
                type: 'link',
                text: 'Introduction',
                to: 'introduction',
            },
        ],
        tutorials: [
            {
                type: 'link',
                text: 'Beginner',
                to: 'beginner',
            },
            {
                type: 'link',
                text: 'Forms',
                to: 'forms',
            },
            {
                type: 'link',
                text: 'Login Form',
                to: 'loginform',
            },
        ],
        references: [
            {
                type: 'section',
                relative: 'element',
                pages: [
                    {
                        type: 'link',
                        text: 'p',
                        to: 'p',
                    },
                    {
                        type: 'link',
                        text: 'div',
                        to: 'div',
                    },
                    {
                        type: 'link',
                        text: 'img',
                        to: 'img',
                    },
                ],
            },
        ],
    },
    'css': {
        subject_name: 'CSS',
        main_pages: [
            {
                type: 'link',
                text: 'Introduction',
                to: 'introduction',
            },
        ],
        tutorials: [
            {
                type: 'link',
                text: 'Beginner',
                to: 'beginner',
            },
        ],
        references: [
            {
                type: 'section',
                relative: 'property',
                pages: [
                    {
                        type: 'link',
                        text: 'Color',
                        to: 'color',
                    },
                ],
            },
        ],
    },
    'js': {
        subject_name: 'JavaScript',
        main_pages: [
            {
                type: 'link',
                text: 'Introduction',
                to: 'introduction',
            },
        ],
        tutorials: [
            {
                type: 'link',
                text: 'Beginner',
                to: 'beginner',
            },
        ],
        references: [
            {
                type: 'section',
                relative: 'dom',
                pages: [
                    {
                        type: 'link',
                        text: 'Document',
                        to: 'document',
                    },
                ],
            },
        ],
    },
    'react': {
        subject_name: 'React',
        main_pages: [
            {
                type: 'link',
                text: 'Introduction',
                to: 'introduction',
            },
        ],
        tutorials: [
            {
                type: 'link',
                text: 'Beginner',
                to: 'beginner',
            },
        ],
        references: [
            {
                type: 'section',
                relative: 'hook',
                pages: [
                    {
                        type: 'link',
                        text: 'useState',
                        to: 'usestate',
                    },
                ],
            },
        ],
    },
    'react_router': {
        subject_name: 'React Router',
        main_pages: [
            {
                type: 'link',
                text: 'Introduction',
                to: 'introduction',
            },
        ],
        tutorials: [
            {
                type: 'link',
                text: 'Beginner',
                to: 'beginner',
            },
        ],
        references: [
            {
                type: 'section',
                relative: 'component',
                pages: [
                    {
                        type: 'link',
                        text: 'BrowserRouter',
                        to: 'browserrouter',
                    },
                ],
            },
        ],
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

const Layout = ({ subject: subjectName, ...props }) => {
    const subject = SUBJECT_DATA[subjectName];
    /*
    references: {
        type: 'section',
        relative: 'element',
        pages: [
            {
                type: 'link',
                text: 'p',
                to: 'p',
            },
        ],
    },
    */

    const getDeepLinks = (origRelative, origSection) => {
        const getSection = (relative, section) => {
            let res;
            if (section.type === 'section') {
                res = [];
                let newRel;
                if (section.relative === '') {
                    newRel = section.relative;
                } else {
                    newRel = section.relative + '/';
                }
                for (let i = 0; i < section.pages.length; i++) {

                    res.push(getSection(relative + newRel, section.pages[i]));
                }
            } else if (section.type === 'link') {
                res = <FullReferenceLink to={'./' + relative + section.to}>{section.text}</FullReferenceLink>;
            } else {
                console.warn("bruh secion no go sir, ", section.type);
            }
            return res;
        }
        return getSection(origRelative, origSection);
    }

    const mainPages = getDeepLinks('', {
        type: 'section',
        relative: '',
        pages: subject.main_pages,
    });
    /*
    <ol className="side_bar_main_section_list_link_list">
        <FullReferenceLink to="./introduction">Introduction</FullReferenceLink>
    </ol>
    */

    const tutorialPages = getDeepLinks('', {
        type: 'section',
        relative: 'tutorial',
        pages: subject.tutorials,
    });
    /*
    <ol className="side_bar_main_section_list_link_list">
        <FullReferenceLink to="tutorial/beginner">Beginner</FullReferenceLink>
    </ol>
    */

    const referencePages = getDeepLinks('', {
        type: 'section',
        relative: '',
        pages: subject.references,
    });
    /*
    <ol className="side_bar_main_section_list_link_list">
        <FullReferenceLink to="reference/element/html">html</FullReferenceLink>
        <FullReferenceLink to="reference/element/body">body</FullReferenceLink>
        <FullReferenceLink to="reference/element/div">div</FullReferenceLink>
        <FullReferenceLink to="reference/element/p">p</FullReferenceLink>
    </ol>
    */

    return (
        <>
            <div className="learn_content_container">
                <nav id="side_bar">
                    <ol id="side_bar_main_list">
                        <li>
                            <ol className="side_bar_main_section_list">
                                <li>
                                    <h2>{subject.subject_name}</h2>
                                </li>
                                <li>
                                    {mainPages}
                                </li>
                            </ol>
                        </li>
                        <li>
                            <ol className="side_bar_main_section_list">
                                <li>
                                    <h2>Tutorials</h2>
                                </li>
                                <li>
                                    {tutorialPages}
                                </li>
                            </ol>
                        </li>
                        <li>
                            <ol className="side_bar_main_section_list">
                                <li>
                                    <h2>References</h2>
                                </li>
                                <li>
                                    {referencePages}
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