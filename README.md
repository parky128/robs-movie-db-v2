# Robs Movie Database v2 (RMDb)

This is a new version of the original [Robs Movie Database](https://github.com/parky128/robs-movie-db) updated to use latest Angular and Angular Material dependencies.

## Key Features:
- Search for Actors, Actresses, Movies and TV Shows
- Advanced search feature for more custom search types 
  - Note that you can currently search for movies staring chosen actors, actresses, genres and release dates, more criteria options are planned for a future release!
- Internationalisation support for both English and German
  - DISCLAIMER: German translation came from Google Translate so if there are any mistakes then please raise an issue on this repo and I will sort asap!

## Known Issues

Refer to the Issues list to see what problems have been acknowledged so far and plan to be worked on.

A project board has been setup to track the status of issues [here](https://github.com/users/parky128/projects/1/views/1?layout=board)

## Getting Started

After cloning this repo locally, make sure to install required dependencies with `npm install`

**NOTE:** Please check you have nodejs installed with `node -v` in your terminal, you should see the nodejs version number installed printed after entering this command, if you don't you probably need nodejs installed. I recommend to use [node version manager](https://github.com/nvm-sh/nvm), and for this version of angular I am using nodejs version `18.12.1`

## Running Locally

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Existing Jasmine tests to be migrated to Jest, see [this issue](https://github.com/parky128/robs-movie-db-v2/issues/3)

## Running end-to-end tests

Existing Protractor test scenarios to be migrated to Cypress, see [this issue](https://github.com/parky128/robs-movie-db-v2/issues/4)

## Contributing

Feel free to open a Pull Request with any suggested changes, or raise an issue for triaging
