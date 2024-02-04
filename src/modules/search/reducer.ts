import {
  LOAD_EDUCATION_LEVELS_REQUEST,
  LOAD_EDUCATION_LEVELS_SUCCESS,
  LOAD_EDUCATION_LEVELS_FAILURE,
  SEARCH_CURRICULUMS_REQUEST,
  SEARCH_CURRICULUMS_SUCCESS,
  SEARCH_CURRICULUMS_FAILURE,
  INCREMENT_VISITOR_REQUEST,
  INCREMENT_VISITOR_SUCCESS,
  INCREMENT_VISITOR_FAILURE,
  LOAD_ACCREDITATION_INFO_REQUEST,
  LOAD_ACCREDITATION_INFO_SUCCESS,
  LOAD_ACCREDITATION_INFO_FAILURE,
  CLEAR_SEARCH_RESULT,
} from './actions'

const initialState = {
  isLoading: false,
  isSearching: false,
  isIncrementing: false,
  educationLevels: [],
  searchResults: [],
  accreditationInfo: {},
  visitor: 0,
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_EDUCATION_LEVELS_REQUEST:
      return { ...state, isLoading: true, educationLevels: [] }
    case SEARCH_CURRICULUMS_REQUEST:
      return { ...state, isSearching: true, searchResults: [] }
    case INCREMENT_VISITOR_REQUEST:
      return { ...state, isIncrementing: true, visitor: 0 }
    case LOAD_ACCREDITATION_INFO_REQUEST:
      return { ...state, isLoading: true, accreditationInfo: {} }
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
    case INCREMENT_VISITOR_SUCCESS:
      return {
        ...state,
        isIncrementing: false,
        visitor: action.payload.visitor,
      }
    case LOAD_ACCREDITATION_INFO_SUCCESS:
      return {
        ...state,
        isIncrementing: false,
        accreditationInfo: action.payload.accreditationInfo,
      }
    case LOAD_EDUCATION_LEVELS_FAILURE:
      return { ...state, isLoading: false }
    case SEARCH_CURRICULUMS_FAILURE:
      return { ...state, isSearching: false }
    case INCREMENT_VISITOR_FAILURE:
      return { ...state, isIncrementing: false }
    case LOAD_ACCREDITATION_INFO_FAILURE:
      return { ...state, isLoading: false }
    case CLEAR_SEARCH_RESULT:
      return { ...state, searchResults: [] }
    default:
      return state
  }
}
