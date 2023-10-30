import React, { useEffect, useState } from 'react'
import PrivateLayout from '../components/Layout/PrivateLayout'
import LandingPage from './LandingPage';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const backendUrl = "http://localhost:5001"

const cronofyClientId = process.env.REACT_APP_DEV_CRONOFY_CLIENT_ID;
const cronofyRedirectUri = process.env.REACT_APP_DEV_REDIRECT_URI;
const cronofyOauthUrl = process.env.REACT_APP_DEV_CRONOFY_OAUTH_URL;
const cronofyScope = process.env.REACT_APP_DEV_CRONOFY_SCOPE;
const cronofyState = process.env.REACT_APP_DEV_CRONOFY_STATE;

function HomePage() {
  axios.defaults.withCredentials = true;
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('')
  const [emailList, setEmailList] = useState([]);
  const [emailInput, setEmailInput] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setEmailInput(event.target.value);
  };

  const getEmailList = async () => {
    const emailResponse = await axios.get(`${backendUrl}/getUserEmail`);
    if (emailResponse.status === 200) {
      const updatedEmailList = emailResponse.data;
      setEmailList(updatedEmailList);
      setEmailInput('');
    } else {
      showErrorToast('Failed to add the email.');
    }
  }

  const initiateCronofyOAuth = () => {
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

  const handleCronofyCallback = async () => {
    // Extract the authorization code and state from the URL (e.g., using URLSearchParams)
    const searchParams = new URLSearchParams(window.location.search);
    const receivedCode = searchParams.get('code');
    const receivedState = searchParams.get('state');

    // Validate the received state against the stored state parameter
    if (receivedState !== cronofyState) {
      showErrorToast('Invalid state parameter. Possible CSRF attack.');
      return;
    }
    if (receivedCode) {
      // Make a POST request to your backend to exchange the code for tokens
      try {
        const response = await axios.post(`${backendUrl}/redeemcode`, { code: receivedCode });
        if (response.data.status === 'Success') {
          toast.success('Tokens are successfully saved in your DB', {
            position: toast.POSITION.TOP_RIGHT
          })
          navigate('/home');  
        } else {
          showErrorToast('Failed to exchange Cronofy code for tokens.');
        }
      } catch (error) {
        showErrorToast('Failed to exchange Cronofy code for tokens.');
      }
    }
  };

  const handleAddEmail = async (e) => {
    e.preventDefault()
    // Regular expression for email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (emailInput.trim() !== '' && emailRegex.test(emailInput)) {
      // Check if the email already exists in the list
      if (!emailList.includes(emailInput)) {

        // Redirect to Cronofy OAuth flow
        try {
          const emailResponse = await axios.post(`${backendUrl}/addUserEmail`, { emailAddress: emailInput });
          if (emailResponse.status === 200) {
            setEmailInput('');
            const response = initiateCronofyOAuth();
            // The response should contain the authorization URL from Cronofy
            // Redirect the user to the Cronofy authorization URL
            window.location.href = response.authorizationUrl;
          }
          else {
            showErrorToast('Failed to add the email.');
          }
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

  const handleRemoveEmail = (emailToRemove) => {
    axios
      .put(`${backendUrl}/removeUserEmail`, { emailAddress: emailToRemove })
      .then((response) => {
        if (response.data.status === 'Success') {
          // Email removal was successful, update the frontend accordingly
          setEmailList(emailList.filter((email) => email !== emailToRemove));
        } else {
          // Handle the error if the removal was not successful
          console.error('Error removing email:', response.data.Error);
          showErrorToast(response.data.Error);
        }
      })
      .catch((error) => {
        // Handle network or other errors
        console.error('Error removing email:', error);
      });
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
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserVerified()
  }, [])

  useEffect(() => {
    getEmailList();
    // Check if the URL contains 'code' (after Cronofy redirects)
    if (window.location.search.includes('code')) {
      // Execute the callback to exchange the code for tokens
      handleCronofyCallback();
    }
  // eslint-disable-next-line  
  }, []);

  return (
    auth ?
      <PrivateLayout>
        <div className="container mt-4">
          <h3>Hi {name}, <br />Welcome to Personal Calendar Sync - Cronofy API</h3>
          <div className="row mt-4">
            <div className="card mb-3" style={{ maxWidth: "30rem" }}>
              <div className="card-body">
                <form>
                  <label htmlFor="emailInput"> <strong>Add Email Address:</strong><br />
                    <input type="email" id="emailInput" value={emailInput} placeholder='janedoe@gmail.com' onChange={handleInputChange} />
                  </label> &nbsp;
                  <button onClick={handleAddEmail}><i className="fas fa-plus"></i></button>
                </form>
              </div>
              <div className="card-footer bg-transparent border-success">
                <h5>
                  List of Email Address Added:
                </h5>
                <ol className="list-group">
                  {emailList.map((email, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      {email}
                      <span style={{ color: "red",cursor:"pointer"}} onClick={() => handleRemoveEmail(email)}>
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