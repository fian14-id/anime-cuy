// LoadingAnimation.jsx
'use client';
import { useEffect, useRef, forwardRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';

// Dynamically import Lottie with no SSR
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const LoadingAnimation = forwardRef(({ size = "normal", animationData }, ref) => {
  const sizeClasses = {
    small: "w-24 h-24",
    normal: "w-48 h-48 md:w-64 md:h-64",
    large: "w-64 h-64 md:w-96 md:h-96"
  };

  return (
    <div className={`flex items-center justify-center ${sizeClasses[size]}`} ref={ref}>
      {typeof window !== 'undefined' && (
        <Lottie animationData={animationData} loop={true} />
      )}
    </div>
  );
});

export const Preloader = ({ isLoading, animationData }) => {
  const preloaderRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const tl = gsap.timeline();
    tl.from(preloaderRef.current, {
      scale: 2,
      duration: 1,
      ease: "power3.out"
    });

    if (!isLoading) {
      const exitTl = gsap.timeline({
        onComplete: () => {
          if (preloaderRef.current) {
            preloaderRef.current.style.display = 'none';
          }
        }
      });
      exitTl.to(preloaderRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in"
      });
    }
  }, [isLoading]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-palette-primary"
    >
      <LoadingAnimation size="large" animationData={animationData} />
    </div>
  );
};

export const LoadingPage = ({ animationData }) => {
  const loadingRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const tl = gsap.timeline();
    tl.from(loadingRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut"
    });
  }, []);

  return (
    <div
      ref={loadingRef}
      className="fixed inset-0 z-50 flex items-center justify-center w-full min-h-screen bg-palette-primary"
    >
      <LoadingAnimation size="large" animationData={animationData} />
    </div>
  );
};

LoadingAnimation.displayName = 'LoadingAnimation';
export default LoadingAnimation;