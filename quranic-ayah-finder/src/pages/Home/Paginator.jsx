
import React, { useState } from "react";
import { Paginator } from 'primereact/paginator';
import ReactPaginate from 'react-paginate';
import { MdOutlineArrowBackIos, MdArrowForwardIos } from "react-icons/md";

export default function PaginatorComponent({query, fetchData, total_pages}) {
    const onPageChange = (event) => {
        console.log(event.selected)
        fetchData(query, event.selected + 1)
    };


    return (
        <div className="card mt-8">
            <ReactPaginate
                breakLabel="..."
                onPageChange={onPageChange}
                pageRangeDisplayed={5}
                pageCount={total_pages}
                renderOnZeroPageCount={null}
                activeClassName={'item active-page '}
                breakClassName={'item break-me '}
                containerClassName={'pagination'}
                disabledClassName={'disabled-page'}
                marginPagesDisplayed={2}
                nextClassName={"item next "}
                nextLabel={<MdArrowForwardIos style={{ fontSize: 18, width: 150 }} />}
                pageClassName={'item pagination-page '}
                previousClassName={"item previous"}
                previousLabel={<MdOutlineArrowBackIos style={{ fontSize: 18, width: 150 }}/>}
            />
            
        </div>
    );
}
        