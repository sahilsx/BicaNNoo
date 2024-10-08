"use client";
import * as React from "react";
import { useSearchParams } from 'next/navigation'; // Correct hook import for Next.js 13+
import { useEffect, useState } from 'react';
import { Container,
  TextField,
  Typography,
  Button,
  Box,
  Modal,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions,  } from '@mui/material';
  import { styled } from '@mui/material/styles';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';



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


  
  const ProductCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }));
  
  const ProductImage = styled(CardMedia)({
    height: 400,
    width: '100%',
    objectFit: 'cover',
  });





const Store = () => {
 // Get search query from URL
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [Buy, setBuy] = React.useState([]);
  const [Name, setName] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [Price, setPrice] = React.useState("");
  const [Address, setAddress] = React.useState("");
  const [Mobile, setMobile] = React.useState("");
  const [Product, setProduct] = React.useState("");
  const [Userid, setUserid] = React.useState("");
  







  const handleBuy = async (product) => {
    const user= await sessionStorage.getItem("user");
    if(!user){
      router.push("/user/login")
  
      }
    setBuy(product)
    setOpens(false)
    setOpen(true);
    setProduct(product.title);
    setPrice(product.prize);
  };


  const handleShipSubmit = async (e) => {
    const user= await sessionStorage.getItem("user");
   await setUserid(user)
  
    
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/order/ship', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Userid,Name, Email, Mobile, Address, Product, Price }),
      });
      const result = await response.json(); 
      if (result.message === "Order Confirmed Successfully!") {
        toast("Order Confirmed Successfully!");
        setName("");
        setEmail("");
        setAddress("");
        setMobile("");
        setOpen(false);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error confirming order.");
    } finally {
      setLoading(false);
    }
  };




  const handleOpens = (product) => {
    setSelectedProduct(product)
    setOpens(true);
  };

  const handleCloses = () => {
    setOpens(false);
    
  };



  
 const handleClose = ()=>{
  setOpen(false);
  
  
  
  
  
  
  
  
   }
  
  
  
  
  const [opens, setOpens] = React.useState(false); 
  const [open, setOpen] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState([]);



  

  const [data, setData] = React.useState([]);

  const getRows = async () => {
    try {
      const res = await fetch("/api/products/getal", {
        method: "GET",
      });
      const data = await res.json();
      const product = data.products;
      console.log("prodii",product)
      setData(product);

      console.log(product);
    } catch (error) {
      console.log(error);
      toast.error("server Error");
    }
  };

  React.useEffect(() => {
    getRows();
  }, []);
  if (!data) return  <Container> <Typography variant="h6" gutterBottom>
  Search Results for "Products below 10000"
</Typography>
<Typography marginTop={20} variant="h6" align="center">"no products found"</Typography>;</Container> 
  return (
    
     <>

<ToastContainer />
      <Container>
      <Typography variant="h6" gutterBottom>
        Search Results for "Products below 10000"
      </Typography>

      <Box my={4}>
        <Typography variant="h6" align="center"></Typography>
        <Grid container spacing={4} style={{ marginTop: 20 }}>
        {data.length > 0 ? (
          data.map((offer) => (
            <Grid item xs={12} sm={6} md={4} key={offer._id}>
              <ProductCard>
                <ProductImage
                  component="img"
                  image={offer.imageUrl}
                  alt={offer.title}
                />
                <CardContent style={{ textAlign: 'center' }}>
                  <Typography variant="h5">{offer.title}</Typography>
                  <Typography variant="h6">${offer.prize}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpens(offer)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </ProductCard>
            </Grid>
          ))): (
            <Typography margintop="3" variant="h6">No products found</Typography>
          )}
        </Grid>
      </Box>



    





    
      <Dialog open={opens} onClose={handleCloses} maxWidth="md" fullWidth>
    <DialogTitle>{selectedProduct.title}</DialogTitle>
    <DialogContent>
      <Box display="flex" flexDirection="row">
        {/* Big Image */}
        <Box flexShrink={0} mr={2}>
          <img src={selectedProduct.imageUrl} alt={selectedProduct.title} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
        </Box>
        {/* Product Details */}
        <Box flexGrow={1}>
          <Typography variant="h6">Price: ${selectedProduct.prize}</Typography>
          <Typography variant="body1">Description: {selectedProduct.description}</Typography>
         
        </Box>
      </Box>
    </DialogContent>
    <DialogActions>
    <Button variant="contained" onClick={() => handleBuy(selectedProduct)} color="primary">
        Proceed To Buy
      </Button>
      <Button variant="contained" onClick={handleCloses} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>



  <Modal
   
   open={open}
   onClose={handleClose}
   aria-labelledby="modal-modal-title"
   aria-describedby="modal-modal-description"
 >
   <Box sx={{
              margin: "30px auto",
              width: { xs: '90%', sm: 500 }, // Responsive width
              borderRadius: 2,
              boxShadow: 10,
              backgroundColor: "white",
              padding: 4, // Added padding inside the modal for better spacing
            }}>
     <Typography variant="h5" textAlign={"center"}>
       Buy Product
     </Typography>
     <form onSubmit={handleShipSubmit}>
       <TextField
         margin="normal"
         id="filled-basic"
         label="Name"
         variant="filled"
         name="Name"
         fullWidth
         value={Name}
         onChange={(e) => {
           setName(e.target.value);}}
    
        
       />
      
      <TextField
         margin="normal"
         id="filled-basic"
         label="Email"
         variant="filled"
         name="Email"
         value={Email}
         fullWidth
         onChange={(e) => {
           setEmail(e.target.value);}}
       />


      <TextField
         margin="normal"
         id="filled-basic"
         label="Address"
         name="Address"
         variant="filled"
         fullWidth
         value={Address}
         onChange={(e) => {
           setAddress(e.target.value);}}
       />




       <TextField
         margin="normal"
         id="filled-basic"
         label="Mobile No."
         name="Mobile"
         type="number"
         variant="filled"
         fullWidth
         value={Mobile}
         onChange={(e) => {
           setMobile(parseInt(e.target.value, 10));;}}
       />
      


      <TextField
         margin="normal"
         id="filled-basic"
         label="Product"
         variant="filled"
         name="Product"
         fullWidth
         value={Product}

       />
      
       <TextField
         margin="normal"
         id="filled-basic"
         label="Product Price"
         name="Price"
         variant="filled"
         fullWidth
         type="number"
         value={Price}
        
       />
      
     

       <Button
         variant="contained"
         color="primary"
         type="submit"
         fullWidth
         sx={{ mt: 3, mb: 2 }}
         disabled={loading}
       >
         Pay for Order
       </Button>

     </form>
   </Box>
 </Modal>





    </Container>
    </>
  );
};

export default Store ;




























