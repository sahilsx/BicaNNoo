"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@mui/material";
import { useRouter } from 'next/navigation';

// export default function SignIn() {
//   const handleSubmit = async (event) => {
//     try {
//       event.preventDefault();
//       const data = new FormData(event.currentTarget);

//       const email = data.get("email");
//       const password = data.get("password");

//       const res = await fetch("/api/user/login", {
//         method: "POST",

//         headers: {
//           "Content-Type": "application/json",
//         },

//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });

//       const fetchRes = await res.json();
  
//       console.log(fetchRes.user)

//       if (fetchRes.message === "Logged in succesfully") {
//         toast.success("Logged in succesfully");
//       } else {
//         toast.error(fetchRes.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Server Error");
//     }
//   };
export default function signIn1(){
  const app = useRouter();
  const handleSubmit= async (e)=>{
  try{
    e.preventDefault();
   
    const data = new FormData(e.currentTarget)
    const email =data.get("email")
    const password =data.get("password")
   
    const res = await fetch("/api/admin/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
         
          email,
          password,
        }),
      });


  const response = await res.json()
  const token = response.token
 
  // console.log("admin",token)
  
  if (response.message === "Logged in successfully") {
     sessionStorage.setItem("token", token);
    localStorage.setItem("token", token);
    app.push("/admin/dashboard");
            toast("admin logged in Succesfully");
            

    } else {
            toast.error(response.message);
          }
  }catch(error){
   console.log(error)

  }



  }





  return (
    <>

    <ToastContainer/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>

              <Grid item>
                <Link href="/user/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}