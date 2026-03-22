'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Stack, Typography, IconButton, alpha, styled } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { motion, AnimatePresence } from 'framer-motion';

export interface CarouselSlide {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageCarouselProps {
  slides: CarouselSlide[];
  autoPlayMs?: number;
  height?: { xs: number; md: number };
}

const CarouselContainer = styled('div')({
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  backgroundColor: '#ffffff',
  border: '1px solid #e0e0e0',
  borderRadius: 4,
});

const SlideImage = styled(motion.img)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
});

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

export default function ImageCarousel({
  slides,
  autoPlayMs = 5000,
  height = { xs: 280, md: 380 },
}: ImageCarouselProps) {
  const [[activeIndex, direction], setActiveIndex] = useState([0, 1]);
  const [isPaused, setIsPaused] = useState(false);

  const slideCount = slides.length;

  const goTo = useCallback(
    (index: number, dir: number) => {
      setActiveIndex([((index % slideCount) + slideCount) % slideCount, dir]);
    },
    [slideCount]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1, 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1, -1), [activeIndex, goTo]);

  // Auto-play
  useEffect(() => {
    if (isPaused || slideCount <= 1) return;
    const timer = setInterval(goNext, autoPlayMs);
    return () => clearInterval(timer);
  }, [isPaused, goNext, autoPlayMs, slideCount]);

  if (slides.length === 0) return null;

  const currentSlide = slides[activeIndex];

  return (
    <Stack spacing={1.5}>
      <CarouselContainer
        sx={{ height: { xs: height.xs, md: height.md } }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <SlideImage
            key={activeIndex}
            src={currentSlide.src}
            alt={currentSlide.alt}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            draggable={false}
          />
        </AnimatePresence>

        {/* No overlay — caption shown below */}

        {/* Nav arrows */}
        {slideCount > 1 && (
          <>
            <IconButton
              onClick={goPrev}
              size="small"
              sx={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.85)',
                color: '#333',
                width: 36,
                height: 36,
                '&:hover': { bgcolor: '#fff' },
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            >
              <ChevronLeftIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={goNext}
              size="small"
              sx={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.85)',
                color: '#333',
                width: 36,
                height: 36,
                '&:hover': { bgcolor: '#fff' },
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            >
              <ChevronRightIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </CarouselContainer>

      {/* Caption below image */}
      {currentSlide.caption && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center', fontSize: '0.8rem', fontWeight: 500 }}
        >
          {currentSlide.caption}
        </Typography>
      )}

      {/* Dot indicators */}
      {slideCount > 1 && (
        <Stack direction="row" justifyContent="center" spacing={0.75}>
          {slides.map((_, i) => (
            <Stack
              key={i}
              onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
              sx={{
                width: activeIndex === i ? 24 : 8,
                height: 8,
                borderRadius: 4,
                bgcolor: activeIndex === i ? '#0072CE' : alpha('#0072CE', 0.2),
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
