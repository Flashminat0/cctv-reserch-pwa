import Page from '@layouts/Page';
import Section from '@layouts/Section';
import Webcam from 'react-webcam';
import { useCallback, useRef, useState } from 'react';
import styles from '@styles/Home.module.css';
import Link from 'next/link';

const videoConstraints = {
  width: 640,
  height: 480,
  // facingMode: { exact: 'environment' },
  facingMode: 'user',
};

export default function track(): JSX.Element {
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
            onClick={capture}
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
}
