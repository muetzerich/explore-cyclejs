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

* unspectacular [index.js](explore-cyclejs/src/helloWorld/helloWorld.js)
* a simple filter program [filter.js](explore-cyclejs/src/filter/filter.js)
* the filter program refactored with model-view-pattern [filter.js](explore-cyclejs/src/filterMVI/filterMVI.js)
* a more complex, styled app with http-requests, Bulletin board for our faculty [blackboard.js](explore-cyclejs/src/blackboard/blackboard.js)
* Bulletin board for our faculty refactored with model-view-pattern [blackboard.js](explore-cyclejs/src/blackboardMVI/blackboardMVI.js)

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

**[:arrow_up: back to top](#usage)**

---
### License
[![CC0](http://i.creativecommons.org/p/zero/1.0/88x31.png)](http://creativecommons.org/publicdomain/zero/1.0/)
