If you wish to read this document in Finnish, click [here](README_FI.md).

# reaktor-kesatyo-2018

This is a weather app made as a preparatory task for a summer job application to Reaktor.

This README describes the application in broad strokes. If you want more exact information about how the technical implementation has been achieved, see [DOC.md](DOC.md) (Only available in Finnish).

## Structure

```
|
├── bin/ - Development binaries
│   └── rethinkdb.exe - RethinkDB binary for development use
|
├── client/ - React web app
│   ├── assets/ - Images and CSS
│   ├── components/ - React components
|   ├── layouts/ - UI layouts
|   ├── system/ - Backend code
│   ├── App.jsx - Application root
│   ├── config.example.js - Client-side configuration file (Example)
│   ├── index.html - HTML entry point
│   └── index.jsx - Application renderer
|
├── server/ - Express API for data stroage
│   ├── db/ - Database engine
│   ├── routes/ - API routes
│   ├── .env.example - Environment variables for production (Example)
│   └── api.js - API root
```

## Scripts

Before starting, make sure you have completed the following steps:

- Cloned this repository with **git clone https://github.com/linuswillner/reaktor-kesatyo-2018**
- Created **server/.env** and **client/config.js** based on their examples

**npm start**: Starts the Webpack dev server, after which the application is visible at http://localhost:8000.

**npm run start-api**: Starts the RethinkDB binary (Dev) and then the REST API. These can be inspected and tried with for instance Postman (https://getpostman.com) (API, http://localhost:8010) and the RethinkDB web interface (http://localhost:8080).

**Note:** It is imperative that the API is started before the web app is started, otherwise the app will not display information before the API can respond. Remember to create a database named **Weather** and add a table named **Observations** to it as well.

## Technologies used

As a base, a traditional React application is used (React DOM, Babel, Webpack).

The user interface of this project is based on Google's Material design and uses the material-ui component library (http://material-ui.com). The UI also uses Bootstrap's grid system (https://npmjs.com/package/react-grid-system).

This project uses the Standard style guide (https://standardjs.com) and ESLint (https://eslint.org).

RethinkDB (https://rethinkdb.com) is used for data storage, and client-server communication is done with Express.js (https://expressjs.com).
