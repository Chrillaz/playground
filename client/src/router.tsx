import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader } from '@components';

const Home = lazy(() => import('@routes/home'));

export function Router() {
    
    return(
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Suspense>
    )
}