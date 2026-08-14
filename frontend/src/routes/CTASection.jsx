import React from 'react';
import { Box, Typography, Button, Container, Stack, useTheme } from '@mui/material';

const CTASection = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: `radial-gradient(circle, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          component="h2"
          sx={{ fontWeight: 700, mb: 4 }}
        >
          Ready to start your next meeting?
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ py: 1.5, color: 'black' }}
          >
            Start for Free
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              py: 1.5,
              color: 'white',
              borderColor: 'white',
              '&:hover': { borderColor: theme.palette.secondary.main, color: theme.palette.secondary.main },
            }}
          >
            Contact Sales
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default CTASection;