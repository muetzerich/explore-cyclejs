<h1 align="center">Explore Cycle.js</h1>


<div align="center">
  <img alt="logo" src="https://raw.githubusercontent.com/cyclejs/cyclejs/master/logo.png" width="128">
</div>
<div align="center">
<br/>
<br/>
  <strong>Collection of various Cycle.js programs. :rocket: <br/>
          Created in the context of my paper about Cycle.js at the University of Applied Science Karlsruhe
</strong>
</div>


## Usage

### Choose Function

The following Cycle.js functions are available in this repository.

* unspectacular [Hello World](explore-cyclejs/src/helloWorld/helloWorld.js) function
* a simple [filter program](explore-cyclejs/src/filter/filter.js)
* the [filter program](explore-cyclejs/src/filter/filterMVI.js)refactored with model-view-pattern 
* a more complex, styled app with http-requests: [bulletin board](explore-cyclejs/src/blackboard/blackboard.js) for our faculty
* [bulletin board](explore-cyclejs/src/blackboard/blackboard.js) for our faculty refactored with model-view-pattern 
To use them you have to enter the desired function in the [index.js](src/index.js) file:

```javascript
//Choose active Cycle.js Function here
 const main = BlackboardMVI
```


### Development

Start a local server at `http://localhost:8000` for your application with:

`npm start`: Start development server listening on port 8000

### Testing

`npm test`: Run the default test tool

### Production
`npm run build`: Generate a production-ready build content, on the build folder (this folder is gitignored)

**[:arrow_up: back to top](#explore-cyclejs)**

---
### License
[![CC0](http://i.creativecommons.org/p/zero/1.0/88x31.png)](http://creativecommons.org/publicdomain/zero/1.0/)
