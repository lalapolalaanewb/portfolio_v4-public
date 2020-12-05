# Portfolio V4

Fourth version of my Portfolio making from the scratch.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Software you need to install:-

- Node.js at [Node.org](https://nodejs.org/en/download/)
- Visual Studio Code at [Visual Studio Code](https://code.visualstudio.com/)
- or you can choose any Code Editor to your liking

```
Go to Node.org link above and choose your machine type (Please choose the **LTS download version** instead of the Current version):-
- Window, go for Windows Installer
- MacOS, go for MacOS Installer
```

### Installing

Please follow the step below to get the system running

1. After download or git repo the _Project file_. Place your _Project folder_ anywhere in your system (doesn't matter where actually)
2. Open your _Code Editor_ (Visual Studio Code or any other code editor)
3. Go to your _Terminal_ in Visual Studio Code or open _CMD - Command Prompt_, manuver to where your _Project folder_ located and do the following installation:- (make sure you already inside your Project folder. Eg: C:\parentFolder\ProjectFolder)

```
in your Terminal or CMD, it's gonna look like this:-
C:\parentFolder\ProjectFolder\>

```

- Install all dependencies required (for `server` & `client` folder as stated in _package.json_)
  - `server` folder
    - devDependencies:-
      - concurrently
      - nodemon
    - dependencies
      - @hapi/joi
      - bcryptjs
      - colors
      - connect-redis
      - dotenv
      - express
      - express-session
      - jsonwebtoken
      - mongoose
      - morgan
      - multer
      - nodemailer
      - redis
  - `client` folder
    - @material-ui/core
    - @material-ui/icons
    - @material-ui/lab
    - axios
    - classnames
    - disqus-react
    - material-table
    - react-icons
    - react-markdown
    - react-router-dom
    - react-share
    - react-syntax-highlighter
    - universal-cookie
    - uuid

```
// for server dependencies installation
C:\parentFolder\ProjectFolder\> npm install

// for client dependencies installation
C:\parentFolder\ProjectFolder\client> npm install
```

- Once installation finishes with no errors. Then start the project (in development build - **this will run both the server & client side of the project**):-

```
C:\parentFolder\ProjectFolder\> npm run dev
```

## Important Notes

Below are the list of API routes use in the project:-

- '/' -> handles of API routes (Home route)
  - '/test' -> render and handle all testing data to help Portfolio V3 working
  - '/global' -> render and handle same data required by all pages available (nav menu & footer)
  - '/auth' -> render & handle all data required to be display on _Login_ page
  - '/about' -> render & handles all data required to be display on _About_ page
  - '/projects' -> render & handles all data required to be display on _Projects_ page
  - '/blog' -> render & handles all data required to be display on _Blog_ page
  - '/contact' -> render & handles all data required to be display on _Contact_ page

## Deployment

No additional support on how to deploy on live system for this project.

## Built With

- React
- Node.js
- MongoDB

## Contributing

No contribution allowed as of this moment of time.

## Authors

- **Lalapolalaa Newb**

## Acknowledgments

- [Academind](https://www.youtube.com/channel/UCSJbGtTlrDami-tDGPUV9-w)
- [Online Tutorials](https://www.youtube.com/channel/UCbwXnUipZsLfUckBPsC7Jog)
- [Traversy Media](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA)
- [DevEd](https://www.youtube.com/channel/UClb90NQQcskPUGDIXsQEz5Q)
- [Web Dev Simplifies](https://www.youtube.com/channel/UCFbNIlppjAuEX4znoulh0Cw)
- [DesignCourse](https://www.youtube.com/channel/UCVyRiMvfUNMA1UPlDPzG5Ow)
- [Coding Addict](https://www.youtube.com/channel/UCMZFwxv5l-XtKi693qMJptA)
- [The Net Ninja](https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg)
