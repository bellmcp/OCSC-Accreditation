import axios from 'axios'
import { get } from 'lodash'

import * as uiActions from 'modules/ui/actions'

// import { mock } from './mock'

const LOAD_EDUCATION_LEVELS_REQUEST =
  'ocsc-e-accredit/search/LOAD_EDUCATION_LEVELS_REQUEST'
const LOAD_EDUCATION_LEVELS_SUCCESS =
  'ocsc-e-accredit/search/LOAD_EDUCATION_LEVELS_SUCCESS'
const LOAD_EDUCATION_LEVELS_FAILURE =
  'ocsc-e-accredit/search/LOAD_EDUCATION_LEVELS_FAILURE'

const SEARCH_CURRICULUMS_REQUEST =
  'ocsc-e-accredit/search/SEARCH_CURRICULUMS_REQUEST'
const SEARCH_CURRICULUMS_SUCCESS =
  'ocsc-e-accredit/search/SEARCH_CURRICULUMS_SUCCESS'
const SEARCH_CURRICULUMS_FAILURE =
  'ocsc-e-accredit/search/SEARCH_CURRICULUMS_FAILURE'

const INCREMENT_VISITOR_REQUEST =
  'ocsc-e-accredit/search/INCREMENT_VISITOR_REQUEST'
const INCREMENT_VISITOR_SUCCESS =
  'ocsc-e-accredit/search/INCREMENT_VISITOR_SUCCESS'
const INCREMENT_VISITOR_FAILURE =
  'ocsc-e-accredit/search/INCREMENT_VISITOR_FAILURE'

const LOAD_ACCREDITATION_INFO_REQUEST =
  'ocsc-e-accredit/search/LOAD_ACCREDITATION_INFO_REQUEST'
const LOAD_ACCREDITATION_INFO_SUCCESS =
  'ocsc-e-accredit/search/LOAD_ACCREDITATION_INFO_SUCCESS'
const LOAD_ACCREDITATION_INFO_FAILURE =
  'ocsc-e-accredit/search/LOAD_ACCREDITATION_INFO_FAILURE'

const CLEAR_SEARCH_RESULT = 'ocsc-e-accredit/search/CLEAR_SEARCH_RESULT'

const INCREMENT_COUNTER_REQUEST =
  'ocsc-e-accredit/search/INCREMENT_COUNTER_REQUEST'
const INCREMENT_COUNTER_SUCCESS =
  'ocsc-e-accredit/search/INCREMENT_COUNTER_SUCCESS'
const INCREMENT_COUNTER_FAILURE =
  'ocsc-e-accredit/search/INCREMENT_COUNTER_FAILURE'

function loadEducationlevels() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_EDUCATION_LEVELS_REQUEST })
    try {
      var { data } = await axios.get('/educationlevels')
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_EDUCATION_LEVELS_SUCCESS,
        payload: {
          educationLevels: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_EDUCATION_LEVELS_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลระดับการศึกษาไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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

function incrementVisitor() {
  return async (dispatch: any) => {
    dispatch({ type: INCREMENT_VISITOR_REQUEST })
    try {
      var { data } = await axios.put('/counters/approcurr')
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

function searchCurriculums({
  isGov,
  isPrivate,
  level,
  university,
  faculty,
  degree,
  branch,
  isLetter,
}: any) {
  return async (dispatch: any) => {
    dispatch({ type: SEARCH_CURRICULUMS_REQUEST })
    try {
      var { data } = await axios.post('/curriculums/search', {
        isGov,
        isPrivate,
        level,
        university,
        faculty,
        degree,
        branch,
        isLetter,
      })
      if (data.length === 0) {
        data = []
        dispatch(
          uiActions.setFlashMessage(
            'ไม่พบผลลัพธ์การค้นหา โปรดลองใหม่อีกครั้ง',
            'info'
          )
        )
      }
      dispatch({
        type: SEARCH_CURRICULUMS_SUCCESS,
        payload: {
          searchResults: data,
        },
      })
    } catch (err) {
      // dispatch({
      //   type: SEARCH_CURRICULUMS_SUCCESS,
      //   payload: {
      //     searchResults: mock,
      //   },
      // })
      dispatch({ type: SEARCH_CURRICULUMS_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดผลการค้นหาไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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

function loadAccredtitationInfo() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_ACCREDITATION_INFO_REQUEST })
    try {
      var { data } = await axios.get('/constants/accreditationinfo')
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_ACCREDITATION_INFO_SUCCESS,
        payload: {
          accreditationInfo: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_ACCREDITATION_INFO_FAILURE })
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

function clearSearchResult() {
  return (dispatch: any) => {
    dispatch({
      type: CLEAR_SEARCH_RESULT,
    })
  }
}

function incrementCounter(curriculumId: number) {
  return async (dispatch: any) => {
    dispatch({ type: INCREMENT_COUNTER_REQUEST })
    try {
      var { data } = await axios.patch(`/curriculums/${curriculumId}`)
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: INCREMENT_COUNTER_SUCCESS,
        payload: {
          searchResults: data,
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
  LOAD_EDUCATION_LEVELS_REQUEST,
  LOAD_EDUCATION_LEVELS_SUCCESS,
  LOAD_EDUCATION_LEVELS_FAILURE,
  SEARCH_CURRICULUMS_REQUEST,
  SEARCH_CURRICULUMS_SUCCESS,
  SEARCH_CURRICULUMS_FAILURE,
  INCREMENT_VISITOR_REQUEST,
  INCREMENT_VISITOR_SUCCESS,
  INCREMENT_VISITOR_FAILURE,
  LOAD_ACCREDITATION_INFO_REQUEST,
  LOAD_ACCREDITATION_INFO_SUCCESS,
  LOAD_ACCREDITATION_INFO_FAILURE,
  CLEAR_SEARCH_RESULT,
  INCREMENT_COUNTER_REQUEST,
  INCREMENT_COUNTER_SUCCESS,
  INCREMENT_COUNTER_FAILURE,
  loadEducationlevels,
  searchCurriculums,
  incrementVisitor,
  loadAccredtitationInfo,
  clearSearchResult,
  incrementCounter,
}
