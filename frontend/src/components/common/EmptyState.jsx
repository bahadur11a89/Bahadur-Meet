import React from 'react';
import StateDisplay from './states/StateDisplay';
import { Inbox } from '@mui/icons-material';

const EmptyState = React.memo(({
    icon,
    title = 'No Data',
    description = 'There is nothing to show here right now.',
    primaryAction,
    secondaryAction,
}) => {
    return (
        <StateDisplay
            icon={icon || <Inbox />}
            title={title}
            description={description}
            primaryAction={primaryAction}
            secondaryAction={secondaryAction}
        />
    );
});

export default EmptyState;