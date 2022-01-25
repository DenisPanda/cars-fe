# CARS-FE

Cars app written in Angular 13.1.0 + Angular Material Design with theming.
Deployed app [DEMO](https://cars-d27b5.web.app/login)



# Build/run commands
Everything you need to run the app

## NPM install
Install packages like any other js app. There is a 'postinstall' script defined which will compile the code after all packages are installed (into dist folder)

    npm install


## Start
Start app on port 4571

    npm run start

## Build
Build app for different environments:

Production build:

    npm run build:main

Staging build:

    npm run build:main

Production build:

    npm run build:main


## Deploy
Deploy to Firebase:

    npm run deploy




# File structure

App folder structure isn't done. Needs a code refactor. All src code should be migrated into a dedicated src folder.

## Enums
All app enums in one place.

Location: 

    src/app/enums
    
## Dialogs
All dialogs

Location: 

    src/app/dialogs

## Interceptors
Currently only one, for JWT tokens.

Location:

    src/app/interceptors

## Main pages / modules
Main modules which are dedicated pages. All main modules should be lazy loaded.
Main modules have almost the same structure as the root of the app. Everything inside dedicated modules should **only be used** in the dedicated modules. If there is a need to reuse a dedicated module file, please move it up to the shared map.

Location:

    src/app/cars
    src/app/login



## Shared
Shared modules (currently only layout)

Location:

    src/app/shared

## Typings
App specific typings and types

Location:

    src/app/types

## Utils
Util functions.

Location:

    src/app/utils.ts

## Assets
SCSS util functions, styles.

Location:

    src/app/assets

    
## Services
Global services used through the whole app.

Location:

    src/app/services



# Features

 - CircleCI CI/CD implementation. The app is built with the appropriate configuration depending on which branch the code is pushed. (Currently everything is deployed to the same hosting domain)
 - Login / store session. (With kewl animations)
 - Angular Material.
 - Deployment to Firebase.
 - Dark/light theming.
 - Karma test runner with Mocha tests (basic, no actual tests instead of the autogenerated ones are implemented)
 - Get vehicles (sorting, pagination, search)
 - Create vehicle with error messaging (server side validation)
 - Spinners
 - Responsive design (maybe a media query or two is needed depending on the mobile screen size)

# TODOS
 - Add tests
 - Add analytics like HotJar or/and Google analytics
 - Create autocomplete control
 - Add error monitoring
 - Prevent deployment to main if tests fail
