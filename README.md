# Theme Editor

A theme editor web application that allows the user to change the UI configuration and save it in the local storage.

## Tools used to build the App

React 17.

Redux : State management tool to sync the global data across the application.

NextJS : Server Side framework, used as an API to serve the theme config as static JSON [http://localhost:3000/api/theme-schema].

Jest, Enzyme, react-test-renderer : Testing frameworks.

Eslint, Prettier : Code styling.

Material-ui : UI.

## Features of the App

Load the default configuration as an API Endpoint.

Edit the theme configuration.

Validate the fields (Enter Key press, Button press).

Show Errors when fields are not valid.

Save the edited theme to locale storage.

## Bonus Features

Field validation after 5000ms of inactivity.

Enter the user name and save it alongside the theme in the local storage.

change the app color theme between (Red or White).

toast notification to keep the user informed after actions.

A Delete button for all saved data in local storage.

## Getting Started

Install dependecies with your fav package manager (YARN, NPM).

```bash
npm install

```
Should work with all node versions from (10v > 14v).
troubleshooting : If you face any issues use NVM to switch to one of the following tested NodeJS versions : ```v10.13.0, v12.13.0, v14.15.0```
npm version : 6.12.0 || 6.4.1
or contact me @ makoul.ahmed@gmail.com

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
