import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Paper,
    Grid,
    Button,
    LinearProgress,
    Snackbar,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Icon,
    Divider,
} from '@material-ui/core';
import { 
    createStyles, 
    makeStyles, 
} from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { uploadFile } from '../../store/actions/fileActions';
import { Redirect, Link } from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem'
    },
    paper: {
        padding: '0.5rem',
        fontFamily: 'roboto'
    },
    uploadSection: {
        padding: '0.5rem',
        margin: '0.5rem auto',
        boxShadow: theme.shadows[2],
        textAlign: 'center'
    },
    listItem: {
        boxShadow: theme.shadows[2]
    },
    fileInput: {
        display: 'block',
        width: '60%',
        borderRadius: '4rem',
        backgroundColor: '#eee',
        padding: '1em',
        margin: '1rem auto'
    },
    btn: {
        margin: '1rem auto'
    },
    alert: {
        width: '50%',
        margin: '1rem auto',
        justifyContent: 'center'
    },
    detailsContainer: {
        textAlign: 'center',
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),

    },
    publish: {
        backgroundColor: '#1976d2'
    },
    inserted: {
        backgroundColor: '#4caf50'
    },
    duplicates :{
        backgroundColor: '#ff8f00'
    },
    invalid: {
        backgroundColor: '#ff3d00'
    },
    filename: {
        backgroundColor: '#607d8b'
    },
    user: {
        backgroundColor: '#00bcd4'
    },
    link: {
        width: '100%',
        height: '100%'
    }
  }),
);

const Dashboard = ({ auth, isAuthenticated, progress, uploadFile, error, uploadDetails }) => {

    const classes = useStyles();
    const [file, setFile] = useState();
    const [open, setOpen] = useState(true);

    const changeFileHandler = (e) => {
        setFile(e.target.files[0])
    };

    const handleFileUpload = () => {
        uploadFile(file);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return(
        <Container className={classes.container} maxWidth="md">
            <Grid container justify="center">
                <Grid className={classes.uploadSection} item xs={12}>
                    <Button href="/stats" variant="outlined">Check Stats</Button>
                    { ' ' }
                    <Button href="/files" variant="outlined">See Files</Button>
                    <input className={classes.fileInput} type="file" name="file" onChange={changeFileHandler}/>
                    {(error.id !== 'FILE_UPLOAD_FAILED') && progress?
                    <Alert className={classes.alert} variant="outlined" severity="info">Uploading {progress}% <LinearProgress variant="determinate" value={progress} /></Alert>
                    :(error.id==='FILE_UPLOAD_FAILED'?<Alert className={classes.alert} variant="outlined" severity="error">Uploading Failed</Alert>:null)
                    }
                    <Button className={classes.btn} variant="contained" color="primary" onClick={handleFileUpload}>Upload</Button>
                    <Snackbar open={uploadDetails.success && open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} variant="filled" severity="success">
                            File Upload Successful
                        </Alert>
                    </Snackbar>
                </Grid>
                {uploadDetails && uploadDetails.success?
                    <Grid item xs={12}>
                        <Paper elevation={3} className={classes.detailsContainer}>
                            <Typography align="center" variant="button">
                                Uploaded File Details
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.filename}>
                                            <Icon>topic</Icon>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={uploadDetails.saveFile.originalName}
                                        secondary="File Name"
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.user}>
                                            <Icon>person</Icon>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={uploadDetails.saveFile.user.username}
                                        secondary="Uploader"
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.publish}>
                                            <Icon>publish</Icon>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={uploadDetails.rowsCount}
                                        secondary="Total"
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.inserted}>
                                            <Icon>check_circle</Icon>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={uploadDetails.inserted}
                                        secondary="Inserted"
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.duplicates}>
                                            <Icon>warning</Icon>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={uploadDetails.duplicates}
                                        secondary="Duplicates"
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.invalid}>
                                            <Icon>error</Icon>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={uploadDetails.invalid}
                                        secondary="Invalid"
                                    />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                :null}
            </Grid>
        </Container>
    );
};

const mapStateToProps = (state) => {
    console.log(state)
    return ({
        auth: state.auth,
        isAuthenticated: state.auth.isAuthenticated,
        progress: state.files.uploadProgress,
        error: state.error,
        uploadDetails: state.files.uploadDetails
      })
};

export default connect(mapStateToProps, {uploadFile})(Dashboard);
