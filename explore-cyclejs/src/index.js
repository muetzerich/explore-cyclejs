import {run} from '@cycle/xstream-run'
import {makeDOMDriver} from '@cycle/dom'
import {makeHTTPDriver} from '@cycle/http';

import {App} from './helloWorld/helloWorld'
import {Blackboard} from './blackboard/blackboard'


const main = Blackboard

const drivers = {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver()
}

run(main, drivers)
