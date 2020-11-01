import React from 'react';
import { Route } from "react-router-dom";
import {
    Container,
    Paper,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const GuardedRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth === true
            ? <Component {...props} />
            : <>
                <Container maxWidth="sm">
                    <Paper>
                        <Alert variant="outlined" severity="error">Please Login to Continue</Alert>
                    </Paper>
                 </Container>
            </>
    )} />
)

export default GuardedRoute;
