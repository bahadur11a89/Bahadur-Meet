import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  useTheme,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import styles from './PricingPreview.module.css';

const plans = [
  {
    title: 'Basic',
    price: '$0',
    user: 'Free forever',
    features: ['Up to 40 min meetings', '100 attendees', 'Team Chat'],
    highlight: false,
  },
  {
    title: 'Pro',
    price: '$15.99',
    user: '/user/month',
    features: ['No meeting time limits', '250 attendees', 'Cloud Recording (5GB)'],
    highlight: true,
  },
  {
    title: 'Business',
    price: '$19.99',
    user: '/user/month',
    features: ['All Pro features', '300 attendees', 'Company Branding'],
    highlight: false,
  },
  {
    title: 'Enterprise',
    price: 'Contact Us',
    user: 'For large organizations',
    features: ['All Business features', '1000+ attendees', 'Unlimited Cloud'],
    highlight: false,
  },
];

const PricingPreview = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          sx={{ fontWeight: 700, mb: 8 }}
        >
          Choose your plan
        </Typography>

        <Grid container spacing={4} alignItems="flex-end">
          {plans.map((plan) => (
            <Grid item xs={12} sm={6} md={3} key={plan.title}>
              <Card
                className={styles.pricingCard}
                sx={{
                  border: plan.highlight ? `2px solid ${theme.palette.primary.main}` : 'none',
                  transform: plan.highlight ? 'scale(1.05)' : 'none',
                }}
              >
                <CardHeader
                  title={plan.title}
                  subheader={plan.user}
                  action={
                    plan.highlight && <Chip label="Most Popular" color="primary" />
                  }
                  titleTypographyProps={{ align: 'center', variant: 'h5', fontWeight: 600 }}
                  subheaderTypographyProps={{ align: 'center' }}
                  sx={{ backgroundColor: theme.palette.grey[100] }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h4" color="text.primary">
                      {plan.price}
                    </Typography>
                  </Box>
                  <List>
                    {plan.features.map((line) => (
                      <ListItem key={line} disableGutters>
                        <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                          <CheckIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={line} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant={plan.highlight ? 'contained' : 'outlined'}
                    color="primary"
                  >
                    Get Started
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default PricingPreview;