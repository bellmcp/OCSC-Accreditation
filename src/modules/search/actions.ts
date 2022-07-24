import axios from 'axios'
import { get } from 'lodash'

import * as uiActions from 'modules/ui/actions'

const LOAD_EDUCATION_LEVELS_REQUEST =
  'learning-platform/press/LOAD_EDUCATION_LEVELS_REQUEST'
const LOAD_EDUCATION_LEVELS_SUCCESS =
  'learning-platform/press/LOAD_EDUCATION_LEVELS_SUCCESS'
const LOAD_EDUCATION_LEVELS_FAILURE =
  'learning-platform/press/LOAD_EDUCATION_LEVELS_FAILURE'

const SEARCH_CURRICULUMS_REQUEST =
  'learning-platform/press/SEARCH_CURRICULUMS_REQUEST'
const SEARCH_CURRICULUMS_SUCCESS =
  'learning-platform/press/SEARCH_CURRICULUMS_SUCCESS'
const SEARCH_CURRICULUMS_FAILURE =
  'learning-platform/press/SEARCH_CURRICULUMS_FAILURE'

const INCREMENT_VISITOR_REQUEST =
  'learning-platform/press/INCREMENT_VISITOR_REQUEST'
const INCREMENT_VISITOR_SUCCESS =
  'learning-platform/press/INCREMENT_VISITOR_SUCCESS'
const INCREMENT_VISITOR_FAILURE =
  'learning-platform/press/INCREMENT_VISITOR_FAILURE'

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
          `โหลดข้อมูลผู้เยี่ยมชมไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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
        level,
        university,
        faculty,
        degree,
        branch,
        isLetter,
      })
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: SEARCH_CURRICULUMS_SUCCESS,
        payload: {
          searchResults: data,
        },
      })
    } catch (err) {
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
  loadEducationlevels,
  searchCurriculums,
  incrementVisitor,
}
