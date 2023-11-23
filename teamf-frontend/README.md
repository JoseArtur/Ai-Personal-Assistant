# teamf-frontend

This guide will walk you through the steps required to set up the TeamF frontend for React.
Follow these instructions to run the front-end of the app.

## Prerequisites

Before you begin, please ensure that you have the following prerequisites:

1. Node v18+

## Setup

1. Install the dependencies:

```bash
# For npm
npm install

# For yarn
yarn install
```

2. Run the project

```bash
# For npm
npm start

# For yarn
yarn start
```

## State Manager Structure

We have two folders as explained bellow. <br/>
The main idea is to create a folder for each state manager we need in the stores folder. For example, if we add a state manager to control the login, we can add a folder called login.

### Directories

-   src/plugins: contains the configuration for the plugin configurations, we can add axios, or another plugin for example. <br/>

    -   stores.ts: Contain the base configuration for the redux. We add new reducers there.

-   src/stores: contains the files to deal with the states.
    -   user: contain two files, userReducer.ts which contains the main logic to control the states of the user, and the userActions.ts, which contains the api call or another actions related to this specific reducer.

You can look into the demo component mounted in the App.tsx to understand better about the states.

It renders the Menu and the UserList. If you select a user, the name will be loaded in the Menu.
