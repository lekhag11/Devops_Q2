# Aquagen Web Dashboard

Water management solution for making industries water positive

<br>

# Table of Content

-   [Technologies Used](#technologies-used)
-   [Coding Standards](#coding-standards)
-   [IDE Setup](#ide-setup)
-   [Project Setup](#project-setup)
-   [TODO](#todo)

<br>

# Technologies Used

-   ReactJs
-   Material UI (MUI)
-   Node Package Manager
-   Moment JS [Documentation](https://momentjs.com/)

```
Different Date Formats of Dates with Example

'@param {Date}' - 'moment date object'.

'YYYY-MM-DD' - '2023-09-11'.

'MM/DD/YYYY' - '09/11/2023'.

'DD-MM-YYYY' - '11-09-2023'.

'YYYY/MM/DD' - '2023/09/11'.

'MMMM D, YYYY' - 'September 11, 2023'.

'D MMM, YYYY' -  '11 Sep, 2023'.

'ddd, MMM D, YYYY' -'Sun, September 11, 2023'.

'YYYY-MM-DD HH:mm:ss' - '2023-09-11 14:30:00'.

'MMM D, YYYY, h:mm a' - 'Sep 11, 2023, 2:30 PM'.

'dddd' - 'Sunday'.

'Do' - '1st', '22nd', '3rd'.

'MMM' - 'Jan' for January, 'Dec' for December.

'YYYY' - '2023'

```

<br>

# Coding Standards

-   Component :

    -   For Naming use **`Pascal Case`**
    -   More than 2 props from an object been used in the same place should be destructed
    -   Child Component Should be Individual. Such that can be easily move outside the main component.
    -   Create Generic component which can be used at multiple places
    -   If a Generic Component exists, add new functionality if needed.

    <br>

-   Variables:
    -   Use Use explanatory variables.
    -   While using fixed sets of contants create a Enum.
    -   Freeze the Enum Object.

<br>

# IDE Setup

Step 1 : Install the Prettier Extension

-   Click on the Extensions icon in the Activity Bar on the side of VS Code (or use Ctrl+Shift+X).
-   Search for "Prettier - Code formatter" and click "Install."
-   This extension will help you format your code automatically.

Step 2 : Add prettier as default formatter

-   Got to settings or **`ctrl + ,`**
-   Search Default Formatter
-   Select **Prettier - Code Formatter** from the options for both the user and workspace.
-   Save the Settings

<br>

# Project Setup

Step 1. Clone the repository to your local device.

> `git clone https://github.com/Fluxgentech/aquagen_web_appp.git`

Step 2. Install Dependencies

> `npm install`

Step 3. Compiles and hot-reloads for development

> ` npm start`

Step 4. Compile for Production

> `npm run build`

<br>

# Setting up firebase account

-   Get access for aquagen firebase account
-   Install latest node and make sure it is added to your path and accessible from command prompt or terminal
-   Install firebase tools
    > `npm install -g firebase-tools`
-   login

    > `firebase login`

    After running this select the gmail account for which you got access of firebase

<br>

# Deploying

Available sites ( `pre-prod & dev` is meant to release from dev and pre-prod branches. Don't us it for testing.)

> `uat, pre-prod, dev, test1, test2, test3, test4, test5, test6, test7`

Make sure your `firebase.json` is having all of these hosting address defined
To deploy to the specific site run the following command

First time run the following command to all new sites

> `firebase target:apply hosting <SITE_TAG> <SITE_ID>`

where

```
SITE_TAG is the above listed sites name
SITE_ID= `<SITE_TAG>-aquagen` is the above listed sites name
```

Example SITE_ID for test1 server

```
SITE_TAG = test1
SITE_ID = test1-aquagen
```

Build the webapp (macOS)

> `npm run build`

Build the webapp (windowsa)

> `npm run winBuild`

Deploy to firebase test pages

> `firebase deploy --only hosting:<SITE>`

Where site can be any of the above values

> Example: `firebase deploy --only hosting:test1`

### `TODO before Deployement :`

> constants.analyticsEnv = False

<br>

# Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build` (for macOS)

### `npm run winBuild` (for windows)

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

<br>

# TODO

-   Add exact verion
-   Add Git hooks
-   Add Linting Checks

Request Flow / Data Flow
pages -> store -> controller -> dataSource
