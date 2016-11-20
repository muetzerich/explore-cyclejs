import xs from "xstream";
import {div, span, input, h1, h3} from "@cycle/dom";
import ramda from 'ramda'

const listStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
}

const ButtonGroupStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
}

const InputWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
}

const inputStlyle = {
    width: "400px",
    height: "40px",
    margin:"20px",
    font: "22px Roboto, Arial",
    boxShadow: "0 27px 55px 0 rgba(0, 0, 0, 0.3), 0 17px 17px 0 rgba(0, 0, 0, 0.15)",
    borderRadius: "5px",
    border: "none"
}

const cardStyle = {
    margin: "15px",
    position: "relative",
    borderRadius: "2px",
    overflow:  "hidden",
    backgroundColor: "#fafafa",
    width: "600px",
    boxShadow: "0 27px 55px 0 rgba(0, 0, 0, 0.3), 0 17px 17px 0 rgba(0, 0, 0, 0.15)"
}

const cardTitleStyle = {
    paddingLeft: "20px",
    paddingTop:"10px",
    fontSize:"24px",
    color: "#000"
}

const cardSubTitleStyle = {
    paddingLeft: "20px",
    paddingBottom:"10px",
    fontSize:"16px",
    color: "#A9A9A9"
}


const cardContentWrapperStyle = {
    padding: "20px",
    borderTop: "1px solid #E0E0E0"
}

const cardContentStyle = {
    fontSize: "16px",
    color: "#000",
    whiteSpace: "pre-wrap"
}

const materialButtonStyle = {
    margin:"10px",
    backgroundColor: "#d23f31",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    color: "#fff",
    overflow: "hidden",
    boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.26)"
}


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

export function BlackboardMVI(sources) {

    model(intent(sources))



    const vdom$ = state$
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
