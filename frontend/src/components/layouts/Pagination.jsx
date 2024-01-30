import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from '../../assets/icons';

const Pagination = ({ pageCount, page }) => {
    const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
    const { search, pathname } = useLocation();
    const navigate = useNavigate();

    const handlePageChange = (pageNumber) => {
        const searchParams = new URLSearchParams(search);
        searchParams.set('page', pageNumber);
        navigate(`${pathname}?${searchParams.toString()}`);
    };

    if (pageCount < 2) return null;

    return (
        <div className="join my-10">
            <div className="join-container">
                {pages.map((pageNumber) => (
                    <input
                        key={pageNumber}
                        className={`join-item btn btn-square ${pageNumber === page ? 'active' : ''}`}
                        type="radio"
                        name="options"
                        aria-label={pageNumber}
                        checked={pageNumber === page}
                        onChange={() => handlePageChange(pageNumber)}

                    />
                ))}
            </div>
        </div>
    );
};

export default Pagination;
