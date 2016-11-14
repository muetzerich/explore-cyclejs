import xs from "xstream";
import {div, span, button, h1} from "@cycle/dom";

export function Blackboard(sources) {

    const infbButton$ = sources.DOM
        .select('.infb')
        .events('click')
        .map(()=> generateRestObject('INFB'))

    const infmButton$ = sources.DOM
        .select('.infm')
        .events('click')
        .map(()=> generateRestObject('INFM'))

    const response$ = sources.HTTP
        .select('blackboard')
        .flatten()
        .map(res => res.body)
        .startWith([])

    const request$ = xs.merge(infbButton$, infmButton$)

    const vdom$ = response$
        .map(text =>
            div([
                button('.infb', 'Informatik Bachelor'),
                button('.infm', 'Informatik Master'),
                div('.div',[div('.item',
                    text.map(item =>
                        div('.item',{style: {border: '1px solid #bada55'}},[
                            h1('.title',{style: {color: 'black'}}, item.title),
                            span('.content', item.content)
                        ])
                    )
                )])
            ]));

    return {
        DOM: vdom$,
        HTTP: request$
    };
}

function generateRestObject(course) {
     return { url: `https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/newsbulletinboard/${course}`,
        category: 'blackboard'
    }
}