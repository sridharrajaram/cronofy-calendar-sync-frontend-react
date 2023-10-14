import React, { useEffect, useState } from 'react'
import PrivateLayout from '../components/Layout/PrivateLayout'
import LandingPage from './LandingPage';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const backendUrl = "http://localhost:5001"

function HomePage() {
  const location = useLocation(); // If using React Router
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('')
  axios.defaults.withCredentials = true;

  const getUserVerified = async () => {
    try {
      await axios.get(`${backendUrl}`)
        .then(res => {
          if (res.data.status === "Success") {
            setAuth(true)
            setName(res.data.name)
          }
          else {
            setAuth(false)
          }
        })
        .then(err => {
          console.log(err)
        });
    } catch (error) {
      console.log(error);
    }
  }

  const getCronofyOuth = async () => {
    
    const params = new URLSearchParams(location.search); // If using React Router, use location.search
    console.log('params',params)
    if (params.has('code')) {
      const authorizationCode = params.get('code');

      // Send the authorization code to your Node.js backend
      await axios.post('/cronofy-callback', { code: authorizationCode })
        .then(response => {
          console.log('OAuth callback handled:', response.data);
          // You can redirect the user to a success page or perform other actions here
        })
        .catch(error => {
          console.error('Error handling OAuth callback:', error);
          // You can redirect the user to an error page or show an error message here
        });
    }
  }

  useEffect(() => {
    getUserVerified()
    getCronofyOuth()
  }, [])

  // Function to initiate the Cronofy OAuth flow
  const initiateCronofyOAuth = async () => {
    // Make a GET request to the /cronofy-auth route
    await axios.get('/cronofy-auth')
      .then(response => {
        // Redirect the user to the Cronofy authorization page
        window.location = response.data;
      })
      .catch(error => {
        console.error('Error initiating Cronofy OAuth:', error);
      });
  };


  return (
    auth ?
      <PrivateLayout>
        <div className="container mt-4">
          <h3>Hi {name}, <br />Welcome to Cronofy Calendar Sync</h3>
          <hr />
          <h1>Cronofy Calendar Integration</h1>
          <button onClick={initiateCronofyOAuth}>Connect to Cronofy</button>
        </div>
      </PrivateLayout>
      :
      <LandingPage />
  )
}

export default HomePage;