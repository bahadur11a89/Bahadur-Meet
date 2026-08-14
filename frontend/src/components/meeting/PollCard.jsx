import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Stack, LinearProgress } from '@mui/material';
import styles from './PollCard.module.css';

const PollCard = ({ poll }) => {
  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <Card variant="outlined" className={styles.pollCard}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{poll.question}</Typography>
          <Chip label={poll.status} color={poll.status === 'Active' ? 'success' : 'default'} size="small" />
        </Stack>
        <Stack spacing={2}>
          {poll.options.map((option, index) => {
            const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
            return (
              <Box key={index}>
                <Stack direction="row" justifyContent="space-between" mb={0.5}>
                  <Typography variant="body2">{option.text}</Typography>
                  <Typography variant="body2" color="text.secondary">{option.votes} votes</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={percentage} />
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PollCard;