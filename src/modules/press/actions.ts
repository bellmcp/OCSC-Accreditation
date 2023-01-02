import axios from 'axios'
import { get } from 'lodash'
import * as uiActions from 'modules/ui/actions'

const LOAD_PRESS_REQUEST = 'ocsc-e-accredit/press/LOAD_PRESS_REQUEST'
const LOAD_PRESS_SUCCESS = 'ocsc-e-accredit/press/LOAD_PRESS_SUCCESS'
const LOAD_PRESS_FAILURE = 'ocsc-e-accredit/press/LOAD_PRESS_FAILURE'

function loadPresses() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_PRESS_REQUEST })
    try {
      var { data } = await axios.get('/PressReleases', {
        params: {
          max: 5,
        },
      })
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_PRESS_SUCCESS,
        payload: {
          presses: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_PRESS_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลประชาสัมพันธ์ไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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
  LOAD_PRESS_REQUEST,
  LOAD_PRESS_SUCCESS,
  LOAD_PRESS_FAILURE,
  loadPresses,
}
