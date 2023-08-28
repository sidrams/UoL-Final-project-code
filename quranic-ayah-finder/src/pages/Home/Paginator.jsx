
import React, { useState } from "react";
import { Paginator } from 'primereact/paginator';

export default function PaginatorComponent() {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    const onPageChange = (event) => {
        setFirst(event.first);
        // setRows(event.rows);
    };
    

    return (
        <div className="card">
            <Paginator first={first} rows={rows} totalRecords={12}  onPageChange={onPageChange} />
        </div>
    );
}
        