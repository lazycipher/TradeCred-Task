import React from 'react';
import {
    Container,
    Button,
    Paper
} from '@material-ui/core';
import {
    createStyles,
    makeStyles,
} from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import InvalidInvoiceList from './InvalidInvoiceList';
import InvoiceList from './InvoiceList';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            padding: '2rem',
            width: '100%',
        },
        container: {
            marginTop: theme.spacing(3)
        }
    }),
);

const Invoice= () => {
    const classes = useStyles();
    return (
        <Container className={classes.root} maxWidth="md">
            <Button component={RouterLink} to='/' color="primary" variant="outlined">Dashboard</Button>
            <Paper className={classes.container}>
                <Alert variant="filled" severity="success">Valid Invoices</Alert>
                <InvoiceList/>
            </Paper>
            <Paper className={classes.container}>
                <Alert variant="filled" severity="error">Invalid Invoices</Alert>
                <InvalidInvoiceList />
            </Paper>
        </Container>
    );
};

export default Invoice;
