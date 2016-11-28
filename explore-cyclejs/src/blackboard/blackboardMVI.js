import xs from "xstream";
import {div, span, input, h1, h3} from "@cycle/dom";
import {
    ButtonGroupStyle,
    cardContentStyle,
    cardContentWrapperStyle,
    cardStyle,
    cardTitleStyle,
    cardSubTitleStyle,
    materialButtonStyle,
    listStyle,
    inputStyle,
    InputWrapperStyle
} from "./styles/blackboard-style";


function intent(sources) {
    return {
        changeInput$ : sources.DOM
        .select('.searchInput')
        .events('input')
        .map(ev =>ev.target.value),

       changeInfbButton$ : sources.DOM
        .select('.infb')
        .events('click'),

       changeMkibButton$: sources.DOM
        .select('.mkib')
        .events('click')
        .map(()=> generateRestObject('MKIB')),

       changeInfmButton$: sources.DOM
        .select('.infm')
        .events('click')
        .map(()=> generateRestObject('INFM')),

       newResponse$: sources.HTTP
        .select('blackboard')
        .flatten()
        .map(res => res.body)
        .startWith([])
}
}

function model(actions) {
    const input$ = actions.changeInput$
    const infbButton$ = actions.changeInfbButton$
        .startWith(generateRestObject('INFB'))
        .map(()=> generateRestObject('INFB'));


    const request$ = xs.merge(infbButton$, infmButton$, mkibButton$)
    const state$ = xs.combine(response$, input$)
}

function view(state$) {
    return state$
        .map(([list, inputText]) =>
            div('.container',[
                div('.div', {style: ButtonGroupStyle},[
                    div('.infb',{style: materialButtonStyle}, 'INFB'),
                    div('.mkib',{style: materialButtonStyle}, 'MKIB'),
                    div('.infm',{style: materialButtonStyle}, 'INFM'),
                ]),
                div('.div', {style: InputWrapperStyle},[
                    input('.searchInput', {attrs: {type: 'text'},style: inputStyle})
                ]),
                div('.div', {style: listStyle},[
                    div('.item',
                        list.map(item =>{
                            if( item.title.toLowerCase().indexOf(inputText.toLowerCase()) >= 0
                                || item.content.toLowerCase().indexOf(inputText.toLowerCase()) >= 0){
                                return div('.item',{style: cardStyle},[
                                    h1('.title',{style: cardTitleStyle}, item.title),
                                    h3('.title',{style: cardSubTitleStyle}, item.subTitle),
                                    div('.item',{style: cardContentWrapperStyle},[
                                        span('.content', {style: cardContentStyle}, item.content)])
                                ]) }
                        })
                    )])
            ])
        );
}

export function BlackboardMVI(sources) {

    const actions = intent(sources)
    const state$ = model(actions)
    const vdom$ = view(state$);


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

