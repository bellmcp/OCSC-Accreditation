import axios from 'axios'
import { get } from 'lodash'
import * as uiActions from 'modules/ui/actions'

const LOAD_CLOSE_JOBS_REQUEST = 'ocsc-e-accredit/job/LOAD_CLOSE_JOBS_REQUEST'
const LOAD_CLOSE_JOBS_SUCCESS = 'ocsc-e-accredit/job/LOAD_CLOSE_JOBS_SUCCESS'
const LOAD_CLOSE_JOBS_FAILURE = 'ocsc-e-accredit/job/LOAD_CLOSE_JOBS_FAILURE'

const LOAD_OPEN_JOBS_REQUEST = 'ocsc-e-accredit/job/LOAD_OPEN_JOBS_REQUEST'
const LOAD_OPEN_JOBS_SUCCESS = 'ocsc-e-accredit/job/LOAD_OPEN_JOBS_SUCCESS'
const LOAD_OPEN_JOBS_FAILURE = 'ocsc-e-accredit/job/LOAD_OPEN_JOBS_FAILURE'

const LOAD_SEMI_JOBS_REQUEST = 'ocsc-e-accredit/job/LOAD_SEMI_JOBS_REQUEST'
const LOAD_SEMI_JOBS_SUCCESS = 'ocsc-e-accredit/job/LOAD_SEMI_JOBS_SUCCESS'
const LOAD_SEMI_JOBS_FAILURE = 'ocsc-e-accredit/job/LOAD_SEMI_JOBS_FAILURE'

function loadCloseJobs(certificateId: number) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_CLOSE_JOBS_REQUEST })
    try {
      var { data } = await axios.get(`/curriculums/${certificateId}/closejobs`)
      if (!data) {
        data = {}
      }
      dispatch({
        type: LOAD_CLOSE_JOBS_SUCCESS,
        payload: {
          closeJobs: data,
        },
      })
    } catch (err) {
      if (err?.response?.status === 404 || err?.response?.status === 204) {
        dispatch({
          type: LOAD_CLOSE_JOBS_FAILURE,
        })
      } else {
        dispatch({
          type: LOAD_CLOSE_JOBS_FAILURE,
        })
        dispatch(
          uiActions.setFlashMessage(
            `โหลดข้อมูลสายงานปิดไม่สำเร็จ เกิดข้อผิดพลาด ${get(
              err,
              'response.status',
              'บางอย่าง'
            )}`,
            'error'
          )
        )
      }
    }
  }
}

function loadOpenJobs(certificateId: number) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_OPEN_JOBS_REQUEST })
    try {
      var { data } = await axios.get(`/curriculums/${certificateId}/openjobs`)
      if (!data) {
        data = {}
      }
      dispatch({
        type: LOAD_OPEN_JOBS_SUCCESS,
        payload: {
          openJobs: data,
        },
      })
    } catch (err) {
      if (err?.response?.status === 404 || err?.response?.status === 204) {
        dispatch({
          type: LOAD_OPEN_JOBS_FAILURE,
        })
      } else {
        dispatch({
          type: LOAD_OPEN_JOBS_FAILURE,
        })
        dispatch(
          uiActions.setFlashMessage(
            `โหลดข้อมูลสายงานเปิดไม่สำเร็จ เกิดข้อผิดพลาด ${get(
              err,
              'response.status',
              'บางอย่าง'
            )}`,
            'error'
          )
        )
      }
    }
  }
}

function loadSemiJobs(certificateId: number) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_SEMI_JOBS_REQUEST })
    try {
      var { data } = await axios.get(`/curriculums/${certificateId}/semijobs`)
      if (!data) {
        data = {}
      }
      dispatch({
        type: LOAD_SEMI_JOBS_SUCCESS,
        payload: {
          semiJobs: data,
        },
      })
    } catch (err) {
      if (err?.response?.status === 404 || err?.response?.status === 204) {
        dispatch({
          type: LOAD_SEMI_JOBS_FAILURE,
        })
      } else {
        dispatch({
          type: LOAD_SEMI_JOBS_FAILURE,
        })
        dispatch(
          uiActions.setFlashMessage(
            `โหลดข้อมูลสายงานกึ่งเปิดไม่สำเร็จ เกิดข้อผิดพลาด ${get(
              err,
              'response.status',
              'บางอย่าง'
            )}`,
            'error'
          )
        )
      }
    }
  }
}

export {
  LOAD_CLOSE_JOBS_REQUEST,
  LOAD_CLOSE_JOBS_SUCCESS,
  LOAD_CLOSE_JOBS_FAILURE,
  LOAD_OPEN_JOBS_REQUEST,
  LOAD_OPEN_JOBS_SUCCESS,
  LOAD_OPEN_JOBS_FAILURE,
  LOAD_SEMI_JOBS_REQUEST,
  LOAD_SEMI_JOBS_SUCCESS,
  LOAD_SEMI_JOBS_FAILURE,
  loadCloseJobs,
  loadOpenJobs,
  loadSemiJobs,
}
