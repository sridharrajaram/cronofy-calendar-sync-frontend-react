import React, { useEffect, useState } from 'react'
import PrivateLayout from '../components/Layout/PrivateLayout'
import LandingPage from './LandingPage';
import axios from 'axios';

const backendUrl = "http://localhost:5001"


function HomePage() {
  const [auth, setAuth]=useState(false);
  const [name, setName]=useState('')
  axios.defaults.withCredentials=true;
  const getUserVerified = async () => {
    try {
      await axios.get(`${backendUrl}`)
        .then(res => {
          if (res.data.status === "Success"){
            setAuth(true)
            setName(res.data.name)
          }
          else {
            setAuth(false)
          }
        })
        .then(err => {
          console.log(err)});
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    getUserVerified()
  }, [])
  
  return (
    auth ?
      <PrivateLayout>
        <div className="container mt-4">
          <h3>Hi {name}, <br/>Welcome to Cronofy Calendar Sync</h3>
        </div>
      </PrivateLayout>
      :
      <LandingPage/>
  )
}

export default HomePage