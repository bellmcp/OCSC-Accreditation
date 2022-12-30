import axios from 'axios'
import { get } from 'lodash'
import * as uiActions from 'modules/ui/actions'

const LOAD_COUNTRIES_REQUEST =
  'ocsc-e-accredit/edu/international/LOAD_COUNTRIES_REQUEST'
const LOAD_COUNTRIES_SUCCESS =
  'ocsc-e-accredit/edu/international/LOAD_COUNTRIES_SUCCESS'
const LOAD_COUNTRIES_FAILURE =
  'ocsc-e-accredit/edu/international/LOAD_COUNTRIES_FAILURE'
const LOAD_RECOGNITION_INFO_REQUEST =
  'ocsc-e-accredit/edu/international/LOAD_RECOGNITION_INFO_REQUEST'
const LOAD_RECOGNITION_INFO_SUCCESS =
  'ocsc-e-accredit/edu/international/LOAD_RECOGNITION_INFO_SUCCESS'
const LOAD_RECOGNITION_INFO_FAILURE =
  'ocsc-e-accredit/edu/international/LOAD_RECOGNITION_INFO_FAILURE'
const INCREMENT_COUNTER_REQUEST =
  'ocsc-e-accredit/edu/international/INCREMENT_COUNTER_REQUEST'
const INCREMENT_COUNTER_SUCCESS =
  'ocsc-e-accredit/edu/international/INCREMENT_COUNTER_SUCCESS'
const INCREMENT_COUNTER_FAILURE =
  'ocsc-e-accredit/edu/international/INCREMENT_COUNTER_FAILURE'

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

function loadRecognitionInfo() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_RECOGNITION_INFO_REQUEST })
    try {
      var { data } = await axios.get('/constants/recognitioninfo')
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_RECOGNITION_INFO_SUCCESS,
        payload: {
          recognitionInfo: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_RECOGNITION_INFO_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดคำชี้แจ้งไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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

function incrementCounter(countryId: number) {
  return async (dispatch: any) => {
    dispatch({ type: INCREMENT_COUNTER_REQUEST })
    try {
      var { data } = await axios.patch(`/countries/${countryId}`)
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: INCREMENT_COUNTER_SUCCESS,
        payload: {
          countries: data,
        },
      })
    } catch (err) {
      dispatch({ type: INCREMENT_COUNTER_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `เพิ่มจำนวนครั้งที่เข้าชมไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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
  LOAD_RECOGNITION_INFO_REQUEST,
  LOAD_RECOGNITION_INFO_SUCCESS,
  LOAD_RECOGNITION_INFO_FAILURE,
  INCREMENT_COUNTER_REQUEST,
  INCREMENT_COUNTER_SUCCESS,
  INCREMENT_COUNTER_FAILURE,
  loadCountries,
  loadRecognitionInfo,
  incrementCounter,
}
