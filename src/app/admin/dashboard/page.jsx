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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "../Table/table";

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
  const [loading , setLoading ] = React.useState(false);



  const [title, setTitle] = React.useState("");
  const [description, setDesciption] = React.useState("");
  const [prize, setPrice] = React.useState();
  const [image, setImage] = React.useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImage = (e) => {
    const file = e.target.files?.[0]; // incoming selected file ....first one
    const reader = new FileReader(); // creating an instance of file reader
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
  };

  async function handleSubmit(e) {
    try {
      setLoading(true)
      e.preventDefault();

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", prize);
      formData.append("image", image);

      const res = await fetch("/api/Products/Product", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
         console.log("data",data)
         
      if (data.message === "Product saved Succesfully") {
        toast.success("Product saved Succesfully");
        setTitle("")
        setDesciption("")
        setPrice("")
        setImage(null)

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some Error , Kindly Try again");
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <>
      <ToastContainer />
      <Container sx={{ marginTop: "50px" }}>
        <Typography variant="h3">Admin Dashboard</Typography>

        
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Product 
        </Button>


        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography variant="h5" textAlign={"center"}>
              Add Product
            </Typography>
            |
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                id="filled-basic"
                label="Product Title"
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
                label="Product  Description"
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
                label="Product  Price"
                variant="filled"
                fullWidth
                type="number"
                value={prize}
                onChange={(e) => {
                  setPrice(parseInt(e.target.value, 10));
                }}
              />
              <TextField
                margin="normal"
                id="filled-basic"
                variant="filled"
                fullWidth
                type="file"
                name="file"
                onChange={handleImage}
              />
              <img src={image} alt="no" width={100} />


              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                Add Product
              </Button>

            </form>
          </Box>
        </Modal>
        


        <DataTable />




      </Container>
      
    </>
  );
};

export default AdminDashboard;