import { useEffect } from 'react';
import { useLocation, matchPath, useNavigate } from 'react-router-dom';

import { RoutesList as OrigRoutesList } from '../App';

const NoPage = () => {
    const loc = useLocation();
    const navig = useNavigate();

    useEffect(() => {
        const paths = loc.pathname.split('/');

        if (paths[0] === '') {
            paths.shift();
        }

        let curRoute = OrigRoutesList.props.children;
        let resPath = '';

        for (let i = 0; i < paths.length; i++) {
            const curPath = paths[i];
            const children = curRoute.props.children;
            let match;
            if (children !== undefined) {
                for (let cI = 0; cI < children.length; cI++) {
                    const checkRoute = children[cI];
                    if (checkRoute.props.index === true) {
                        continue;
                    }
                    if (curPath === checkRoute.props.path) {
                        match = curPath;
                        curRoute = checkRoute;
                        break;
                    }
                }
                if (match !== undefined) {
                    resPath += '/' + match;
                } else {
                    console.log("bruh");
                    break;
                }
            }
        }

        if (resPath !== undefined && loc.pathname !== resPath) {
            navig(resPath);
        }
    });

    return (
        <>
            <div className="standard_content_container">
                <div className="standard_content">
                    <h1>ERROR: 404</h1>
                    <p>Page not found</p>
                </div>
            </div>
        </>
    );
}

export default NoPage;