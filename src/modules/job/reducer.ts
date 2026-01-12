import {
  LOAD_JOB_POSITIONS_REQUEST,
  LOAD_JOB_POSITIONS_SUCCESS,
  LOAD_JOB_POSITIONS_FAILURE,
} from './actions'

const initialState = {
  isLoading: false,
  isError: false,
  jobDesc1: '',
  jobDesc2: '',
  jobDesc3: '',
  closeJobs: [],
  semiJobs: [],
  openJobs: [],
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_JOB_POSITIONS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        jobDesc1: '',
        jobDesc2: '',
        jobDesc3: '',
        closeJobs: [],
        semiJobs: [],
        openJobs: [],
      }
    case LOAD_JOB_POSITIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobDesc1: action.payload.jobDesc1,
        jobDesc2: action.payload.jobDesc2,
        jobDesc3: action.payload.jobDesc3,
        closeJobs: action.payload.closeJobs,
        semiJobs: action.payload.semiJobs,
        openJobs: action.payload.openJobs,
      }
    case LOAD_JOB_POSITIONS_FAILURE:
      return { ...state, isLoading: false, isError: true }
    default:
      return state
  }
}
