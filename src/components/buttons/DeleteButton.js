import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';

export default function DeleteButton(props)
{
    const [state, setState] = React.useState({open: false});

    const handleClickOpen = () => {
        setState({open: true});
    };

    const handleClose = () => {
        setState({open: false});
    };

    const handleConfirm = () => {
        props.onConfirm();
        setState({open: false});
    };

    const title = props.title === undefined ? "Удаление пользователя" : props.title;
    const content = props.content === undefined ? "Вы уверены, что хотите удалить этого пользователя?" : props.content;
    const confirmButtonText = props.confirmButtonText === undefined ? "Удалить" : props.confirmButtonText;
    const cancelButtonText = props.cancelButtonText === undefined ? "Отмена" : props.cancelButtonText;

    return (
        <>
            <Button
                variant="outlined"
                color="secondary"
                onClick={handleClickOpen}
                startIcon={<DeleteIcon />}
            >
                
            </Button>
            <Dialog
                open={state.open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        {cancelButtonText}
                    </Button>
                    <Button onClick={handleConfirm} color="secondary">
                        {confirmButtonText}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}