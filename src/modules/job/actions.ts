import axios from 'axios'
import { get } from 'lodash'
import * as uiActions from 'modules/ui/actions'

const LOAD_JOB_POSITIONS_REQUEST =
  'ocsc-e-accredit/job/LOAD_JOB_POSITIONS_REQUEST'
const LOAD_JOB_POSITIONS_SUCCESS =
  'ocsc-e-accredit/job/LOAD_JOB_POSITIONS_SUCCESS'
const LOAD_JOB_POSITIONS_FAILURE =
  'ocsc-e-accredit/job/LOAD_JOB_POSITIONS_FAILURE'

function loadJobPositions(certificateId: number) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_JOB_POSITIONS_REQUEST })
    try {
      var { data } = await axios.get(
        `/curriculums/${certificateId}/jobpositions`
      )
      if (!data) {
        data = {}
      }
      dispatch({
        type: LOAD_JOB_POSITIONS_SUCCESS,
        payload: {
          jobDesc1: data.jobDesc1 || '',
          jobDesc2: data.jobDesc2 || '',
          jobDesc3: data.jobDesc3 || '',
          closeJobs: data.job1 || [],
          semiJobs: data.job2 || [],
          openJobs: data.job3 || [],
        },
      })
    } catch (err) {
      if (err?.response?.status === 404 || err?.response?.status === 204) {
        dispatch({
          type: LOAD_JOB_POSITIONS_FAILURE,
        })
      } else {
        dispatch({
          type: LOAD_JOB_POSITIONS_FAILURE,
        })
        dispatch(
          uiActions.setFlashMessage(
            `โหลดข้อมูลตำแหน่งงานไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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
  LOAD_JOB_POSITIONS_REQUEST,
  LOAD_JOB_POSITIONS_SUCCESS,
  LOAD_JOB_POSITIONS_FAILURE,
  loadJobPositions,
}
