import React, { Suspense } from 'react';
import { QueryClientProvider } from 'react-query';
import { Outlet } from 'react-router-dom';
import { getClient } from '../utils/queryClient';
import { ReactQueryDevtools } from 'react-query/devtools';

const Layout: React.FC = () => {
    const client = getClient();

    return (
        <QueryClientProvider client={client}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Suspense fallback={'loading....'}>
                <Outlet />
            </Suspense>
        </QueryClientProvider>
    );
};

export default Layout;
