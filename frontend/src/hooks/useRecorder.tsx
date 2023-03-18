import { useEffect, useState } from 'react';

const useRecorder = () => {
  const [audioURL, setAudioURL] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
    }

    // Obtain the audio when ready.
    const handleData = (e: BlobEvent) => {
      const audioSrc = URL.createObjectURL(e.data);
      setAudioURL(audioSrc);
    };

    recorder.addEventListener('dataavailable', handleData);
    return () => recorder.removeEventListener('dataavailable', handleData);
  }, [recorder, isRecording]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    // only change recording to false (and make the stop function run on click)
    // when recorder is not inactive (not initialized properly for a short time)
    if (recorder && recorder.state !== 'inactive') {
      setIsRecording(false);
    }
  };

  return { audioURL, setAudioURL, isRecording, startRecording, stopRecording };
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream);
}

export default useRecorder;
