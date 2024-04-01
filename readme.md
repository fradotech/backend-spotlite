# Deployment

1. You can see project deployment here https://spotlite-backend-frado.vercel.app
2. You can see API Documentation here https://documenter.getpostman.com/view/21031688/2sA35HWLa4

# Project Setup

## A. Environment Setup

1. Clone this repository to your local machine using the `git clone` command.
2. Open your terminal and navigate to the project directory.
3. Run `npm install` to install all the necessary dependencies for the project.
4. Copy paste `env.example` and rename to `.env` than fill variables

## B. Run & Build Steps

This project has several scripts predefined in `package.json`:

1. **Start**: To run the application in development mode, use the `npm run start` command. This will execute `ts-node src/index.ts`, running your application using ts-node, which allows you to run TypeScript without needing to compile it first.

2. **Dev**: To run the application in development mode with hot reloading, use the `npm run dev` command. This will execute `nodemon src/index.ts`, running your application using nodemon, which will automatically restart your application whenever there are file changes.

3. **Build**: To build the application for production, use the `npm run build` command. This will execute `tsc`, compiling all your TypeScript files into JavaScript.

4. **Start:prod**: After building the application, you can run it in production mode with `npm run start:prod`. This will execute `ts-node dist/src/index.js`, running the built version of your application.

# C. API Documentation

The API documentation provides detailed information about the endpoints, request parameters, and response formats for our service. It is an essential resource for understanding how to interact with our API effectively.

You can access the API documentation at the following link: [API Documentation](https://documenter.getpostman.com/view/21031688/2sA35HWLa4)