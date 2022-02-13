import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader } from '@components';

const Home = lazy(() => import('@/pages/home'));

function Router() {
    
    return(
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Suspense>
    )
}

export {
    Router
}