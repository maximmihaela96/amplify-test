import React, { useEffect, useState } from 'react';

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  }


const MainContent = ({ signOut, user }) => {
  const [userData, setUserData] = useState(null);

  const csrfToken = getCookie('csrftoken');

  useEffect(() => {
    const fetchData = async () => {
        
      try {
        if (user) {


          const authToken = localStorage.getItem('CognitoIdentityServiceProvider.2ho7tnfpkfe3n4rt2tmde9httc.350dd409-8921-47cc-9a28-5c8a170fd290.idToken')

          console.log(authToken);
          const response = await fetch('http://localhost:8000/validate-token/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
              'X-CSRFToken': csrfToken,
            },
            // Include a request body if needed
            // body: JSON.stringify({}),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          // Now 'data' contains the decrypted user information
          console.log(data);
          setUserData(data);
        } else {
          console.warn('Unexpected user object structure:', user);
        }
      } catch (error) {
        console.error('Error validating token:', error.message);
      }
    };

    fetchData();
  }, [user]);

  return (
    <>
      {user ? (
        <>
          <h1>Hello {user.signInDetails.loginId}</h1>
          <button onClick={signOut}>Sign out</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default MainContent;