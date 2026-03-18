'use client';

import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  Chip,
  alpha,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import OpacityIcon from '@mui/icons-material/Opacity';
import SpeedIcon from '@mui/icons-material/Speed';
import StraightenIcon from '@mui/icons-material/Straighten';
import PropaneTankIcon from '@mui/icons-material/PropaneTank';
import CalculateIcon from '@mui/icons-material/Calculate';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import BoltIcon from '@mui/icons-material/Bolt';
import VerifiedIcon from '@mui/icons-material/Verified';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeIn, FadeInView, StaggerContainer, StaggerItem } from '@/components/shared/MotionWrapper';
import ImageCarousel, { CarouselSlide } from '@/components/shared/ImageCarousel';
import HeroBackground from '@/components/shared/HeroBackground';

const productSlides: CarouselSlide[] = [
  {
    src: '/cuve.jpg',
    alt: 'Sanitary processing station with conical-bottom tank',
    caption: 'Sanitary processing station with conical-bottom tank and hopper',
  },
  {
    src: '/Cart-Stand-Custom-Fabrication-1-1200x1196.jpg',
    alt: 'Custom mobile pump cart',
    caption: 'Custom mobile pump cart with sanitary centrifugal pump',
  },
  // Add more slides here as the client provides images
];

interface CalculatorCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  tag: string;
  tagColor: string;
  accentColor: string;
}

const calculators: CalculatorCard[] = [
  {
    title: 'Tank Dimensions',
    description:
      'Calculate vertical conical-bottom tank geometry — cylinder height, total height, H/D ratio with interactive 2D profile drawing.',
    icon: <PropaneTankIcon sx={{ fontSize: 26 }} />,
    link: '/tank-calculator',
    tag: 'Geometry',
    tagColor: '#0072CE',
    accentColor: '#0072CE',
  },
  {
    title: 'Friction Loss',
    description:
      'Darcy-Weisbach pipe friction with Swamee-Jain friction factor. Includes major, minor (K-method), elevation, and additional losses.',
    icon: <StraightenIcon sx={{ fontSize: 26 }} />,
    link: '/friction-loss',
    tag: 'Hydraulics',
    tagColor: '#7C3AED',
    accentColor: '#7C3AED',
  },
  {
    title: 'Fluid Velocity',
    description:
      'Convert flow rate to velocity for any pipe diameter. Includes CIP velocity range indicator (5–7 ft/s) for sanitary validation.',
    icon: <SpeedIcon sx={{ fontSize: 26 }} />,
    link: '/fluid-velocity',
    tag: 'Flow',
    tagColor: '#00A859',
    accentColor: '#00A859',
  },
  {
    title: 'NPSH Available',
    description:
      'Verify suction conditions and prevent pump cavitation. Full breakdown of atmospheric, static, friction, and vapor pressure heads.',
    icon: <OpacityIcon sx={{ fontSize: 26 }} />,
    link: '/npsh-calculator',
    tag: 'Pump',
    tagColor: '#E65100',
    accentColor: '#E65100',
  },
];

