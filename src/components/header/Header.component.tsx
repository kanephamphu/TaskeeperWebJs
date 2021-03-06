import React, { useEffect } from "react";

import { withRouter } from "react-router-dom";
import * as Style from "components/header/style";
import AuthorizationItemsMenu from "components/authorizationHeader";

function Header() {
    useEffect(() => {}, []);

    return (
        <div className="container-fluid px-md-4	">
            <a className="navbar-brand" href="../">
                Taskeeper
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#ftco-nav"
                aria-controls="ftco-nav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="oi oi-menu"></span> Menu
            </button>

            <div className="collapse navbar-collapse" id="ftco-nav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <a href="../" className="nav-link">
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="../posts" className="nav-link">
                            Browse Jobs
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="../searchUsers/Tai" className="nav-link">
                            Candidates
                        </a>
                    </li>
                    <AuthorizationItemsMenu />
                </ul>
            </div>
        </div>
    );
}

export default withRouter(Header);
