import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@material-ui/core';
import {
    createStyles,
    makeStyles,
} from '@material-ui/core/styles';
import { getInvalidInvoices } from '../../store/actions/invoiceActions';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            padding: '2rem',
            width: '100%',
        },
        container: {            
            maxHeight: 440,
        },
    }),
);

const columns = [
    { id: 'reason', label: 'Reason', minWidth: 50 },
    { id: 'invoiceNumber', label: 'Invoice Numbers', minWidth: 50 },
    { id: 'documentNumber', label: 'Document Number', minWidth: 50 },
    {
        id: 'type',
        label: 'Type',
        minWidth: 50,
        align: 'right',
    },
    {
        id: 'netDueDt',
        label: 'Net due dt',
        minWidth: 130,
        align: 'right',
        format: (value) => new Date(value).toDateString(),
    },
    {
        id: 'docDate',
        label: 'Doc. Date',
        minWidth: 130,
        align: 'right',
        format: (value) => new Date(value).toDateString(),
    },
    {
        id: 'pstngDate',
        label: 'Pstng Date',
        minWidth: 130,
        align: 'right',
        format: (value) => new Date(value).toDateString(),
    },
    {
        id: 'amtInLocCur',
        label: 'Amt in loc.cur.',
        minWidth: 100,
        align: 'left',
    },
    {
        id: 'vendorCode',
        label: 'Vendor Code',
        minWidth: 100,
        align: 'left',
    },
    {
        id: 'vendorName',
        label: 'Vendor Name',
        minWidth: 100,
        align: 'left',
    },
    {
        id: 'vendorType',
        label: 'Vendor type',
        minWidth: 100,
        align: 'left',
    },
];

const InvalidInvoiceList = ({ invoices, getInvalidInvoices }) => {
    const classes = useStyles();

    useEffect(() => {
        getInvalidInvoices();
    }, [])

    return (  
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoices && invoices.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && new Date(value) instanceof Date ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
    );
};

const mapStateToProps = (state) => {
    return ({
        invoices: state.invoice.invalid.invoices,
    })
};

export default connect(mapStateToProps, { getInvalidInvoices })(InvalidInvoiceList);
