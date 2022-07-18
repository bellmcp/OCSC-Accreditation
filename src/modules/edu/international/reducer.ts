import {
  LOAD_COUNTRIES_REQUEST,
  LOAD_COUNTRIES_SUCCESS,
  LOAD_COUNTRIES_FAILURE,
} from './actions'

const initialState = {
  isLoading: false,
  countries: [],
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_COUNTRIES_REQUEST:
      return { ...state, isLoading: true, countries: [] }
    case LOAD_COUNTRIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        category: action.payload.category,
        countries: action.payload.countries,
      }
    case LOAD_COUNTRIES_FAILURE:
      return { ...state, isLoading: false }
    default:
      return state
  }
}
