import Page from '@layouts/Page';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * It returns a header element with a logo, a title, and a navigation bar
 * @returns A JSX element
 */
function Logout(): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('email');


    router.push('/');
  }, []);


  return (
    <>
      <Page title='Facts'>
        <div className={`grid place-items-center`}>
          Logging out...
        </div>
      </Page>
    </>
  );
}

export default Logout;
