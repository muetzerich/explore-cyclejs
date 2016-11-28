import {div, input, h1} from '@cycle/dom'

export function HelloWorld (sources) {
  const dom$ = sources.DOM.select('.input').events('input')
      .map(ev => ev.target.value)
      .startWith('')
      .map(name =>
          div([
            input('.input', {attrs: {type: 'text'}}),
            h1('Hello ' + name),
          ]))

  const sinks = {
    DOM: dom$
  }
  return sinks
}
