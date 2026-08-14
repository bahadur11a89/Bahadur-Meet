import React from 'react';
import { Card, CardContent, Typography, Stack, Button, Avatar, Box, Grid } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const AvatarSection = () => {
  return (
    <Card variant="outlined" sx={{ borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>Avatar</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center">
          <Avatar alt="Max Mustermann" src="/static/images/avatar/1.jpg" sx={{ width: 150, height: 150 }} />
          <Stack spacing={1}>
            <Button variant="contained" startIcon={<UploadFileIcon />}>Upload New</Button>
            <Button variant="outlined" color="error" startIcon={<DeleteOutlineIcon />}>Remove</Button>
          </Stack>
        </Stack>
        <Typography variant="subtitle1" sx={{ fontWeight: 'medium', mt: 3 }}>Or select from gallery</Typography>
        <Grid container spacing={1} mt={1}>
          {[...Array(4)].map((_, i) => (
            <Grid item key={i}>
              <Avatar src={`/static/images/avatar/${i + 2}.jpg`} sx={{ cursor: 'pointer' }} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AvatarSection;