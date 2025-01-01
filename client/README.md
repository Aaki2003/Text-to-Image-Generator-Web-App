# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


First made frontend after that backend

For handling frontend 
    Client folder
        |- Assets
        |- components
            |- all comonents of the pages
        |- Pages
            |- all pages of the website
        |- Context
            |-for handling user login
    

    Server folder
        |- .env file for mongodb url
        |- config folder mongodb config and connection
            |-file for mongodb handling
        |- server.js
            |-made a express app and connected the database
        |-models
            |- user schema validation and storage in       database
