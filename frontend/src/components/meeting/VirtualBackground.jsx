import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    Chip,
    Button
} from '@mui/material';
import { Add, BlurOn, CheckCircle } from '@mui/icons-material';
import styles from './VirtualBackground.module.css';

const backgrounds = [
    { id: 'blur', name: 'Blur', image: '/images/backgrounds/blur-thumb.jpg', icon: <BlurOn /> },
    { id: 'office1', name: 'Modern Office', image: 'https://via.placeholder.com/200x113/81d4fa/ffffff?text=Office' },
    { id: 'meeting_room', name: 'Meeting Room', image: 'https://via.placeholder.com/200x113/80cbc4/ffffff?text=Meeting' },
    { id: 'nature', name: 'Nature', image: 'https://via.placeholder.com/200x113/a5d6a7/ffffff?text=Nature' },
];

const VirtualBackground = () => {
    const [selected, setSelected] = useState('blur');

    return (
        <Box className={styles.container}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Virtual Background
            </Typography>
            <Grid container spacing={2}>
                {backgrounds.map(bg => (
                    <Grid item xs={6} sm={4} md={3} key={bg.id}>
                        <Card
                            className={`${styles.bgCard} ${selected === bg.id ? styles.selectedCard : ''}`}
                            variant="outlined"
                        >
                            <CardActionArea onClick={() => setSelected(bg.id)}>
                                <CardMedia
                                    component="div"
                                    className={styles.cardMedia}
                                    style={{ backgroundColor: '#e0e0e0' }}
                                >
                                    {bg.icon ? (
                                        <BlurOn className={styles.blurIcon} />
                                    ) : (
                                        <img src={bg.image} alt={bg.name} className={styles.bgImage} />
                                    )}
                                </CardMedia>
                                {selected === bg.id && (
                                    <Chip
                                        icon={<CheckCircle />}
                                        label="Selected"
                                        size="small"
                                        color="primary"
                                        className={styles.selectedChip}
                                    />
                                )}
                            </CardActionArea>
                        </Card>
                        <Typography variant="caption" display="block" textAlign="center" mt={0.5}>
                            {bg.name}
                        </Typography>
                    </Grid>
                ))}
                <Grid item xs={6} sm={4} md={3}>
                    <Button variant="outlined" className={styles.addButton} fullWidth>
                        <Add />
                        Add Image
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default React.memo(VirtualBackground);