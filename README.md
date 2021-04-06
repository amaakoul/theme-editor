# Theme Editor

A theme editor web application that allows the user to change the UI configuration and save it in the local storage.

## Tools used to build the App

React 17.
Redux : State management tool to sync the global data across the application.

NextJS : Web framework, also used as an API to serve the theme config as static JSON.

Jest, Enzyme, react-test-renderer : Testing framework.

Eslint, Prettier : Code styling.

Material-ui : UI.

## Getting Started

run the development server :

```bash
npm run dev

```

run tests :

```bash
npm run test

```

run test with watcher :

```bash
npm run test:dev

```

Please check scripts in package.json for the rest

[API routes] can be accessed on [http://localhost:3000/api/theme-schema].

## Features of the App

Load the default configuration as an API Endpoint
Edit the theme configuration
Validate the fields (Enter Key press, Button press)
Save the edited theme to locale storage

## Bonus Features
Field validation after 5000ms of inactivity
Enter the user name and save it alongside the theme in the local storage
change the app color theme between (Red or White)
