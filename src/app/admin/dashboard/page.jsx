"use client";

import * as React from "react";
import {
  Box,
  Button,
  Container,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AdminDashboard = () => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDesciption] = React.useState("");
  const [prize, setPrize] = React.useState("");
  const [image, setImage] = React.useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImage = () => {};

  async function handleSubmit() {
    const res = await fetch("/api/Product", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        title,
        author,
        description,
        prize,
        image,
      }),
    });

    const data = res.json();

    if (data.message === "") {
      toast.success("");
    } else {
      toast.error(data.message);
    }
  }
  const TextStyle ={
   width:"50%",
   margin: "auto",
  }
  const ButStyle ={
   display:"block",



  }

  return (
    <Container sx={TextStyle}>
      <Typography variant="h3" sx={ButStyle}> Admin Dashboard</Typography>

      <Button variant="contained" color="primary"  onClick={handleOpen}>
        Add Product
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} onSubmit={handleSubmit}>
        <Typography variant="h5" textAlign={"center"}>
          Add Product
        </Typography>


          <TextField
            margin="normal"
            id="filled-basic"
            label="Title"
            variant="filled"
            fullWidth
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <TextField
            margin="normal"
            id="filled-basic"
            label="Description"
            variant="filled"
            fullWidth
            value={description}
            onChange={(e) => {
              setDesciption(e.target.value);
            }}
          />

        
          <TextField
            margin="normal"
            id="filled-basic"
            label="Price"
            variant="filled"
            fullWidth
            type="number"
            value={prize}
            onChange={(e) => {
              setPrize(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            id="filled-basic"
            variant="filled"
            fullWidth
            type="file"
            onChange={handleImage}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Add Product
          </Button>
        </Box>
      </Modal>


    </Container>
  );
};

export default AdminDashboard;