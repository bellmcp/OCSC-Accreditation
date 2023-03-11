import {
  INCREMENT_VISITOR_REQUEST,
  INCREMENT_VISITOR_SUCCESS,
  INCREMENT_VISITOR_FAILURE,
} from './actions'

const initialState = {
  isIncrementing: false,
  visitor: 0,
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case INCREMENT_VISITOR_REQUEST:
      return { ...state, isIncrementing: true, visitor: 0 }
    case INCREMENT_VISITOR_SUCCESS:
      return {
        ...state,
        isIncrementing: false,
        visitor: action.payload.visitor,
      }
    case INCREMENT_VISITOR_FAILURE:
      return { ...state, isIncrementing: false }
    default:
      return state
  }
}
