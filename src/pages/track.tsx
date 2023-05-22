import Page from '@layouts/Page';
import Section from '@layouts/Section';
import Webcam from 'react-webcam';
import { useCallback, useRef, useState } from 'react';

const videoConstraints = {
  width: 1280,
  height: 1280,
  facingMode: { exact: 'environment' },
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
        <Webcam
          audio={false}
          height={1280}
          ref={webcamRef}
          screenshotFormat='image/jpeg'
          width={1280}
          videoConstraints={videoConstraints}
        />
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
          onClick={capture}>Capture photo
        </button>

        {imageSrc && <img src={imageSrc} alt={`image`} />}
      </Section>
    </Page>
  );
}
