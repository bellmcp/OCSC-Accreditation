import axios from 'axios'
import { get } from 'lodash'

import * as uiActions from 'modules/ui/actions'

const INCREMENT_VISITOR_REQUEST =
  'ocsc-e-accredit/home/INCREMENT_VISITOR_REQUEST'
const INCREMENT_VISITOR_SUCCESS =
  'ocsc-e-accredit/home/INCREMENT_VISITOR_SUCCESS'
const INCREMENT_VISITOR_FAILURE =
  'ocsc-e-accredit/home/INCREMENT_VISITOR_FAILURE'

function incrementVisitor() {
  return async (dispatch: any) => {
    dispatch({ type: INCREMENT_VISITOR_REQUEST })
    try {
      var { data } = await axios.put('/counters/firstpage')
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: INCREMENT_VISITOR_SUCCESS,
        payload: {
          visitor: data.value,
        },
      })
    } catch (err) {
      dispatch({ type: INCREMENT_VISITOR_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดจำนวนครั้งที่เข้าชมไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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
  INCREMENT_VISITOR_REQUEST,
  INCREMENT_VISITOR_SUCCESS,
  INCREMENT_VISITOR_FAILURE,
  incrementVisitor,
}
