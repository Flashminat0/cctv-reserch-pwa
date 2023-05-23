import Page from '@layouts/Page';
import Section from '@layouts/Section';
import Webcam from 'react-webcam';
import { useCallback, useRef, useState } from 'react';
import styles from '@styles/Home.module.css';
import Link from 'next/link';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from 'firebase/storage';
import axios from 'axios';

const videoConstraints = {
  width: 640,
  height: 480,
  // facingMode: { exact: 'environment' },
  facingMode: 'user',
};

const track = (): JSX.Element => {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);


  const [imageSrc, setImageSrc] = useState('');

  const webcamRef = useRef(null);
  const capture = useCallback(
    () => {
      if (webcamRef?.current) {
        // @ts-ignore
        const imageSrc = webcamRef.current.getScreenshot();

        setImageSrc(imageSrc);
      }
    },
    [webcamRef],
  );


  const uploadPictureAndGetResult = () => {
    const userEmail = localStorage.getItem('email');
    const timestamp = new Date().getTime();

    const storageRef = ref(storage, 'jobs/' + userEmail + '/' + timestamp + '/' + 'source.jpg');

    uploadString(storageRef, imageSrc, 'data_url').then((snapshot) => {
      getDownloadURL(storageRef)
        .then((url) => {
          console.log('url', url);

          // axios.post('https://us-central1-aiot-fit-xlab.cloudfunctions.net/track', {}).then((res) => {
          //
          // });
        });
    });
  };

  return (
    <Page title='Track'>
      <Section className='flex items-center justify-center flex-col p-2'>
        {imageSrc ? <div className={`space-y-4 flex flex-col items-center justify-center `}>
          {imageSrc && <img src={imageSrc} alt={`image`} />}
          <button
            onClick={() => setImageSrc('')}
            className={`group ${styles.link}`}
          >
            <span className={styles.border} />
            <span className={`group-hover:bg-opacity-0 duration-400 ${styles.btn}`}>
              <span className={styles.text}>Try Again</span>
            </span>
          </button>

          <button
            onClick={uploadPictureAndGetResult}
            className={`group ${styles.link}`}
          >
            <span className={styles.border} />
            <span className={`group-hover:bg-opacity-0 duration-400 ${styles.btn}`}>
              <span className={styles.text}>Track Laptop</span>
            </span>
          </button>
        </div> : <div className={`space-y-4 flex flex-col items-center justify-center`}>
          <Webcam
            audio={false}
            height={480}
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            width={640}
            videoConstraints={videoConstraints}
          />

          <button
            onClick={capture}
            className={`group ${styles.link}`}
          >
            <span className={styles.border} />
            <span className={`group-hover:bg-opacity-0 duration-400 ${styles.btn}`}>
              <span className={styles.text}>Capture photo</span>
            </span>
          </button>
        </div>}


      </Section>
    </Page>
  );
};
export default track;
