import React, { useMemo } from 'react'
import { useTable, useFilters, useGlobalFilter, useSortBy } from 'react-table'
import './table.css'
import { GlobalFilter } from './GlobalFilter'
import { AddUser } from './AddUser'
import { Col, Row } from 'react-bootstrap'

export const FilteringTable = ({ columns, data }) => {

    // const defaultColumn = React.useMemo(
    //     () => ({
    //         Filter: ColumnFilter
    //     }),
    //     []
    // )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter
    } = useTable(
        {
            columns,
            data,
            // defaultColumn
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        
    )

    const { globalFilter } = state

    return (
        <>
            <Row className='d-flex justify-content-end' >
                <Col sm={10}>
                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                </Col>
                <Col sm={6} lg={2} className="mb-3 mt-2" >
                    <AddUser />
                </Col>
            </Row>
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
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
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
