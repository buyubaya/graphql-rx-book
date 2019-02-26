import React from 'react';
import { Route, Link } from 'react-router-dom';


export default function CustomLink({ to, children, exact }) {
    return (
        <Route
            path={to}
            exact={exact}
            children={({ match }) => (
                <li className={match ? 'is-active' : ''}>
                    <Link to={to}>{children}</Link>
                </li>
            )}
        />
    );
}