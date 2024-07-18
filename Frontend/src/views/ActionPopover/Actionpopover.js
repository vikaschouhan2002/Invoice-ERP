import { useState } from 'react';
import { Divider, Typography, Button, Popover } from '@mui/material';
import { AiOutlineEye, AiTwotoneEdit, AiOutlineDelete, AiOutlineFilePdf, AiOutlineCreditCard } from 'react-icons/ai';

const ActionsPopover = (props) => {
  const { c_role, row, handleSetMode, setRowData, deleteData, handleOpenAdd, show, update, download, payment } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? `actions-popover-${row._id}` : undefined;

  return (
    <>
      <Button aria-describedby={id} onClick={handleClick} variant="text" color="info">
        ...
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        {c_role === 'offer' ? (
          <>
            <Typography
              id="show"
              onClick={() => {
                handleClose();
                show(row._id);
              }}
              sx={{ p: 1, cursor: 'pointer' }}
            >
              <AiOutlineEye /> Show
            </Typography>
            <Typography
              id="edit"
              onClick={() => {
                handleClose();
                update(row._id);
              }}
              sx={{ p: 1, cursor: 'pointer' }}
            >
              <AiTwotoneEdit /> Edit
            </Typography>
            <Typography
              id="download"
              onClick={() => {
                handleClose();
                download(row._id);
              }}
              sx={{ p: 1, cursor: 'pointer' }}
            >
              <AiOutlineFilePdf /> Download
            </Typography>
            <Typography
              id="payment"
              onClick={() => {
                handleClose();
                payment(row._id);
              }}
              sx={{ p: 1, cursor: 'pointer' }}
            >
              <AiOutlineCreditCard /> Record Payment
            </Typography>
            <Divider orientation="horizontal" />
            <Typography
              id="delete"
              onClick={(e) => {
                setRowData(row);
                deleteData(e);
              }}
              sx={{ p: 1, cursor: 'pointer' }}
            >
              <AiOutlineDelete /> Delete
            </Typography>
          </>
        ) : (
          <>
            <Typography
              onClick={() => {
                handleClose();
                handleOpenAdd();
                handleSetMode('show');
                setRowData(row);
              }}
              sx={{ p: 1, cursor: 'pointer' }}
            >
              <AiOutlineEye /> Show
            </Typography>
            <Divider />
            <Typography
              onClick={() => {
                handleClose();
                handleOpenAdd();
                handleSetMode('edit');
                setRowData(row);
              }}
              sx={{ p: 1, cursor: 'pointer' }}
            >
              <AiTwotoneEdit /> Edit
            </Typography>
            <Divider />
            <Typography
              onClick={(e) => {
                setRowData(row);
                deleteData(e);
              }}
              sx={{ p: 1, cursor: 'pointer' }}
            >
              <AiOutlineDelete /> Delete
            </Typography>
          </>
        )}
      </Popover>
    </>
  );
};

export default ActionsPopover;
