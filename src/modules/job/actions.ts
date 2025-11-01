import axios from 'axios'
import { get } from 'lodash'
import * as uiActions from 'modules/ui/actions'

const LOAD_CERTIFICATE_REQUEST = 'ocsc-e-accredit/cert/LOAD_CERTIFICATE_REQUEST'
const LOAD_CERTIFICATE_SUCCESS = 'ocsc-e-accredit/cert/LOAD_CERTIFICATE_SUCCESS'
const LOAD_CERTIFICATE_FAILURE = 'ocsc-e-accredit/cert/LOAD_CERTIFICATE_FAILURE'

const LOAD_LOCAL_DATE_TIME_REQUEST =
  'ocsc-e-accredit/cert/LOAD_LOCAL_DATE_TIME_REQUEST'
const LOAD_LOCAL_DATE_TIME_SUCCESS =
  'ocsc-e-accredit/cert/LOAD_LOCAL_DATE_TIME_SUCCESS'
const LOAD_LOCAL_DATE_TIME_FAILURE =
  'ocsc-e-accredit/cert/LOAD_LOCAL_DATE_TIME_FAILURE'

function loadCertificate(certificateId: number) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_CERTIFICATE_REQUEST })
    try {
      var { data } = await axios.get(`/curriculums/${certificateId}`)
      if (!data) {
        data = {}
      }
      dispatch({
        type: LOAD_CERTIFICATE_SUCCESS,
        payload: {
          certificate: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_CERTIFICATE_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลใบรับรองไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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

function loadLocalDateTime() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_LOCAL_DATE_TIME_REQUEST })
    try {
      var { data } = await axios.get('/localdatetime', {
        baseURL: 'https://learningportal.ocsc.go.th/learningspaceapi',
      })
      if (data.length === 0) {
        data = {}
      }
      const { datetime } = data
      dispatch({
        type: LOAD_LOCAL_DATE_TIME_SUCCESS,
        payload: {
          localDateTime: datetime,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_LOCAL_DATE_TIME_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลวันและเวลาปัจจุบันไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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

export {
  LOAD_CERTIFICATE_REQUEST,
  LOAD_CERTIFICATE_SUCCESS,
  LOAD_CERTIFICATE_FAILURE,
  LOAD_LOCAL_DATE_TIME_REQUEST,
  LOAD_LOCAL_DATE_TIME_SUCCESS,
  LOAD_LOCAL_DATE_TIME_FAILURE,
  loadCertificate,
  loadLocalDateTime,
}
