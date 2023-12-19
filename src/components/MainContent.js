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

          const keys = Object.keys(localStorage);

          // Find the key associated with the ID token
          const idTokenKey = keys.find((key) => key.includes('CognitoIdentityServiceProvider.2ho7tnfpkfe3n4rt2tmde9httc.') && key.includes('.idToken'));

          const authToken = idTokenKey ? localStorage.getItem(idTokenKey) : null
          
          //localStorage.getItem('CognitoIdentityServiceProvider.2ho7tnfpkfe3n4rt2tmde9httc.{}.idToken')

          const response = await fetch('http://localhost:8000/ascot/filteredresponse/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
              'X-CSRFToken': csrfToken,
            },
            // Include a request body if needed
            body: JSON.stringify({
                "filters":[
                    {"country":"sweden"},
                    {"region":"skåne"},
                    {"municipality":"malmö"},
                    {"ageGroup":""},
                    {"gender":""},
                    {"livingSituation":""},
                    {"surveyFiller":""}
                    ]
            }),
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
          
          <button onClick={signOut}>Sign out</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default MainContent;