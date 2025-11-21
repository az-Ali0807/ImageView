import { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string,
  alt?: string,
  className?: string,
  style?: {
    opacity?: number,
    transition?: string
  } ,
  placeholder?: string,
}

const LazyImage = ({ src, alt, className }: LazyImageProps) => {

  const [visible, setVisible] = useState<boolean>(false);

  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    },
      { threshold: 0.1 }
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 1.4s ease"
      }}
    />
  )
}

export default LazyImage;