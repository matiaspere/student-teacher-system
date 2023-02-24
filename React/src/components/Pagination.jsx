import React from "react";

const Pagination = ({setPaginate, paginate}) => {
    const pages = [10, 25, 50, 100];

    // const selectedClass = page.value === pages ? "page-item active" : "page-item"

    return (
        <div>
            <nav aria-label="...">
                <ul class="pagination pagination-sm">
                    {pages.map((page) => (
                        <li className={ page === paginate ? "page-item active" : "page-item"} onClick={() => setPaginate(page)}>
                            <a class="page-link" href="#">
                                {page}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
