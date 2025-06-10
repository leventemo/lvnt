

create a project directory:
* `mkdir my-app`

navigate to the project folder:
* `cd myapp`

initialize the project:
* `npm init -y`

install necessary dependencies:
* `npm install express pg zod typescript @types/express @types/pg @types/node ts-node nodemon --save`

Create two folders:
* `src` and `dist`
* all your TypeScript code goes into the src folder, and the compiled JavaScript in the dist folder.

create a tsconfig.json file in the root of your project with the following basic configuration:
```ts
{
  "compilerOptions": {
    "target": "ES2019",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  },
  "include": [
    "src"
  ]
}
```

to activate nodemon in your application, add this to the script object in the package.json file:
```ts
"scripts": {
    "start": "node dist/app.js",
    "dev": "nodemon src/app.ts",
    "build": "tsc",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

build a basic server in a newly-created `src/index.ts` or `src/app.ts` file
```ts
// load & store the Express module, which returns a fn
import express from "express";

// call the fn, it returns an object of type Express
const app = express();

// Routes
// respond to an HTTP GET request to the website URL
app.get('/', (req, res) => {
  res.send('Hello World hoho!');
});

// respond to an HTTP GET request to /api/courses
app.get('/api/courses', (req, res) => {
  // get the resources from DB – see later, for now, simply return an array
  res.send([1, 2, 3]);
});

// get a single course
app.get('/api/courses/:id', (req, res) => {
  // for now, just send the id back to the client
  res.send('tyutyu');
});

// use route parameters
app.get('/api/posts/:year/:month', (req, res) => {
  // for now, just send the id back to the client
  res.send(req.params);
});

// use a query string parameter
app.get('/api/posts/:year/:month', (req, res) => {
  // for now, just send the id back to the client
  res.send(req.query);
});

// set and store the port value
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is listening on http://localhost:${port}....`);
});
```


