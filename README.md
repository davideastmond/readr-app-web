# Readr Newsreader Web App

## About

Newsreader web app (Front end) using React. It pulls news data from `newsApi` API service. This project also has a backend [Readr-Backend](https://github.com/davideastmond/readr-app-api). Live deploy at [readr.live](https://www.readr.live)

### Features

1. User accounts (registration, sign-in, sign-out)
2. View latest headlines
3. Bookmark articles for later reading
4. Customize news sources
5. Create a custom feed using keywords.

## Setup

0. After cloning the project and running `npm i` to install dependencies:

1. Create a `'.env` file in the root of the project. Use the `env.sample` file included in this project as a guide.

2. Create an app DEV API_KEY that you will use internally to communicate with the back-end. (UUID is suggested).

3. Configure the dev API_URL and populate the field in the `.env` (localhost:5000 is default)

4. Run the project back-end (refer to the link above) and run `npm run dev` to start the project

5. Once the app is launched, register for an account, sign in, or simply view the latest headlines by clicking the link.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
