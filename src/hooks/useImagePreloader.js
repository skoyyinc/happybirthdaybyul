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
        allImagePaths.push(`/happybirthdaybyul/images/${folder}/${filename}`);
      });
    });

    // Add other static images
    const staticImages = [
      '/happybirthdaybyul/images/birthday-cake.png',
      '/happybirthdaybyul/images/deco-1.png',
      '/happybirthdaybyul/images/deco-2.png',
      '/happybirthdaybyul/images/deco-3.png',
      '/happybirthdaybyul/images/deco-4.png',
      '/happybirthdaybyul/images/deco-5.png',
      '/happybirthdaybyul/images/deco-6.png',
      '/happybirthdaybyul/images/deco-7.png',
      '/happybirthdaybyul/images/deco-8.png',
      '/happybirthdaybyul/images/deco-9.png',
      '/happybirthdaybyul/images/deco-10.png',
      '/happybirthdaybyul/images/deco-11.png',
      '/happybirthdaybyul/images/deco-12.png',
      '/happybirthdaybyul/images/deco-13.png',
      '/happybirthdaybyul/images/love_chart.png',
      '/happybirthdaybyul/images/achievement-1.jpg',
      '/happybirthdaybyul/images/achievement-2.jpg',
      '/happybirthdaybyul/images/achievement-3.jpg',
      '/happybirthdaybyul/images/achievement-4.jpg',
      '/happybirthdaybyul/images/achievement-5.jpg',
      '/happybirthdaybyul/images/achievement-6.jpg',
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
