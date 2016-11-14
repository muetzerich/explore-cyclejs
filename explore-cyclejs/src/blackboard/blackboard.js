import xs from "xstream";
import {div, span, button, h1, h3} from "@cycle/dom";

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
    padding: "20px",
    paddingBottom:"0",
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
    fontSize:"16px",
    color: "#000"
}

const materialButton = {
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
            div('.container',[
                div('.div', {style: ButtonGroupStyle},[
                    div('.infb',{style: materialButton}, 'INFB'),
                    div('.infm',{style: materialButton}, 'INFM'),
                ]),
                div('.div', {style: listStyle},[
                    div('.item',
                    text.map(item =>
                        div('.item',{style: cardStyle},[
                            h1('.title',{style: cardTitleStyle}, item.title),
                            h3('.title',{style: cardSubTitleStyle}, item.subTitle),
                            h3('.title',{style: cardSubTitleStyle}, item.type),
                            div('.item',{style: cardContentWrapperStyle},[
                            span('.content', {style: cardContentStyle}, item.content)])
                        ]))
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