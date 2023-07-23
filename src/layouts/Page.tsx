import Head from 'next/head';
import { BottomNav, Footer, Header } from '@components/index';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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

  }, []);


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
