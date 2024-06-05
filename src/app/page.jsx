"use client";
import React from 'react';
import { Container, Typography, Button, Box,Grid,Card,CardActions,CardContent, CardMedia,  } from '@mui/material';



const logoContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 3,
  marginTop:7,
};
const logoCircleStyle = {
 
 
  marginTop:5,
  width: 45,
  height: 45,
  borderRadius: '50%',
  backgroundColor: 'purple',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  marginRight:0.5,
};


const logoTextStyle = {

  marginTop:5,
  fontWeight: 'bold',
  fontSize: '1.5rem',
  Color: 'black',
};
const lineStyle={
width:"100%",
height:"2px",
marginTop:6,
backgroundColor :" black"
}

const textStyle ={
 display:'flex',
 justifyContent:'center',
 alignItems:'center',
 marginTop:6,
 fontWeight:"bolder"
}



const cards = [
  {
    image: 'https://via.placeholder.com/140',
    title: 'Samsung S21Ultra',
    description: 'This is a description for card 1.'
  },
  {
    image: 'https://via.placeholder.com/140',
    title: 'Realme 11X',
    description: 'This is a description for card 2.'
  },
  {
    image: 'https://via.placeholder.com/140',
    title: 'Motrola 50Edge Fusion',
    description: 'This is a description for card 3.'
  },
  {
    image: 'https://via.placeholder.com/140',
    title: 'Samsung S21Ultra',
    description: 'This is a description for card 1.'
  },
  {
    image: 'https://via.placeholder.com/140',
    title: 'Realme 11X',
    description: 'This is a description for card 2.'
  },
  {
    image: 'https://via.placeholder.com/140',
    title: 'Motrola 50Edge Fusion',
    description: 'This is a description for card 3.'
  },
  {
    image: 'https://via.placeholder.com/140',
    title: 'Samsung S21Ultra',
    description: 'This is a description for card 1.'
  },
  {
    image: 'https://via.placeholder.com/140',
    title: 'Realme 11X',
    description: 'This is a description for card 2.'
  },
  {
    image: 'https://via.placeholder.com/140',
    title: 'Motrola 50Edge Fusion',
    description: 'This is a description for card 3.'
  }
];



const Home = () => {

  const CardComponent = ({ image, title, description }) => {
    return (
      <Card sx={{ maxWidth: 345, margin: 2 }}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">ADD</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  };






  return (
    <>
    <Container maxWidth="md" sx={{}}>
      <Box sx={logoContainerStyle}>
        <Box sx={logoCircleStyle}>
          <Typography variant="h5">PP</Typography>
        </Box>
        <Typography sx={logoTextStyle}>PixelPurchase</Typography>
      </Box>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
      Welcome to PixelPurchase!
At PixelPurchase, we believe in the power of simplicity and convenience.
 Founded in 2024, our mission has always been to bring high-quality products directly to your doorstep with just a few clicks.
  We are passionate about making your shopping experience enjoyable, seamless, and rewarding.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, marginBottom: 2 }}>
        <Button variant="contained" color="primary">
          Get Started
        </Button>
      </Box>
      

    </Container>
    
     
    <Box sx={lineStyle}>

       
     </Box>

     <Box sx={textStyle}>

    <Typography variant="h5" align="center" color="black">   
      Explore a variety of Products that suit your choice ! 
      </Typography> 
     </Box>
      


     <Container sx={{ py: 5 }}>
      <Grid container spacing={4}>
        {cards.map((card, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <CardComponent 
              image={card.image} 
              title={card.title} 
              description={card.description} 
            />
          </Grid>
        ))}
      </Grid>
    </Container>
     
    </>
  );
};

export default Home;