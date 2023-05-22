import styles from '@styles/Home.module.css';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useEffect, useState } from 'react';
import { firebaseConfig } from '../../firebase';

function Home(): JSX.Element {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('Sign In');

  useEffect(() => {
    if (loggedIn) {
      setButtonText('Signed In');
    } else if (loading) {
      setButtonText('Loading...');
    } else {
      setButtonText('Sign In');
    }
  }, [loggedIn, loading]);

  const signInWithGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
      // Force re-consent.
      prompt: 'consent',
    });

    signInWithRedirect(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const { user } = result;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        setLoggedIn(true);
        setLoading(false);
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const { email } = error.customData;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        setLoading(false);
      });
  };

  return (
    <div className={styles.containers}>
      <h1 className={styles.heading}>Secure Your Belongings with Ease 🛡️</h1>
      <br />
      <h2 className={styles.content}>
        Let&apos;s get started by signing in with your Google account
      </h2>
      <br />
      <div className="mt-10">
        <button
          type="button"
          onKeyDown={signInWithGoogle}
          onClick={signInWithGoogle}
          className={`group ${styles.link}`}
        >
          <span className={styles.border} />
          <span className={`group-hover:bg-opacity-0 duration-400 ${styles.btn}`}>
            <span className={styles.text}>{buttonText}</span>
          </span>
        </button>
      </div>
    </div>
  );
}

export default Home;