const features = [
  {
    icon: <BoltIcon sx={{ fontSize: 20, color: '#0072CE' }} />,
    title: 'Instant results',
    description: 'Real-time calculations as you type',
  },
  {
    icon: <SyncAltIcon sx={{ fontSize: 20, color: '#00A859' }} />,
    title: 'Metric & Imperial',
    description: 'Switch units with one click',
  },
  {
    icon: <CalculateIcon sx={{ fontSize: 20, color: '#7C3AED' }} />,
    title: 'Industry formulas',
    description: 'Darcy-Weisbach, Swamee-Jain, NPSHa',
  },
  {
    icon: <VerifiedIcon sx={{ fontSize: 20, color: '#E65100' }} />,
    title: 'Sanitary standards',
    description: 'Built for 3-A & ASME BPE',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section — full background image carousel */}
      <Stack
        sx={{
          position: 'relative',
          color: '#fff',
          py: { xs: 6, md: 9 },
          minHeight: { xs: 400, md: 480 },
          display: 'flex',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Auto-cycling background images */}
        <HeroBackground
          images={productSlides.map((s) => s.src)}
          intervalMs={6000}
        />

        {/* Dark overlay for text readability */}
        <Stack
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(0,50,102,0.88) 0%, rgba(0,79,143,0.75) 50%, rgba(0,40,80,0.82) 100%)',
            zIndex: 1,
          }}
        />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <FadeIn duration={0.6}>
            <Stack alignItems="center" textAlign="center">
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
                <img
                  src="/Jetequip-Couleur-Sans-Mention.png"
                  alt="Jetequip"
                  style={{ height: 40, objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.9 }}
                />
                <Chip
                  label="Process Solutions"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.15)',
                    color: 'rgba(255,255,255,0.9)',
                    fontWeight: 600,
                    fontSize: '0.72rem',
                    backdropFilter: 'blur(4px)',
                    height: 28,
                  }}
                />
              </Stack>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
                  lineHeight: 1.15,
                  mb: 2,
                  maxWidth: 640,
                }}
              >
                Engineering Calculators for Process Engineers
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  maxWidth: 520,
                  mb: 3.5,
                  fontSize: { xs: '0.9rem', md: '1.05rem' },
                  lineHeight: 1.6,
                }}
              >
                Free, accurate tools for pipe sizing, tank design, friction loss, and pump suction analysis — purpose-built for sanitary and aseptic processing.
              </Typography>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Button
                  variant="contained"
                  href="#calculators"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    bgcolor: '#00A859',
                    fontWeight: 700,
                    px: 3.5,
                    py: 1.3,
                    fontSize: '0.95rem',
                    '&:hover': {
                      bgcolor: '#00753E',
                      boxShadow: '0 4px 14px rgba(0, 168, 89, 0.4)',
                    },
                  }}
                >
                  Get started
                </Button>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
                  4 calculators available
                </Typography>
              </Stack>
            </Stack>
          </FadeIn>
        </Container>
      </Stack>

      {/* Features strip */}
      <Stack
        sx={{
          bgcolor: '#fff',
          borderBottom: '1px solid',
          borderColor: 'divider',
          py: { xs: 2.5, md: 3 },
        }}
      >
        <Container maxWidth="md">
          <FadeInView delay={0.1}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {features.map((f) => (
                <Grid item xs={6} md={3} key={f.title}>
                  <Stack direction="row" alignItems="flex-start" spacing={1.25}>
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 0,
                        bgcolor: alpha((f.icon as React.ReactElement).props.sx.color, 0.08),
                        flexShrink: 0,
                      }}
                    >
                      {f.icon}
                    </Stack>
                    <Stack>
                      <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.8rem', lineHeight: 1.3 }}>
                        {f.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem', lineHeight: 1.4 }}>
                        {f.description}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </FadeInView>
        </Container>
      </Stack>

      {/* Calculator Cards */}
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }} id="calculators">
        <FadeInView>
          <Stack sx={{ mb: { xs: 3, md: 4 } }}>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ fontSize: { xs: '1.2rem', md: '1.4rem' }, mb: 0.5 }}
            >
              Choose a calculator
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Select a tool below to start computing.
            </Typography>
          </Stack>
        </FadeInView>

        <StaggerContainer>
          <Grid container spacing={2.5}>
            {calculators.map((calc) => (
              <Grid item xs={12} sm={6} key={calc.link}>
                <StaggerItem>
                  <Link href={calc.link} passHref style={{ textDecoration: 'none' }}>
                    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2, ease: 'easeOut' }}>
                      <Card
                        variant="outlined"
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          cursor: 'pointer',
                          overflow: 'visible',
                          position: 'relative',
                        }}
                      >
                        {/* Colored top accent */}
                        <Stack
                          sx={{
                            height: 4,
                            borderRadius: 0,
                            bgcolor: calc.accentColor,
                            mx: -0.125,
                            mt: -0.125,
                          }}
                        />
                        <CardContent sx={{ flex: 1, p: { xs: 2.5, sm: 3 }, pt: { xs: 2, sm: 2.5 } }}>
                          <Stack direction="row" alignItems="flex-start" spacing={1.5} sx={{ mb: 1.5 }}>
                            <Stack
                              alignItems="center"
                              justifyContent="center"
                              sx={{
                                width: 44,
                                height: 44,
                                borderRadius: 0,
                                bgcolor: alpha(calc.accentColor, 0.1),
                                color: calc.accentColor,
                                flexShrink: 0,
                              }}
                            >
                              {calc.icon}
                            </Stack>
                            <Stack sx={{ flex: 1, minWidth: 0 }}>
                              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.25 }}>
                                <Typography variant="subtitle1" component="h2" fontWeight={700} sx={{ fontSize: '1rem' }}>
                                  {calc.title}
                                </Typography>
                                <Chip
                                  label={calc.tag}
                                  size="small"
                                  sx={{
                                    height: 20,
                                    fontSize: '0.65rem',
                                    fontWeight: 600,
                                    bgcolor: alpha(calc.tagColor, 0.08),
                                    color: calc.tagColor,
                                  }}
                                />
                              </Stack>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontSize: '0.8rem', lineHeight: 1.55 }}
                              >
                                {calc.description}
                              </Typography>
                            </Stack>
                          </Stack>
                          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 1 }}>
                            <Button
                              variant="text"
                              size="small"
                              endIcon={<ArrowForwardIcon sx={{ fontSize: '14px !important' }} />}
                              sx={{
                                fontSize: '0.8rem',
                                color: calc.accentColor,
                                fontWeight: 600,
                                '&:hover': { bgcolor: alpha(calc.accentColor, 0.06) },
                              }}
                            >
                              Open
                            </Button>
                          </Stack>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Link>
                </StaggerItem>
              </Grid>
            ))}
          </Grid>
        </StaggerContainer>
      </Container>

      {/* Product Carousel */}
      <Stack sx={{ bgcolor: '#F8FAFC', py: { xs: 4, md: 6 }, borderTop: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="md">
          <FadeInView>
            <Stack sx={{ mb: { xs: 3, md: 4 }, textAlign: 'center' }}>
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ fontSize: { xs: '1.2rem', md: '1.4rem' }, mb: 0.5 }}
              >
                Built for Sanitary Process Equipment
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
                Our calculators are designed to support the engineering behind Jetequip's sanitary and aseptic process solutions.
              </Typography>
            </Stack>
          </FadeInView>

          <FadeInView delay={0.1}>
            <ImageCarousel
              slides={productSlides}
              autoPlayMs={5000}
              height={{ xs: 280, md: 400 }}
            />
          </FadeInView>
        </Container>
      </Stack>

      {/* Contact Jetequip CTA — prominent section */}
      <Stack
        sx={{
          background: 'linear-gradient(135deg, #E65100 0%, #BF360C 100%)',
          py: { xs: 5, md: 7 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative shapes */}
        <Stack
          sx={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 200,
            height: 200,
            background: 'rgba(255,255,255,0.06)',
            transform: 'rotate(45deg)',
          }}
        />
        <Stack
          sx={{
            position: 'absolute',
            bottom: -30,
            left: '20%',
            width: 150,
            height: 150,
            background: 'rgba(255,255,255,0.04)',
            transform: 'rotate(20deg)',
          }}
        />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <FadeInView>
            <Stack alignItems="center" textAlign="center" spacing={3}>
              <Typography
                variant="h4"
                fontWeight={800}
                sx={{
                  color: '#fff',
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.15rem' },
                  lineHeight: 1.2,
                }}
              >
                Need Custom Process Solutions?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  maxWidth: 520,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  lineHeight: 1.7,
                }}
              >
                Jetequip designs and fabricates sanitary process equipment for food, beverage, dairy, pharmaceutical, and biotech industries. Let our team help you with your next project.
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                alignItems="center"
              >
                <Button
                  variant="contained"
                  size="large"
                  href="https://jetequip.com/en/joindre/"
                  target="_blank"
                  rel="noopener noreferrer"
                  endIcon={<OpenInNewIcon sx={{ fontSize: '16px !important' }} />}
                  sx={{
                    bgcolor: '#fff',
                    color: '#E65100',
                    fontWeight: 700,
                    px: 4,
                    py: 1.3,
                    fontSize: '0.95rem',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.92)',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  Contact Jetequip
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  href="https://jetequip.com/en/produits/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.5)',
                    color: '#fff',
                    fontWeight: 600,
                    px: 3,
                    py: 1.2,
                    fontSize: '0.9rem',
                    '&:hover': {
                      borderColor: '#fff',
                      bgcolor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  View Products
                </Button>
              </Stack>
            </Stack>
          </FadeInView>
        </Container>
      </Stack>
    </>
  );
}
