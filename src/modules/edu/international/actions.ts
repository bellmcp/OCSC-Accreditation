import axios from 'axios'
import { get } from 'lodash'
import * as uiActions from 'modules/ui/actions'

const LOAD_COUNTRIES_REQUEST =
  'ocsc-e-accredit/edu/international/LOAD_COUNTRIES_REQUEST'
const LOAD_COUNTRIES_SUCCESS =
  'ocsc-e-accredit/edu/international/LOAD_COUNTRIES_SUCCESS'
const LOAD_COUNTRIES_FAILURE =
  'ocsc-e-accredit/edu/international/LOAD_COUNTRIES_FAILURE'

function loadCountries() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_COUNTRIES_REQUEST })
    try {
      var { data } = await axios.get('/countries')
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_COUNTRIES_SUCCESS,
        payload: {
          countries: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_COUNTRIES_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลสถาบันการศึกษาในต่างประเทศไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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
  LOAD_COUNTRIES_REQUEST,
  LOAD_COUNTRIES_SUCCESS,
  LOAD_COUNTRIES_FAILURE,
  loadCountries,
}
