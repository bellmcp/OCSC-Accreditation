import {
  LOAD_CERTIFICATE_REQUEST,
  LOAD_CERTIFICATE_SUCCESS,
  LOAD_CERTIFICATE_FAILURE,
} from './actions'

const initialState = {
  isLoading: false,
  certificate: {},
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_CERTIFICATE_REQUEST:
      return { ...state, isLoading: true, certificate: {} }
    case LOAD_CERTIFICATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        certificate: action.payload.certificate,
      }
    case LOAD_CERTIFICATE_FAILURE:
      return { ...state, isLoading: false }
    default:
      return state
  }
}
