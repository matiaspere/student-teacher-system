import React from "react";

const Pagination = ({ setPaginate, paginate, setPage, page, usersData }) => {
    const pages = [10, 25, 50, 100];

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };
    const nextPage = () => {
        if (page < usersData?.users?.last_page || page < usersData?.last_page) {
            setPage(page + 1);
        }
        console.log(usersData?.users?.last_page);
    };

    return (
        <div>
            <nav aria-label="">
                <ul className="pagination pagination-sm">
                    <li
                        className={
                            page === 1 ? "page-item disabled" : "page-item"
                        }
                        onClick={prevPage}
                    >
                        <a className="page-link" href="#">
                            Previous
                        </a>
                    </li>
                    {pages.map((page) => (
                        <li
                            key={page}
                            className={
                                page === paginate
                                    ? "page-item active"
                                    : "page-item"
                            }
                            onClick={() => {
                                setPaginate(page);
                                setPage(1);
                            }}
                        >
                            <a className="page-link" href="#">
                                {page}
                            </a>
                        </li>
                    ))}
                    <li
                        className={
                            page === usersData?.users?.last_page ||
                            page === usersData?.last_page
                                ? "page-item disabled"
                                : "page-item"
                        }
                        onClick={nextPage}
                    >
                        <a className="page-link" href="#">
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
            <nav aria-label="Page navigation example">
                <ul className="pagination"></ul>
            </nav>
        </div>
    );
};

export default Pagination;
