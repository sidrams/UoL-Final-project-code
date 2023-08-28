
import React, { useState } from "react";
import { Paginator } from 'primereact/paginator';
import ReactPaginate from 'react-paginate';

export default function PaginatorComponent({query, current_page, total_results, rows_on_page, fetchData, total_pages}) {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [page,setPage] = useState(0)

    const onPageChange = (event) => {
        console.log(event.selected)
        // setPage(event.page);
        // // setRows(event.rows);
        // // console.log('on page ' + page + ' with total results '+ total_results + ' and rows on this page are '+rows_on_page)
        // console.log(event.page)
        fetchData(query, event.selected + 1)
        // page = event.page

        
        // const newOffset = (event.selected * itemsPerPage) % items.length;
        // console.log(
        // `User requested page number ${event.selected}, which is offset ${newOffset}`
        // );
        // setItemOffset(newOffset);
    };


    return (
        <div className="card">
            {/* <Paginator first={page}  rows={10} totalRecords={total_results}  onPageChange={onPageChange} /> */}
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={onPageChange}
                pageRangeDisplayed={5}
                pageCount={total_pages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </div>
    );
}
        