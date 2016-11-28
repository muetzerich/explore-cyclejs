import {run} from '@cycle/xstream-run'
import {makeDOMDriver} from '@cycle/dom'
import {makeHTTPDriver} from '@cycle/http';

import {HelloWorld} from './helloWorld/helloWorld'
import {Blackboard} from './blackboard/blackboard'
import {BlackboardMVI} from './blackboard/blackboardMVI'
import {Filter} from './filter/filter'
import {FilterMVI} from './filter/filterMVI'

//Choose active Cycle.js Function here
const main = Blackboard

const drivers = {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver()
}

run(main, drivers)
