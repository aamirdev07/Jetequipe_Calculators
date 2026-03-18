'use client';

import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroBackgroundProps {
  images: string[];
  intervalMs?: number;
}

const BgImage = styled(motion.img)({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
});

export default function HeroBackground({ images, intervalMs = 6000 }: HeroBackgroundProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images.length, intervalMs]);

  if (images.length === 0) return null;

  return (
    <AnimatePresence mode="popLayout">
      <BgImage
        key={index}
        src={images[index]}
        alt=""
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        draggable={false}
      />
    </AnimatePresence>
  );
}
