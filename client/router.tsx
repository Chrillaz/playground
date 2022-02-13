import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('@/pages/home'));

function Router() {
    
    return(
        <Suspense fallback="loading...">
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Suspense>
    )
}

export {
    Router
}