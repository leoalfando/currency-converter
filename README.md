<h1 align="center">Currency Exchange (SEK)</h1>
Application to search for countries and convert your input amount from SEK to local currency of each country.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Installation](#installation)
  - [Step 1: Set up the Development Environment](#step-1-set-up-the-development-environment)
  - [Step 2: Set up Env](#step-2-set-up-env)
  - [Step 3: Install dependencies](#step-3-install-dependencies)
  - [Step 4: Running Locally](#step-4-running-locally)
- [Features](#features)
  - [GraphQL](#graphql)
  - [Express](#express)
  - [React](#react)
  - [React Apollo](#react-apollo)
  - [Typescript](#typescript)
  - [JsonWebToken](#jsonwebtoken)
  - [TSLint](#tslint)
  - [Cors](#cors)
- [License](#license)

## Installation

Clone this repo to your local machine.

### Step 1: Set up the Development Environment

You need to set up your development environment before you can do anything.

**Install [Node.js and NPM](https://nodejs.org/en/download/)**

- on OSX use [homebrew](http://brew.sh) `brew install node`
- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

**Install yarn globally**

```bash
yarn global add yarn
```

> NOTE : If you work with a mac, we recommend to use homebrew for the installation.

### Step 2: Set up Env

Open .env file in a editor and add your configuration for database and other required fields.

```ts
NODE_ENV = development;
JWT_SECRET = "somesuperkey";
PORT = 4020;
CURRENCY_ACCESS_KEY=fixerioaccesskey
```
For CURRENCY_ACCESS_KEY, you can get a new one from https://fixer.io/ and update the .env file

### Step 3: Install dependencies

Navigate to the server and react app directories and run the below command:

```bash
$ yarn
```

### Step 4: Running Locally

Navigate to the **Express Server** directory and run the below command in your terminal :

```bash
$ yarn start
```

Now navigate to **React App** directory and run the below command in your terminal :

```bash
$ yarn start
```

## Features

### GraphQL

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

### Express

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

### React

React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.

### React Apollo

React Apollo allows you to fetch data from your GraphQL server and use it in building complex and reactive UIs using the React framework. React Apollo may be used in any context that React may be used. In the browser, in React Native, or in Node.js when you want to do server-side rendering.

### Typescript

TypeScript is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript, and adds optional static typing to the language. TypeScript is designed for development of large applications and transcompiles to JavaScript.

### JsonWebToken

JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties.

### TSLint

TSLint is an extensible static analysis tool that checks TypeScript code for readability, maintainability, and functionality errors


### Cors

Cross-origin resource sharing is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
