import Head from 'next/head';
import { BottomNav, Header } from '@components/index';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getMessaging, getToken } from 'firebase/messaging';
import { FirebaseApp } from '../../firebase';


/**
 * It's a React component that renders a page with a header, footer, and bottom navigation
 * @param  - title - The title of the page.
 * @returns A React component that renders a header, footer, and main content.
 */
function Page({ title, className, children }: cat.PageProps): JSX.Element {
  const pageTitle = title === 'Home' ? 'SecureVision' : `SecureVision | ${title}`;
  const [isLogged, setIsLogged] = useState(false);

  const router = useRouter();


  useEffect(() => {
    const email = localStorage.getItem('email');

    if (email) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }


    if (router.pathname === '/') {

    } else if (!email) {
      sendToAuth();
    }

    requestPermission();
    getTokenAndSave();

  }, []);


  const requestPermission = () => {

    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
    });
  };


  const getTokenAndSave = async () => {

    const messaging = getMessaging(FirebaseApp);

    getToken(messaging, { vapidKey: `BI3dbRNxUVIrz-X9MrgWV6B2mtsvJBGWqTqaGma52ARaGOttAuri_yxeT366Y5SQ9ByJifcEkpZadADl69vTHkA` }).then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...

        localStorage.setItem('message-token', currentToken);
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });

  //   setBackgroundMessageHandler



  };

  const sendToAuth = async () => {
    await router.push('/auth');
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header />
      <main>
        <article className={className}>{children}</article>
      </main>
      {isLogged && <BottomNav />}
    </>
  );
}

export default Page;
