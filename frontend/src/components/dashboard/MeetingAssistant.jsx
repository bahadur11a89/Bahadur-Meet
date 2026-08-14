import React from 'react';
import { Box, Typography, Stack, Accordion, AccordionSummary, AccordionDetails, TextField, InputAdornment, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SendIcon from '@mui/icons-material/Send';
import styles from './MeetingAssistant.module.css';

const sections = [
  { title: 'Meeting Summary', icon: <AutoAwesomeIcon />, content: 'The team discussed Q4 goals and decided to focus on mobile app performance.' },
  { title: 'Action Items', icon: <TaskAltIcon />, content: 'Alice to draft the new API spec. Bob to review the mobile UI mockups.' },
  { title: 'Key Decisions', icon: <TaskAltIcon />, content: 'Approved the budget for the new marketing campaign.' },
];

const MeetingAssistant = () => {
  return (
    <Stack className={styles.panelContainer}>
      <Box className={styles.panelHeader}>
        <SmartToyOutlinedIcon />
        <Typography variant="h6" sx={{ fontWeight: 'bold', ml: 1 }}>
          AI Assistant
        </Typography>
      </Box>
      <Stack className={styles.listContainer}>
        {sections.map((section, index) => (
          <Accordion key={index} defaultExpanded sx={{ backgroundImage: 'none', boxShadow: 'none', bgcolor: 'transparent' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {section.icon}
              <Typography sx={{ ml: 1, fontWeight: 'medium' }}>{section.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">{section.content}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
      <Box sx={{ p: 2, borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Ask AI Assistant..."
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton color="primary"><SendIcon /></IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Stack>
  );
};

export default MeetingAssistant;