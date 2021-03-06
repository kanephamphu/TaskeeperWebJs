import React, { Component, EffectCallback, useEffect, useState } from "react";
import RecommendJob from "pages/jobRecommentPage/index";
import { useParams } from "react-router-dom";
import {
    applyJob,
    getPost,
    getRecommendPosts,
} from "services/posts/post.service";
import { SalaryType } from "enums/post.enum";
import { Markup } from "interweave";
import moduleConfig from "module.config";
import _ from "lodash";
import { getUser } from "services/users/users.service";
import { getJwtUserData } from "services/authentication/authentication.service";
import PostList from "components/PostList";

const QRCode = require("qrcode.react");

const DetailJobPage = (props: any) => {
    const [postData, setPostData] = useState({} as any);
    const [ownerData, setOwnerData] = useState({} as any);
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    const params: any = useParams();
    const jobUrl: string = `${moduleConfig.devServer.host}/detail-job/${params.id}`;
    const updateJobUrl: string = `${moduleConfig.devServer.host}/editJob/${params.id}`;
    const [recommendPosts, setRecommendPosts] = useState([] as any[]);

    const getData = (): Promise<Object> => {
        return getPost(params.id);
    };

    useEffect(() => {
        getData().then((data) => {
            try {
                setPostData(data);

                const ownerId: any = _.head((data as any).owner);

                if (ownerId === (getJwtUserData() as any)._id) {
                    setIsPreviewMode(true);
                }
                getUser(ownerId).then((ownerData) => {
                    setOwnerData(ownerData);
                });

                getRecommendPosts(params.id)
                    .then((data) => {
                        setRecommendPosts(data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } catch (err) {
                console.error();
            }
        });
    }, []);

    return (
        <div>
            <div
                className="hero-wrap hero-wrap-2"
                style={{
                    backgroundImage: `url("images/bg_1.jpg")`,
                }}
                data-stellar-background-ratio="0.5"
            >
                <div className="overlay"></div>
                <div className="container">
                    <div className="row no-gutters slider-text align-items-end justify-content-start">
                        <div className="col-md-12  text-center mb-5">
                            <p className="breadcrumbs mb-0">
                                <span className="mr-3">
                                    <a href="index.html">
                                        Home{" "}
                                        <i className="ion-ios-arrow-forward"></i>
                                    </a>
                                </span>{" "}
                                <span>Detail</span>
                            </p>
                            <h1 className="mb-3 bread">Detail Job</h1>
                        </div>
                    </div>
                </div>
            </div>

            <section className="site-section">
                <div className="container">
                    <div className="row align-items-center mb-5">
                        <div className="col-lg-8 mb-4 mb-lg-0">
                            <div className="d-flex align-items-center">
                                <div className="border p-2 d-inline-block mr-3 rounded">
                                    <img
                                        src={ownerData.avatar}
                                        width="150"
                                        height="150"
                                        alt="Image"
                                    />
                                </div>
                                <div>
                                    <h2>{postData.title}</h2>
                                    <div>
                                        <span className="ml-0 mr-2 mb-2">
                                            <span className="icon-briefcase mr-2"></span>
                                            {`${ownerData.firstName} ${ownerData.lastName}`}
                                        </span>
                                        <span className="m-2">
                                            <span className="icon-room mr-2"></span>
                                            {postData.location}
                                        </span>
                                        <span className="m-2">
                                            <span className="icon-clock-o mr-2"></span>
                                            <span className="text-primary">
                                                {postData.jobType}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="row">
                                <div className="col-6" hidden={isPreviewMode}>
                                    <a
                                        href="#"
                                        className="btn btn-block btn-light btn-md"
                                    >
                                        <span className="icon-heart-o mr-2 text-danger"></span>
                                        Save Job
                                    </a>
                                </div>
                                <div className="col-6">
                                    <a
                                        onClick={async () => {
                                            try {
                                                if (isPreviewMode) {
                                                    window.location.assign(
                                                        updateJobUrl
                                                    );
                                                } else {
                                                    const data = await applyJob(
                                                        params.id,
                                                        ""
                                                    );
                                                }
                                            } catch (err) {
                                                console.error(err);
                                            }
                                        }}
                                        className="btn btn-block btn-primary btn-md"
                                    >
                                        {isPreviewMode
                                            ? "Update job"
                                            : "Apply now"}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="mb-5">
                                <figure className="mb-5">
                                    <img
                                        src={postData.image}
                                        alt="Image"
                                        className="img-fluid rounded"
                                    />
                                </figure>
                                <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                                    <span className="icon-align-left mr-3"></span>
                                    Job Description
                                </h3>
                                <Markup content={postData.description} />
                            </div>
                            <div className="mb-5">
                                <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                                    <span className="icon-rocket mr-3"></span>
                                    Responsibilities
                                </h3>
                                <Markup content={postData.responsibilities} />
                            </div>

                            <div className="mb-5">
                                <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                                    <span className="icon-book mr-3"></span>
                                    Education + Experience
                                </h3>
                                <Markup content={postData.experience} />
                            </div>

                            <div className="mb-5">
                                <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                                    <span className="icon-turned_in mr-3"></span>
                                    Other Benefits
                                </h3>
                                <Markup content={postData.benefits} />
                            </div>

                            <div className="row mb-5">
                                <div className="col-6">
                                    <a
                                        href="#"
                                        className="btn btn-block btn-light btn-md"
                                    >
                                        <span className="icon-heart-o mr-2 text-danger"></span>
                                        Save Job
                                    </a>
                                </div>
                                <div className="col-6">
                                    <a
                                        onClick={async () => {
                                            try {
                                                const data = await applyJob(
                                                    params.id,
                                                    ""
                                                );

                                                console.log(data);
                                            } catch (err) {
                                                console.error(err);
                                            }
                                        }}
                                        className="btn btn-block btn-primary btn-md"
                                    >
                                        Apply Now
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <QRCode
                                id="qrcode"
                                value={jobUrl}
                                size={290}
                                level={"H"}
                                includeMargin={true}
                            />
                            <div className="bg-light p-3 border rounded mb-4">
                                <h3 className="text-primary  mt-3 h5 pl-3 mb-3 ">
                                    Job Summary
                                </h3>
                                <ul className="list-unstyled pl-3 mb-0">
                                    <li className="mb-2">
                                        <strong className="text-black">
                                            Published on:
                                        </strong>{" "}
                                        {postData.createdAt}
                                    </li>
                                    <li className="mb-2">
                                        <strong className="text-black">
                                            Vacancy:
                                        </strong>{" "}
                                        20
                                    </li>
                                    <li className="mb-2">
                                        <strong className="text-black">
                                            Employment Positions:
                                        </strong>{" "}
                                        {_.head(_.get(postData, "positions"))}
                                    </li>
                                    <li className="mb-2">
                                        <strong className="text-black">
                                            Experience:
                                        </strong>{" "}
                                        2 to 3 year(s)
                                    </li>
                                    <li className="mb-2">
                                        <strong className="text-black">
                                            Job Location:
                                        </strong>{" "}
                                        {postData.location}
                                    </li>
                                    <li className="mb-2">
                                        <strong className="text-black">
                                            Salary:
                                        </strong>{" "}
                                        {postData.salaryType ===
                                        SalaryType.RANGE
                                            ? `$${postData.minSalary} - $${postData.maxSalary}`
                                            : SalaryType.DEALING}
                                    </li>
                                    <li className="mb-2">
                                        <strong className="text-black">
                                            Gender:
                                        </strong>{" "}
                                        Any
                                    </li>
                                    <li className="mb-2">
                                        <strong className="text-black">
                                            Application Deadline:
                                        </strong>{" "}
                                        {postData.expiredDate}
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-light p-3 border rounded">
                                <h3 className="text-primary  mt-3 h5 pl-3 mb-3 ">
                                    Share
                                </h3>
                                <div className="px-3">
                                    <a
                                        href={`https://www.facebook.com/sharer/sharer.php?u=${jobUrl}`}
                                        className="pt-3 pb-3 pr-3 pl-0"
                                    >
                                        <span className="icon-facebook"></span>
                                    </a>
                                    <a
                                        href={`http://www.twitter.com/share?url=${jobUrl}`}
                                        className="pt-3 pb-3 pr-3 pl-0"
                                    >
                                        <span className="icon-twitter"></span>
                                    </a>
                                    <a
                                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${jobUrl}`}
                                        className="pt-3 pb-3 pr-3 pl-0"
                                    >
                                        <span className="icon-linkedin"></span>
                                    </a>
                                    <a
                                        href={`http://pinterest.com/pin/create/button/?url=${jobUrl}`}
                                        className="pt-3 pb-3 pr-3 pl-0"
                                    >
                                        <span className="icon-pinterest"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <PostList jobList={recommendPosts} />
        </div>
    );
};

export default DetailJobPage;
