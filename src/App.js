
import React from 'react';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import MainContent from './components/MainContent'; // Import the MainContent component

Amplify.configure(awsExports);

const App = ({ signOut, user }) => {
  return (
    <div>
      <MainContent signOut={signOut} user={user} /> {/* Pass user prop to MainContent */}
    </div>
  );
};

export default withAuthenticator(App);









// import { Amplify } from 'aws-amplify';
// import { withAuthenticator } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';

// import awsExports from './aws-exports';
// Amplify.configure(awsExports);

// function App({ signOut, user }) {
//   // Log specific properties for debugging
//   console.log("User ID:", user);
//   console.log("Username:", user.signInDetails.authFlowType);

//   return (
//     <>
//       <h1>Hello {user.signInDetails.loginId}</h1>
//       <button onClick={signOut}>Sign out</button>
//     </>
//   );
// }

// export default withAuthenticator(App);
