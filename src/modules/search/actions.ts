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
      var { data } = await axios.get('/curriculums/search', {
        data: {
          isGov,
          level,
          university,
          faculty,
          degree,
          branch,
          isLetter,
        },
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
  loadEducationlevels,
  searchCurriculums,
}
