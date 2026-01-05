import { useState, useEffect } from 'react';
import imageManifest from '../imageManifest.json';

export const useImagePreloader = () => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    // Collect all image paths
    const allImagePaths = [];

    Object.entries(imageManifest).forEach(([folder, files]) => {
      files.forEach(filename => {
        allImagePaths.push(`/surprise/images/${folder}/${filename}`);
      });
    });

    // Add other static images
    const staticImages = [
      '/surprise/images/birthday-cake.png',
      '/surprise/images/deco-1.png',
      '/surprise/images/deco-2.png',
      '/surprise/images/deco-3.png',
      '/surprise/images/deco-4.png',
      '/surprise/images/deco-5.png',
      '/surprise/images/deco-6.png',
      '/surprise/images/deco-7.png',
      '/surprise/images/deco-8.png',
      '/surprise/images/deco-9.png',
      '/surprise/images/deco-10.png',
      '/surprise/images/deco-11.png',
      '/surprise/images/deco-12.png',
      '/surprise/images/deco-13.png',
      '/surprise/images/love_chart.png',
      '/surprise/images/achievement-1.jpg',
      '/surprise/images/achievement-2.jpg',
      '/surprise/images/achievement-3.jpg',
      '/surprise/images/achievement-4.jpg',
      '/surprise/images/achievement-5.jpg',
      '/surprise/images/achievement-6.jpg',
    ];

    const imagesToLoad = [...allImagePaths, ...staticImages];
    setTotalImages(imagesToLoad.length);

    let loaded = 0;

    const preloadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
          loaded++;
          setLoadedCount(loaded);
          resolve(src);
        };

        img.onerror = () => {
          // Still count as loaded even if error, to prevent hanging
          loaded++;
          setLoadedCount(loaded);
          resolve(src);
        };

        img.src = src;
      });
    };

    // Preload all images
    Promise.all(imagesToLoad.map(preloadImage))
      .then(() => {
        // Add a small delay so users can see 100%
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch(() => {
        setIsLoading(false);
      });

  }, []);

  const progress = totalImages > 0 ? (loadedCount / totalImages) * 100 : 0;

  return { isLoading, progress };
};
