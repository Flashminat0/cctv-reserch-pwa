import Page from '@layouts/Page';
import Section from '@layouts/Section';
import { FactCard } from '@components/index';
import BindedNotification from '@components/Notifications/BindedNotification';
import { firebaseConfig } from '../../firebase';
export default function facts(): JSX.Element {
  return (
    <Page title='Facts'>
      <Section className='flex flex-col'>
        <div className={`flex items-center justify-center text-xl font-semibold p-2`}>Notifications</div>

        <BindedNotification />
      </Section>
    </Page>
  );
}
