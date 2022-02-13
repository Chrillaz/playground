import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Router } from '@/router';
import './index.css';

function App() {
    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    )
}

ReactDom.render(<App />, document.getElementById('app'));