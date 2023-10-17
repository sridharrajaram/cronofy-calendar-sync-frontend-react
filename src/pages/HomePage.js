import React, { useEffect, useState } from 'react'
import PrivateLayout from '../components/Layout/PrivateLayout'
import LandingPage from './LandingPage';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const backendUrl = "http://localhost:5001"

const cronofyClientId = process.env.REACT_APP_DEV_CRONOFY_CLIENT_ID; // Replace with your Cronofy Client ID
const cronofyRedirectUri = process.env.REACT_APP_DEV_REDIRECT_URI; // Replace with your OAuth redirect URI
const cronofyOauthUrl = process.env.REACT_APP_DEV_CRONOFY_OAUTH_URL;
const cronofyScope = process.env.REACT_APP_DEV_CRONOFY_SCOPE;
const cronofyState = process.env.REACT_APP_DEV_CRONOFY_STATE;

function HomePage() {
  axios.defaults.withCredentials = true;
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('')
  const [emailList, setEmailList] = useState([]);
  const [emailInput, setEmailInput] = useState('');

  const handleInputChange = (event) => {
    setEmailInput(event.target.value);
  };

  const initiateCronofyOAuth = async () => {
    try {
      // Define the OAuth authorization URL
      const authorizationUrl = `${cronofyOauthUrl}?client_id=${cronofyClientId}&redirect_uri=${cronofyRedirectUri}&scope=${cronofyScope}&response_type=code&state=${cronofyState}`;
      
      // Return the authorization URL to use in the redirection
      return {
        authorizationUrl,
      };
    } catch (error) {
      throw new Error('Failed to initiate Cronofy OAuth');
    }
  };  

  const handleAddEmail = async (e) => {
    e.preventDefault()
    // Regular expression for email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (emailInput.trim() !== '' && emailRegex.test(emailInput)) {
      // Check if the email already exists in the list
      if (!emailList.includes(emailInput)) {
        setEmailList([...emailList, emailInput]);
        setEmailInput('');

        // Redirect to Cronofy OAuth flow
        try {
          const response = await initiateCronofyOAuth();
          // You should handle the OAuth redirection and callback here
          // The response should contain the authorization URL from Cronofy
          // Redirect the user to the Cronofy authorization URL
          window.location.href = response.authorizationUrl;
        } catch (error) {
          showErrorToast('Failed to initiate Cronofy OAuth.');
        }


      } else {
        showErrorToast('This email address is already added in your list');
      }
    } else {
      showErrorToast('Please enter a valid email address.');
    }
  };

  const handleRemoveEmail = (indexToRemove) => {
    setEmailList(emailList.filter((_, index) => index !== indexToRemove));
  };

  const showErrorToast = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

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

  useEffect(() => {
    getUserVerified()
  }, [])

  return (
    auth ?
      <PrivateLayout>
        <div className="container mt-4">
          <h3>Hi {name}, <br />Welcome to Personal Calendar Sync - Cronofy API</h3>
          <div className="row mt-4">
            <div className="card mb-3" style={{ maxWidth: "30rem" }}>
              <div className="card-body">
                <form>
                  <label for="emailInput"> <strong>Add Email Address:</strong><br />
                    <input type="email" id="emailInput" value={emailInput} placeholder='janedoe@gmail.com' onChange={handleInputChange} />
                  </label> &nbsp;
                  <button onClick={handleAddEmail}><i className="fas fa-plus"></i></button>
                </form>
              </div>
              <div className="card-footer bg-transparent border-success">
                <h5>
                  List of Email Address Synced:
                </h5>
                <ol className="list-group">
                  {emailList.map((email, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      {email}
                      <span style={{ color: "red" }} onClick={() => handleRemoveEmail(index)}>
                        X
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </PrivateLayout>
      :
      <LandingPage />
  )
}

export default HomePage;