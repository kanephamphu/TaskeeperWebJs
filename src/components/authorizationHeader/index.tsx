import { LocalStorageKey } from "enums/localstorage.enum";
import React, { Component, useEffect, useState } from "react";
import {
    checkAuthorization,
    getJwtUserData,
} from "services/authentication/authentication.service";
import { Link } from "react-router-dom";

const AuthorizationItemsMenu = (props: any) => {
    const { history } = props;
    const isLogin = checkAuthorization();
    let userData: any;

    if (isLogin) {
        userData = getJwtUserData();

        return (
            <>
                <li className="nav-item cta mr-md-1">
                    <a href="post-job" className="nav-link">
                        Post a Job
                    </a>
                </li>
                <li className="nav-item cta cta-colored">
                    <a href="job-post.html" className="nav-link">
                        Want a Job
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link">{`${userData.firstName}, how are you!`}</a>
                </li>
                <li className="nav-item dropdown">
                    <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        Profile
                    </a>
                    <div
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                    >
                        <a className="dropdown-item" href="#">
                            My user profile
                        </a>
                        <a className="dropdown-item" href="#">
                            Settings
                        </a>
                        <div className="dropdown-divider"></div>
                        <a
                            className="dropdown-item"
                            onClick={() => {
                                alert("Logout successfully");
                                localStorage.setItem(
                                    LocalStorageKey.BEARER,
                                    ""
                                );

                                history.push("/");
                            }}
                        >
                            Logout
                        </a>
                    </div>
                </li>
            </>
        );
    }

    return (
        <>
            <li className="nav-item cta mr-md-1">
                <a href="/login" className="nav-link">
                    Login
                </a>
            </li>
            <li className="nav-item cta cta-colored">
                <a href="/register" className="nav-link">
                    Register
                </a>
            </li>
        </>
    );
};

export default AuthorizationItemsMenu;