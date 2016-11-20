import {div, input, h1} from '@cycle/dom'

export function Filter (sources) {
  const dom$ = sources.DOM.select('.input').events('input')
      .map(ev => ev.target.value)
      .startWith('')
      .filter(input => !isNaN(input) && input % 2 == 0)
      .map(name =>
          div([
            input('.input', {attrs: {type: 'text'}}),
            h1('Valid Numbers: ' + name),
          ]))

  const sinks = {
    DOM: dom$
  }
  return sinks
}
