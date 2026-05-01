# CS372FinalProject - Noah Bush & Ian Rodriguez
Full-Stack streaming web app utilizing MongoDB, Node.js, Express.js & React JS(MERN)  and Agile methodology, prioritizing customer engagement to deliver an amazing streaming platform with a beautiful UI.

## Prerequisites
**Hardware Requirements**: No established device specs, but must be run on a computer.

**Software Requirements**: The user must have node.js and npm installed, in addition to a web browser to access the web app. In order for videos to play properly, it is strongly preferred for the app to be run in Google Chrome.

## Node.Js Version Check
This project requires Node.js v20 or higher. Before installing, check your current version:

 - *node -v*
 - *npm -v*

## If you dont have Node.js or your Node.js versions is under v20

Download and install the latest LTR version from https://nodejs.org/en/download, and this will replace your current version

## Installation Process

1. Clone our github repository (or download raw files from github)

2. Install root directory dependencies using 
- *npm install*

3. Install client dependencies 
- *cd client*
- *npm install*

4. Install server dependencies
- *cd ../server*
- *npm install*

## Running the Web App

From root directory (CS372FinalProject) run this cmd:
- *npm run dev*

This will start the front-end and back-end at the same time. If this does not work, run *npm start* in the server directory and *npm run dev* in the client directory.

## Implemented Features
- Frontend built with React (still needs polishing)
- Login validation
- Pages (Home,Gallery,Login)
- Read/Write Comment Feature (Read/Write for Marketing Manager, Read-Only for Content Editor)
- SHA-256 password encryption
- Upload Film Feature for Content Editor; dedicated Upload page updates Gallery with each film added
- Delete Film Feature for Content Editor; button on each video removes it from database and refreshes Gallery
- Delete Comment Feature for Marketing Manager; button on each comment removes it from database and refreshes
- Film genres
- Logout feature
- Intuitive UI/UX

## GUI
- **Navigation Bar**: At the top of any given webpage, the user has access to buttons that allow them to navigate the web app. If the user isn't logged in, they only have access to "Home" and "Login". If the user has logged in, they develop the option to visit the "Gallery" for films and "Logout" to end their user session. If the user is a Content Editor, they also have access to an "Upload" page for uploading films to the Gallery.
- **Buttons**: There are intuitive buttons for submitting inputs, such as login credentials, liking/disliking a film, or general navigation for the average viewer. This extends to writing/reading comments uploading films for roles above the Viewer.
- **Modals**: In order to watch a film or read its info, the user has access to a "WATCH" and "INFO" button under each video. Clicking the "INFO" button results in a modal window that covers the Gallery and provides information about the respective film they requested the info about, including its description and genre, set by the Content Editor. Clicking the "WATCH" button results in a modal interface for watching each film and interacting with it further depending on the Role.

# Our Tech Stack
- MongoDB
- Express.js
- React.js
- Node.js

# Why React?
 *React* is more intuitive to use for a Full stack project of this nature, because in React you only need to describe what the UI needs to look like dependent on the current *state*, making our control over the UI for different roles much easier. In vanilla JS, however, you need to manually find the correct element and update its content each time. In short, both options work, however React makes UI control much easier with a few additional steps.
