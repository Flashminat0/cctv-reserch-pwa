import Page from '@layouts/Page';
import Section from '@layouts/Section';
import BindedNotification from '@components/Notifications/BindedNotification';
import { useEffect, useState } from 'react';

export default function facts(): JSX.Element {
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('message-token') || '');
  }, []);


  const copyToClipboard = () => {
    navigator.clipboard.writeText(token);
  };

  return (
    <Page title='Facts'>
      <Section className='flex flex-col'>
        <div className={`flex items-center justify-center text-xl font-semibold p-2`}>Notifications</div>
        {token && <div
          onClick={copyToClipboard}
          className={`flex items-center justify-center text-xl font-semibold p-2`}>{token.slice(0, 5)}</div>}
        {/*<BindedNotification />*/}

        <button
          onClick={() => {
            navigator.clipboard.writeText(token);
          }}
          className={`flex items-center justify-center text-xl font-semibold p-2`}>Copy
        </button>
      </Section>
    </Page>
  );
}
