import { useEffect, useState } from 'react';

export default function useTypewriter(phrases, typingSpeed = 100, pauseTime = 2000) {
  const [index, setIndex] = useState(0); // phrase index
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[index];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentPhrase.slice(0, text.length + 1));
        if (text === currentPhrase) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setText(currentPhrase.slice(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setIndex((index + 1) % phrases.length);
        }
      }
    }, isDeleting ? typingSpeed / 2 : typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, phrases, typingSpeed, pauseTime]);

  return text;
}
