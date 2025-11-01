import {
  LOAD_CLOSE_JOBS_REQUEST,
  LOAD_CLOSE_JOBS_SUCCESS,
  LOAD_CLOSE_JOBS_FAILURE,
  LOAD_OPEN_JOBS_REQUEST,
  LOAD_OPEN_JOBS_SUCCESS,
  LOAD_OPEN_JOBS_FAILURE,
  LOAD_SEMI_JOBS_REQUEST,
  LOAD_SEMI_JOBS_SUCCESS,
  LOAD_SEMI_JOBS_FAILURE,
} from './actions'

const initialState = {
  isCloseJobsLoading: false,
  isCloseJobsError: false,
  closeJobs: {},
  isOpenJobsLoading: false,
  isOpenJobsError: false,
  openJobs: {},
  isSemiJobsLoading: false,
  isSemiJobsError: false,
  semiJobs: {},
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_CLOSE_JOBS_REQUEST:
      return { ...state, isCloseJobsLoading: true, closeJobs: {} }
    case LOAD_CLOSE_JOBS_SUCCESS:
      return {
        ...state,
        isCloseJobsLoading: false,
        closeJobs: action.payload.closeJobs,
      }
    case LOAD_CLOSE_JOBS_FAILURE:
      return { ...state, isCloseJobsLoading: false, isCloseJobsError: true }
    case LOAD_OPEN_JOBS_REQUEST:
      return { ...state, isOpenJobsLoading: true, openJobs: {} }
    case LOAD_OPEN_JOBS_SUCCESS:
      return {
        ...state,
        isOpenJobsLoading: false,
        openJobs: action.payload.openJobs,
      }
    case LOAD_OPEN_JOBS_FAILURE:
      return { ...state, isOpenJobsLoading: false, isOpenJobsError: true }
    case LOAD_SEMI_JOBS_REQUEST:
      return { ...state, isSemiJobsLoading: true, semiJobs: {} }
    case LOAD_SEMI_JOBS_SUCCESS:
      return {
        ...state,
        isSemiJobsLoading: false,
        semiJobs: action.payload.semiJobs,
      }
    case LOAD_SEMI_JOBS_FAILURE:
      return { ...state, isSemiJobsLoading: false, isSemiJobsError: true }
    default:
      return state
  }
}
