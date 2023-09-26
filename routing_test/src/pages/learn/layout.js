import { Outlet, Link, useLocation } from 'react-router-dom';

const ReferenceLink = ({ children, to, ...props }) => {
    return (
        <Link {...props} to={to} relative="">
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

const Layout = () => {
    const loc = useLocation();
    console.log(loc)
    
    return (
        <>
            <nav id="side_bar">
                <ol id="side_bar_main_list">
                    <li>
                        <ol>
                            <li>
                                <h2>HTML</h2>
                            </li>
                            <li>
                                <ol>
                                    <FullReferenceLink to="./introduction">Introduction</FullReferenceLink>
                                </ol>
                            </li>
                        </ol>
                    </li>
                    <li>
                        <ol>
                            <li>
                                <h2>Tutorials</h2>
                            </li>
                            <li>
                                <ol>
                                    <FullReferenceLink to="tutorial/beginner">Beginner</FullReferenceLink>
                                </ol>
                            </li>
                        </ol>
                    </li>
                    <li>
                        <ol>
                            <li>
                                <h2>References</h2>
                            </li>
                            <li>
                                <ol>
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
            <div className="learn_content_container">
                <div className="learn_content">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;