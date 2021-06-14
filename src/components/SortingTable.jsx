import React, { useMemo, useEffect, useState } from 'react'
import axios from 'axios';
import { useTable, useSortBy } from 'react-table'
import { COLUMNS } from './columns'
import './table.css'

export const SortingTable = (props) => {
    const [items, setItems] = useState([]);
    const [searchedText, setSearchedText] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                let response = await axios.get("https://swapi.dev/api/people/");

                // data = await axios.get("https://swapi.dev/api/people/")
                console.log(response);
                setItems(response.data.results);
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchData();

    }, [])


    const columns = useMemo(() => COLUMNS, [])
    const data = items

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow
    } = useTable(
        {
            columns,
            data
        },
        useSortBy
    )

    return (
        <>
            <input type="text"
                className="form-control"
                placeholder="search item here"
                id="txtSearchBox"
                value={searchedText}
                onChange={e => setSearchedText(e.target.value)}>
            </input><br />
            <table {...getTableProps()}>
                <thead>

                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        console.log(row);
                        if (searchedText !== "") {
                            if (row.original.name.toLowerCase().indexOf(searchedText) === -1) {
                                return null;
                            }
                            else {
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })}
                                    </tr>
                                )
                            }
                        }
                        else {
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        }


                    })}
                </tbody>
                <tfoot>
                    {footerGroups.map(footerGroup => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {footerGroup.headers.map(column => (
                                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
        </>
    )
}