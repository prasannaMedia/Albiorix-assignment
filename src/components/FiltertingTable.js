import React from 'react'
import { useTable, useFilters, useGlobalFilter, useSortBy } from 'react-table'
import './table.css'
import { GlobalFilter } from './GlobalFilter'
import { AddUser } from './AddUser'
import { Col, Row } from 'react-bootstrap'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'



export const FilteringTable = ({ columns, data ,setLoadingData,...rest}) => {

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
            initialState: {
                sortBy: [
                    {
                        id: 'Number',
                        desc: true
                    }, {
                        id: 'Name',
                        desc: true
                    },
                    {
                        id: 'Email',
                        desc: true
                    },
                    {
                        id: 'DOB',
                        desc: true
                    },
                    {
                        id: 'Action',
                        desc: true
                    }

                ]
            }

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
                    <AddUser setLoadingData={setLoadingData} />
                </Col>
            </Row>
            <MaUTable {...getTableProps()}>
                <TableHead>
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
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <TableRow {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
                <tfoot>
                    {footerGroups.map(footerGroup => (
                        <TableRow {...footerGroup.getFooterGroupProps()}>
                            {footerGroup.headers.map(column => (
                                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                            ))}
                        </TableRow>
                    ))}
                </tfoot>
            </MaUTable>
        </>
    )
}
