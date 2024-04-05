import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api";
import JobCardList from "./JobCardList";
import LoadingSpinner from "../common/LoadingSpinner";

/**
 * Show a page with a list of jobs.
 * Loads jobs from API
 * Re-loads filtered jobs with a serach form
 * 
 * JobList -> JobCardList -> JobCard
 * 
 */

function JobList() {
    console.debug("Joblist");

    const [jobs, setJobs] = useState(null);

    useEffect(function getAllJobsOnMount() {
        console.debug("JobList useEffect getAllJobsOnMount");
        search();
    }, []);

    //Search form submit reloads jobs.
    async function search(title) {
        let jobs = await JoblyApi.getJobs(title);
        setJobs(jobs);
    }

    if (!jobs) return <LoadingSpinner />;
    return (
        <div className="JobList col-md-8 offset-md-2">
            <SearchForm searchFor={search} />
            {jobs.length
            ? <JobCardList jobs={jobs} />
            : <p className="lead">Sorry, no results were found!</p>
        }
        </div>
    );
}

export default JobList;