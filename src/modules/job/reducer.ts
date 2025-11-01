import {
  LOAD_CERTIFICATE_REQUEST,
  LOAD_CERTIFICATE_SUCCESS,
  LOAD_CERTIFICATE_FAILURE,
  LOAD_LOCAL_DATE_TIME_REQUEST,
  LOAD_LOCAL_DATE_TIME_SUCCESS,
  LOAD_LOCAL_DATE_TIME_FAILURE,
} from './actions'

const initialState = {
  isLoading: false,
  isLocalDateTimeLoading: false,
  certificate: {},
  localDateTime: '',
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_CERTIFICATE_REQUEST:
      return { ...state, isLoading: true, certificate: {} }
    case LOAD_LOCAL_DATE_TIME_REQUEST:
      return { ...state, isLocalDateTimeLoading: true, localDateTime: '' }
    case LOAD_CERTIFICATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        certificate: action.payload.certificate,
      }
    case LOAD_LOCAL_DATE_TIME_SUCCESS:
      return {
        ...state,
        isLocalDateTimeLoading: false,
        localDateTime: action.payload.localDateTime,
      }
    case LOAD_CERTIFICATE_FAILURE:
      return { ...state, isLoading: false }
    case LOAD_LOCAL_DATE_TIME_FAILURE:
      return { ...state, isLocalDateTimeLoading: false }
    default:
      return state
  }
}
