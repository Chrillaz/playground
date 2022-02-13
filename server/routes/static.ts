import express, { Application } from 'express';

export const staticRouter = (path: string, app: Application) => {

    app.use(express.static( path ))

    app.get('/', (req, res) => {
        res.sendFile('/index.html');
    })

    return app;
}
