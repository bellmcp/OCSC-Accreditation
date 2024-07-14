import axios from 'axios'
import { get } from 'lodash'
import * as uiActions from 'modules/ui/actions'

const LOAD_LETTERS_REQUEST = 'ocsc-e-accredit/download/LOAD_LETTERS_REQUEST'
const LOAD_LETTERS_SUCCESS = 'ocsc-e-accredit/download/LOAD_LETTERS_SUCCESS'
const LOAD_LETTERS_FAILURE = 'ocsc-e-accredit/download/LOAD_LETTERS_FAILURE'

const INCREMENT_COUNTER_REQUEST =
  'ocsc-e-accredit/download/INCREMENT_COUNTER_REQUEST'
const INCREMENT_COUNTER_SUCCESS =
  'ocsc-e-accredit/download/INCREMENT_COUNTER_SUCCESS'
const INCREMENT_COUNTER_FAILURE =
  'ocsc-e-accredit/download/INCREMENT_COUNTER_FAILURE'

function loadLetters(category: number) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_LETTERS_REQUEST })
    try {
      var { data } = await axios.get('/letters', {
        params: {
          category,
        },
      })
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_LETTERS_SUCCESS,
        payload: {
          category,
          letters: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_LETTERS_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลเอกสารดาวน์โหลด/หนังสือเวียนไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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

function incrementCounter(categoryId: number, letterId: number) {
  return async (dispatch: any) => {
    dispatch({ type: INCREMENT_COUNTER_REQUEST })
    try {
      var { data } = await axios.patch(
        `/letters?category=${categoryId}&id=${letterId}`
      )
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: INCREMENT_COUNTER_SUCCESS,
        payload: {
          letters: data,
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
  LOAD_LETTERS_REQUEST,
  LOAD_LETTERS_SUCCESS,
  LOAD_LETTERS_FAILURE,
  INCREMENT_COUNTER_REQUEST,
  INCREMENT_COUNTER_SUCCESS,
  INCREMENT_COUNTER_FAILURE,
  loadLetters,
  incrementCounter,
}
