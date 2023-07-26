import Page from '@layouts/Page';
import Section from '@layouts/Section';
import Webcam from 'react-webcam';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from '@styles/Home.module.css';
import { FirebaseApp } from '../../firebase';
import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage';
import { getDatabase, ref as ref2, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';


const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: { exact: 'environment' },
};

const track = (): JSX.Element => {
  const auth = getAuth(FirebaseApp);
  const storage = getStorage(FirebaseApp);
  const database = getDatabase();

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
          uploadDataToFirebase(url, timestamp, userEmail);
        });
    });
  };


  const uploadDataToFirebase = (url: string, timestamp: number, userEmail: string | null) => {

    set(ref2(database, `${userEmail}/`), {
      email: userEmail,
      image_of_laptop: url,
      timestamp: timestamp,
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
