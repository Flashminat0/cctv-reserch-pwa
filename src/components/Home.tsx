import styles from '@styles/Home.module.css';
import { getAuth, getRedirectResult, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useEffect, useState } from 'react';
import { firebaseConfig } from '../../firebase';
import Link from 'next/link';

function Home(): JSX.Element {
  // const app = initializeApp(firebaseConfig);
  // const auth = getAuth(app);

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('email');

    if (email) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);


  return (
    <div className={styles.containers}>
      <h1 className={styles.heading}>Secure Your Belongings with Ease </h1>
      <br />
      {!isLogged ? <>
        <h2 className={styles.content}>Let&apos;s get started by signing in with your SLIIT email</h2>
        <br />
        <div className='mt-10'>
          <Link href='/auth'
                className={`group ${styles.link}`}
          >
            <span className={styles.border} />

            <span className={`group-hover:bg-opacity-0 duration-400 ${styles.btn}`}>
            <span className={styles.text}>Sign in</span>
          </span>
          </Link>
        </div>
      </> : <>
        <h2 className={styles.content}>Let&apos;s get started </h2>
        <br />
        <div className='mt-10'>
          <Link href='/track'
                className={`group ${styles.link}`}
          >
            <span className={styles.border} />

            <span className={`group-hover:bg-opacity-0 duration-400 ${styles.btn}`}>
            <span className={styles.text}>Go to Track Tab</span>
          </span>
          </Link>
        </div>
      </>}
    </div>
  );
}

export default Home;
