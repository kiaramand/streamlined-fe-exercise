import React from "react";
import {
  Button,
  Dialog,
  DialogTitle
} from "@mui/material";
import successIcon from '../Icons/streamlinehq-check-circle-1-interface-essential-48.SVG';
import closeIcon from '../Icons/streamlinehq-close-interface-essential-48.SVG';


const MessageDialog = ({open, closeDialog, ...other}) => {
  return (
    <Dialog
      open={open}
      onClose={closeDialog}
    >
      <DialogTitle className='dialog-title' >
        <Button className='close-button' onClick={closeDialog} >
          <img src={closeIcon} className='close-icon' />
        </Button>
      </DialogTitle>
      <div className='message-dialog flex-column'>
        <img src={successIcon} className='icon-large' />
        <h3>Draft saved!</h3>
      </div>
    </Dialog>
  )
}

export default MessageDialog;
