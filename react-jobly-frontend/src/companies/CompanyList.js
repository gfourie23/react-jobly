import React, {useState, useEffect} from "react";
import JoblyApi from '../api.js';
import CompanyCard from "./CompanyCard.js";
import SearchForm from "../common/SearchForm.js";
import LoadingSpinner from "../common/LoadingSpinner.js";

/* Load a page with the list of companies from API. */
function CompanyList() {
    console.debug("CompanyList");
    const [companies, setCompanies] = useState(null);

    useEffect(function getCompaniesOnMount() {
        search();
    }, []);

    /* Reload companies with search form submit. */
    async function search(name) {
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies);
    }

     if (!companies) return <LoadingSpinner />;

    return (
        <div className="CompanyList col-md-8 offset-md-2">
            <SearchForm searchFor={search} />
            {companies.length
            ? (
                <div className="CompanyList-list">
                    {companies.map(c => (
                        <CompanyCard
                        key={c.handle}
                        handle={c.handle}
                        name={c.name}
                        description={c.description}
                        logoUrl={c.logoUrl}
                        />
                    ))}
        </div>
    ) : (
        <p className="lead">Sorry, no results were found!</p>
    )}
    </div>
    )
}

export default CompanyList;