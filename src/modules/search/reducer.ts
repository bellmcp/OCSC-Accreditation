import {
  LOAD_EDUCATION_LEVELS_REQUEST,
  LOAD_EDUCATION_LEVELS_SUCCESS,
  LOAD_EDUCATION_LEVELS_FAILURE,
  SEARCH_CURRICULUMS_REQUEST,
  SEARCH_CURRICULUMS_SUCCESS,
  SEARCH_CURRICULUMS_FAILURE,
} from './actions'

const initialState = {
  isLoading: false,
  isSearching: false,
  educationLevels: [],
  searchResults: [],
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_EDUCATION_LEVELS_REQUEST:
      return { ...state, isLoading: true, educationLevels: [] }
    case SEARCH_CURRICULUMS_REQUEST:
      return { ...state, isSearching: true, searchResults: [] }
    case LOAD_EDUCATION_LEVELS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        educationLevels: action.payload.educationLevels,
      }
    case SEARCH_CURRICULUMS_SUCCESS:
      return {
        ...state,
        isSearching: false,
        searchResults: action.payload.searchResults,
      }
    case LOAD_EDUCATION_LEVELS_FAILURE:
      return { ...state, isLoading: false }
    case SEARCH_CURRICULUMS_FAILURE:
      return { ...state, isSearching: false }

    default:
      return state
  }
}
