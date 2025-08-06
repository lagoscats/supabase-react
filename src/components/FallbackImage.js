import React, { useState } from 'react';

const FallbackImage = ({ src, alt = 'Image', fallback = 'https://picsum.photos/100', className = '' }) => {
  const [imgSrc, setImgSrc] = useState(src || fallback);

  const handleError = () => {
    if (imgSrc !== fallback) {
      setImgSrc(fallback);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};

export default FallbackImage;
