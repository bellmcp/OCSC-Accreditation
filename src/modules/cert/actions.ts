import axios from 'axios'
import { get } from 'lodash'
import * as uiActions from 'modules/ui/actions'

const LOAD_CERTIFICATE_REQUEST = 'ocsc-e-accredit/cert/LOAD_CERTIFICATE_REQUEST'
const LOAD_CERTIFICATE_SUCCESS = 'ocsc-e-accredit/cert/LOAD_CERTIFICATE_SUCCESS'
const LOAD_CERTIFICATE_FAILURE = 'ocsc-e-accredit/cert/LOAD_CERTIFICATE_FAILURE'

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

export {
  LOAD_CERTIFICATE_REQUEST,
  LOAD_CERTIFICATE_SUCCESS,
  LOAD_CERTIFICATE_FAILURE,
  loadCertificate,
}
