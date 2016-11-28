import {div, input, h1} from '@cycle/dom'

function intent(domSource) {
    return {
        inputField$: domSource.DOM.select('.input').events('input')
            .map(ev => ev.target.value)
    }
}

function model(actions) {
    return {
        input: actions.inputField$.startWith('')
            .filter(input => !isNaN(input) && input % 2 == 0)
    }
}

function view(state$) {
    return state$.input.map(name =>
        div([
            input('.input', {attrs: {type: 'text'}}),
            h1('Valid Numbers: ' + name)
        ]))
}

export function FilterMVI (sources) {
    const actions = intent(sources)
    const state$ = model(actions)
    const vdom$ = view(state$);

    const sinks = {
        DOM: vdom$
    }
    return sinks
}
