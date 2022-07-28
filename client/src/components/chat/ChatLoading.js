import { Skeleton, Stack } from '@mui/material';
import React from 'react';

const ChatLoading = () => {
    return (
        <Stack>
            <Skeleton variant="text" width={215} height={30}/>
            <Skeleton variant="text" width={215} height={30}/>
            <Skeleton variant="text" width={215} height={30}/>
            <Skeleton variant="text" width={215} height={30}/>
            <Skeleton variant="text" width={215} height={30}/>
            <Skeleton variant="text" width={215} height={30}/>
            <Skeleton variant="text" width={215} height={30}/>
            <Skeleton variant="text" width={215} height={30}/>
            <Skeleton variant="text" width={215} height={30}/>
            <Skeleton variant="text" width={215} height={30}/> 
        </Stack>
    );
}

export default ChatLoading;