import { useState } from "react"

export const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState)

    const onToggle = x => {
        // setState(!state)
        setState(y => typeof(x) === 'boolean' ? x : !y);
        /* 
        setCount(이번값받은매개변수 => {
            return 함수매개변수 === 논리값 ? 매개변수 : !이전값받은 매개변수
        })
        */
        /*
        state는 원래 false : setCount(y => 에서 y는 원래 state인 false
        state(false) => typeof(x) : x는 함수로 넘긴 값 (true나 false)
        y(원래는 false 값을 가진 state)는 지금 받은 함수 x가 true라면? x 그 잡채인 true가 되어라
        만약 불리언 값이 아니라면 !y인 true가 되어라 (토글이니까)
        */
    }
    const onChk = x => {
        setState(x)
    }

    return {state, onToggle, onChk}
}