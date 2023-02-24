import React from "react";

const Pagination = ({ setPaginate, paginate, setPage, page, usersData}) => {
    const pages = [10, 25, 50, 100];


    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };
    const nextPage = () => {
       if (page < usersData.last_page){
           setPage(page + 1)
       }
    };

    return (
        <div>
            <nav aria-label="">
                <ul class="pagination pagination-sm">
                    <li class={page === 1 ? "page-item disabled" : "page-item"} onClick={prevPage}>
                        <a class="page-link" href="#">
                            Previous
                        </a>
                    </li>
                    {pages.map((page) => (
                        <li
                            className={
                                page === paginate
                                    ? "page-item active"
                                    : "page-item"
                            }
                            onClick={() => setPaginate(page)}
                        >
                            <a class="page-link" href="#">
                                {page}
                            </a>
                        </li>
                    ))}
                    <li class={page === usersData.last_page ? "page-item disabled" : "page-item"} onClick={nextPage}>
                        <a class="page-link" href="#">
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
            <nav aria-label="Page navigation example">
                <ul class="pagination"></ul>
            </nav>
        </div>
    );
};

export default Pagination;
