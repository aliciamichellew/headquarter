import { Skeleton, Stack } from '@mui/material';
import React from 'react';

const ChatLoading = () => {
    return (
        <Stack>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
        </Stack>
    );
}

export default ChatLoading;