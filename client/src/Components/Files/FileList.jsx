import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import {
  Container,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Icon,
  Divider,
  Button
} from '@material-ui/core';
import { 
  createStyles, 
  makeStyles, 
} from '@material-ui/core/styles';
import { getFiles } from '../../store/actions/fileActions';
import formatRelative from 'date-fns/formatRelative'
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
        padding: theme.spacing(2),
        fontFamily: 'roboto',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    listItem: {
        boxShadow: theme.shadows[2]
    },
    btn: {
        margin: '1rem auto'
    },
    alert: {
        width: '50%',
        margin: '1rem auto',
        justifyContent: 'center'
    },
    file: {
        backgroundColor: '#3f51b5'
    }
  }),
);

 function FileList({files, getFiles}) {

    useEffect(()=> {
        getFiles();
    }, [getFiles])


    const classes = useStyles();

    return (
        <Container maxWidth="md">
            <Button component={RouterLink} to='/' color="primary" variant="outlined">Dashboard</Button>
            <Paper className={classes.paper} elevation={3}>
            {files && files.map(file=>(
                <Grid key={file._id} item xs={12}>
                    <List component="nav" aria-label="secondary mailbox folders">
                        <ListItem >
                            <ListItemAvatar><Avatar className={classes.file}><Icon>topic</Icon></Avatar></ListItemAvatar>
                            <ListItemText primary={file.originalName} secondary={"-by " + file.user.username + " | " + formatRelative(new Date(file.uploadDate), Date.now())}/>
                            <IconButton>
                                <Icon>cloud_download</Icon>
                            </IconButton>
                            <IconButton>
                                <Icon>open_in_new</Icon>
                            </IconButton>
                        </ListItem>
                        <Divider />
                    </List>
                </Grid>
            ))}
            </Paper>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return ({
        auth: state.auth,
        files: state.files.files
      })
};

export default connect(mapStateToProps, {getFiles})(FileList);

