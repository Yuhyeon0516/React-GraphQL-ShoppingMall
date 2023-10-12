import React, { Suspense } from 'react';
import { QueryClientProvider } from 'react-query';
import { Outlet } from 'react-router-dom';
import { getClient } from '../utils/queryClient';
import { ReactQueryDevtools } from 'react-query/devtools';
import Gnb from '../components/gnb';
import { RecoilRoot } from 'recoil';

const Layout: React.FC = () => {
    const client = getClient();

    return (
        <RecoilRoot>
            <QueryClientProvider client={client}>
                <ReactQueryDevtools initialIsOpen={false} />
                <Gnb />
                <Suspense fallback={'loading....'}>
                    <Outlet />
                </Suspense>
            </QueryClientProvider>
        </RecoilRoot>
    );
};

export default Layout;
