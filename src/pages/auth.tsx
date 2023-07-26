import Page from '@layouts/Page';
import Section from '@layouts/Section';
import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { FirebaseApp } from '../../firebase';


export default function main(): JSX.Element {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const auth = getAuth(FirebaseApp);

  const [verifiedEmail, setVerifiedEmail] = useState('');
  useEffect(() => {
    if (verifiedEmail) {
      signInComplete();
    }
  }, [verifiedEmail]);

  const signInComplete = async () => {
    localStorage.setItem('email', verifiedEmail);

    await router.push('/track');
  };

  useEffect(() => {
    localStorage.removeItem('email')
  }, []);

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential?.user?.email) {
          setVerifiedEmail(userCredential?.user?.email);
        }

      }).catch((error) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          if (userCredential?.user?.email) {
            setVerifiedEmail(userCredential?.user?.email);
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    });
  };

  return (
    <Page title='Home'>
      <Section className={``}>
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 pt-40 lg:px-8'>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <img
              className='mx-auto h-10 w-auto'
              src='/icons/icon-maskable-192x192.png'
              alt='Your Company'
            />
            <h2
              className='mt-10  text-2xl font-bold leading-9 tracking-tight
            text-center animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent
            '
            >
              Sign in to your account
            </h2>
          </div>

          <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form className='space-y-6' onSubmit={formSubmit}>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-indigo-100'
                >
                  Email address
                </label>
                <div className='mt-2'>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div>
                <div className='flex items-center justify-between'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium leading-6 text-indigo-100'
                  >
                    Password
                  </label>
                  <div className='text-sm'>
                    <a href='#' className='font-semibold text-indigo-100 hover:text-indigo-500'>
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className='mt-2'>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    required
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className='
                  animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500
                  flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm
                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 '
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </Section>
    </Page>
  );
}
