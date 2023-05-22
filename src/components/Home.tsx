import styles from '@styles/Home.module.css';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseConfig } from '../../firebase';
import { initializeApp } from 'firebase/app';
import { useState } from 'react';

function Home(): JSX.Element {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
      // Force re-consent.
      prompt: 'consent',
    });

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        setLoggedIn(true);
        setLoading(false);
        console.log(user);
      }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      setLoading(false);
    });
  };

  return (
    <div className={styles.containers}>
      <h1 className={styles.heading}>Secure Your Belongings with Ease</h1>
      <br />
      <h2 className={styles.content}>
        Let's get started by signing in with your Google account
      </h2>
      <br />
      <div className='mt-10'>
        <div onClick={signInWithGoogle} className={`group ${styles.link}`}>
          <span className={styles.border} />
          <span className={`group-hover:bg-opacity-0 duration-400 ${styles.btn}`}>
            <span className={styles.text}>
              {loading ? 'Loading...' : loggedIn ? 'Signed In' : 'Sign In'}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;
