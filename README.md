# Ai-Personal-Assistant


# teamf-frontend

This guide will walk you through the steps required to set up the frontend for React.
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

It have two folders as explained bellow. <br/>
The main idea is to create a folder for each state manager we need in the stores folder. For example, if we add a state manager to control the login, we can add a folder called login.

### Directories

-   src/plugins: contains the configuration for the plugin configurations, we can add axios, or another plugin for example. <br/>

    -   stores.ts: Contain the base configuration for the redux. We add new reducers there.

-   src/stores: contains the files to deal with the states.
    -   user: contain two files, userReducer.ts which contains the main logic to control the states of the user, and the userActions.ts, which contains the api call or another actions related to this specific reducer.

You can look into the demo component mounted in the App.tsx to understand better about the states.

It renders the Menu and the UserList. If you select a user, the name will be loaded in the Menu.

# Backend Setup Guide

This guide will walk you through the steps required to set up the backend for Python. Follow these instructions to create and configure your environment for running the server.

## Prerequisites

Before you begin, please ensure that you have the following prerequisites:

1. **Python 3**: This guide assumes that you are using Python 3. If you have both Python 2 and Python 3 installed, make sure to use `python3` in the commands below.

2. **Pip3**: Similarly, if you have both `pip` and `pip3` installed, make sure to use `pip3` in the commands for package installation.


## Step 1: Create and Activate a Virtual Environment

First,  create a virtual environment to isolate the project dependencies:

```bash
# Create a virtual environment in the .venv directory
python3 -m venv .venv

# Activate the virtual environment
source .venv/bin/activate
```

By activating the virtual environment, you ensure that you are working with a clean environment specific to your project.

## Step 2: Create a Configuration File
In your project directory, create a configuration file (.env) for storing environment-specific variables. Use the following commands:

```bash
# Create the .env file
touch .env
```

Open the .env file with a text editor and add the necessary configuration values:

```bash
# .env

FLASK_RUN_HOST=localhost
FLASK_RUN_PORT=8080

# Change the values of these:

DB_USER=username
DB_PASSWORD=userpassword
DB_CLUSTER=cluster

```

Replace username, userpassword, and cluster with the actual values needed to connect to your database.


## Step 3: Install Dependencies
To install the required dependencies for the project, run the following command after using the venv:
First use the pip or pip3 to install the [poetry](https://python-poetry.org/).
```bash
pip3 install poetry 
```

Then install the dependencies:
```bash
poetry install --no-root
```
To add a new dependency use:
```bash
poetry add dependencyname
```

If something not work with poetry you can install from the requirements.txt but don't forget to add the new dependencies there after install them. (this will be removed when everything run poetry successfuly)
```bash
pip3 install -r requirements.txt
```
This will install all the Python packages listed in the requirements.txt file.

## Step 4: Run the Server

```bash
# Run the server
flask run

# Or, to run the server in debug mode
flask run --debug
```

Running the server in debug mode allows you to see detailed error messages and automatically restarts the server when you make changes to your code.

Your app should now be up and running!


