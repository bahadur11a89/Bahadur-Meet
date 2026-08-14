import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  useTheme,
} from '@mui/material';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    avatar: 'A',
    name: 'Alice Johnson',
    role: 'CEO, TechCorp',
    rating: 5,
    quote: 'This platform has revolutionized how our remote teams collaborate. It\'s seamless and reliable.',
  },
  {
    avatar: 'B',
    name: 'Bob Williams',
    role: 'Project Manager, Innovate LLC',
    rating: 5,
    quote: 'The AI features are a game-changer for productivity. Meeting summaries save us hours each week.',
  },
  {
    avatar: 'C',
    name: 'Charlie Brown',
    role: 'Educator, FutureLearn Academy',
    rating: 4.5,
    quote: 'Breakout rooms and whiteboards are perfect for our virtual classrooms. Highly recommended for education.',
  },
  {
    avatar: 'D',
    name: 'Diana Miller',
    role: 'Marketing Director, Creative Co.',
    rating: 5,
    quote: 'We host all our client webinars here. The quality is outstanding and it\'s so easy to use.',
  },
  {
    avatar: 'E',
    name: 'Ethan Davis',
    role: 'Lead Developer, CodeStack',
    rating: 5,
    quote: 'The security features give us peace of mind when discussing sensitive projects. A must-have tool.',
  },
  {
    avatar: 'F',
    name: 'Fiona Garcia',
    role: 'HR Manager, PeopleFirst',
    rating: 4.5,
    quote: 'Onboarding new remote hires has never been easier. The platform is intuitive and user-friendly.',
  },
];

const Testimonials = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          sx={{ fontWeight: 700, mb: 8 }}
        >
          Loved by teams everywhere
        </Typography>

        <Grid container spacing={4}>
          {testimonials.map((testimonial) => (
            <Grid item xs={12} md={6} lg={4} key={testimonial.name}>
              <Card className={styles.testimonialCard}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: theme.palette.secondary.main, mr: 2 }}>
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                  <Rating value={testimonial.rating} precision={0.5} readOnly sx={{ mb: 1 }} />
                  <Typography variant="body1" color="text.secondary">
                    "{testimonial.quote}"
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;