// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'

import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles'
import {
  useMediaQuery,
  Container,
  Typography,
  Grid,
  Box,
  Select,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  FormControl,
  Paper,
  MenuItem,
  Divider,
} from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'

import * as searchActions from 'modules/search/actions'
import Header from 'modules/ui/components/Header'
import SearchResultTable from './SearchResultTable'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    sectionTitle: {
      fontSize: '1.7rem',
      fontWeight: 600,
      lineHeight: '1.3',
      zIndex: 3,
    },
    seeAllButton: {
      marginBottom: '0.35em',
      zIndex: 3,
    },
  })
)

export default function SearchCurriculum() {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const dispatch = useDispatch()

  const validationSchema = yup.object({})

  const getLevelIdByLabel = (label: string) => {
    const result = educationLevels.find((item: any) => {
      return item.level === label
    })
    return get(result, 'id', null)
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      type: 'gov',
      level: null,
      status: 'active',
      university: '',
      faculty: '',
      degree: '',
      branch: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        searchActions.searchCurriculums({
          isGov: get(values, 'type', 'gov') === 'gov',
          level: getLevelIdByLabel(get(values, 'level', null)),
          university: get(values, 'university', ''),
          faculty: get(values, 'faculty', ''),
          degree: get(values, 'degree', ''),
          branch: get(values, 'branch', ''),
          isLetter: get(values, 'status', 'active') === 'active',
        })
      )
    },
  })

  useEffect(() => {
    dispatch(searchActions.loadEducationlevels())
    dispatch(searchActions.incrementVisitor())
  }, [dispatch])

  const note = (
    <span style={{ color: theme.palette.primary.main, marginLeft: 2 }}>*</span>
  )

  const [educationLevels, setEducationLevels] = useState([])

  const {
    educationLevels: initalEducationLevels = [],
    visitor = 0,
    isIncrementing = false,
  } = useSelector((state: any) => state.search)

  useEffect(() => {
    setEducationLevels(initalEducationLevels)
  }, [initalEducationLevels])

  return (
    <>
      <Header title='FAQ' subtitle='คำถามที่พบบ่อย' icon={<div />} />
      <Container maxWidth='lg' className={classes.content}>
        <form onSubmit={formik.handleSubmit}>
          <Box mt={2} mb={4}>
            <Grid
              container
              direction='row'
              justify={matches ? 'space-between' : 'center'}
              alignItems='center'
              style={{ marginBottom: 24 }}
            >
              <Grid item xs={6}>
                <Typography
                  component='h2'
                  variant='h6'
                  className={classes.sectionTitle}
                >
                  ค้นหาการรับรองคุณวุฒิหลักสูตร
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                container
                direction='column'
                alignItems='flex-end'
                spacing={0}
              >
                <Grid item>
                  <Typography variant='body2'>จำนวนครั้งที่เข้าชม</Typography>
                </Grid>
                <Grid item>
                  <Typography variant='h6' color='secondary'>
                    <span style={{ fontWeight: 600 }}>
                      {isIncrementing ? '...' : visitor.toLocaleString()}
                    </span>{' '}
                    ครั้ง
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Paper
              elevation={0}
              style={{
                borderRadius: 16,
                padding: 24,
                boxShadow: '0 0 20px 0 rgba(0,0,0,0.04)',
              }}
            >
              <Grid container item spacing={2}>
                <Grid container item direction='row' alignItems='center'>
                  <Grid xs={12} md={3}>
                    <Typography
                      variant='body1'
                      color='textPrimary'
                      style={{ fontWeight: 600 }}
                    >
                      ประเภทหลักสูตร
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={9}>
                    <RadioGroup
                      row
                      id='type'
                      name='type'
                      value={formik.values.type}
                      onChange={formik.handleChange}
                    >
                      <FormControlLabel
                        value='gov'
                        control={<Radio size='small' />}
                        label='หลักสูตรของรัฐ'
                        style={{ marginRight: 96 }}
                      />
                      <FormControlLabel
                        value='org'
                        control={<Radio size='small' />}
                        label='หลักสูตรของเอกชน'
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>
                <Grid container item direction='row' alignItems='center'>
                  <Grid xs={12} md={3}>
                    <Typography
                      variant='body1'
                      color='textPrimary'
                      style={{ fontWeight: 600 }}
                      gutterBottom
                    >
                      ระดับการศึกษา
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={9}>
                    <FormControl fullWidth size='small'>
                      <Select
                        id='level'
                        name='level'
                        value={formik.values.level}
                        onChange={formik.handleChange}
                        variant='outlined'
                        size='small'
                        displayEmpty
                        MenuProps={{
                          anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left',
                          },
                          transformOrigin: {
                            vertical: 'top',
                            horizontal: 'left',
                          },
                          getContentAnchorEl: null,
                        }}
                        renderValue={(selected) => {
                          if (selected === null) {
                            return (
                              <span
                                style={{ color: theme.palette.text.secondary }}
                              >
                                เลือกระดับการศึกษา
                              </span>
                            )
                          }
                          return selected
                        }}
                      >
                        {educationLevels.map((educationLevel: any) => (
                          <MenuItem value={get(educationLevel, 'level', '')}>
                            {get(educationLevel, 'level', '')}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        <Typography variant='body2' color='textSecondary'>
                          ระดับปวช./ปวส.
                          ที่ใช้หลักสูตรกลางของอาชีวะไม่ต้องระบุสถานศึกษา
                        </Typography>
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container item direction='row' alignItems='center'>
                  <Grid xs={12} md={3}>
                    <Typography
                      variant='body1'
                      color='textPrimary'
                      style={{ fontWeight: 600 }}
                    >
                      สถานะหลักสูตร
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={9}>
                    <RadioGroup
                      row
                      id='status'
                      name='status'
                      value={formik.values.status}
                      onChange={formik.handleChange}
                    >
                      <FormControlLabel
                        value='active'
                        control={<Radio size='small' />}
                        label='หลักสูตรที่ออกหนังสือเวียนแล้ว'
                        style={{ marginRight: 96 }}
                      />
                      <FormControlLabel
                        value='pending'
                        control={<Radio size='small' />}
                        label='หลักสูตรที่รอออกหนังสือเวียน'
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <Paper
              elevation={0}
              style={{
                borderRadius: 16,
                padding: 24,
                boxShadow: '0 0 20px 0 rgba(0,0,0,0.04)',
                minHeight: 300,
                marginTop: 24,
              }}
            >
              <Grid container item spacing={2}>
                <Grid container item direction='row' alignItems='center'>
                  <Grid xs={12}>
                    <Typography variant='body2' color='primary'>
                      <b>*</b> ไม่จำเป็นต้องระบุข้อมูลที่ใช้ค้นหาครบทุกฟิลด์
                      จะค้นจาก มหาวิทยาลัย หรือ คณะ หรือ ชื่อปริญญา หรือ
                      สาขาวิชา หรือ ทั้งหมดก็ได้
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item direction='row' alignItems='center'>
                  <Grid xs={12} md={3}>
                    <Typography
                      variant='body1'
                      color='textPrimary'
                      style={{ fontWeight: 600 }}
                      gutterBottom
                    >
                      มหาวิทยาลัย/สถาบันการศึกษา{note}
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={9}>
                    <TextField
                      id='university'
                      name='university'
                      value={formik.values.university}
                      onChange={formik.handleChange}
                      placeholder='ใส่คำค้นหาได้ไม่เกิน 3 คำ เช่น กกก ขขข คคค หมายถึง ในชื่อต้องมีคำค้นหาทั้งหมดปรากฏอยู่'
                      variant='outlined'
                      size='small'
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid container item direction='row' alignItems='center'>
                  <Grid xs={12} md={3}>
                    <Typography
                      variant='body1'
                      color='textPrimary'
                      style={{ fontWeight: 600 }}
                      gutterBottom
                    >
                      คณะ/หน่วยงานที่เทียบเท่าคณะ{note}
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={9}>
                    <TextField
                      id='faculty'
                      name='faculty'
                      value={formik.values.faculty}
                      onChange={formik.handleChange}
                      placeholder='ใส่คำค้นหาได้ไม่เกิน 3 คำ เช่น กกก ขขข คคค หมายถึง ในชื่อต้องมีคำค้นหาทั้งหมดปรากฏอยู่'
                      variant='outlined'
                      size='small'
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid container item direction='row' alignItems='center'>
                  <Grid xs={12} md={3}>
                    <Typography
                      variant='body1'
                      color='textPrimary'
                      style={{ fontWeight: 600 }}
                      gutterBottom
                    >
                      ชื่อปริญญา/ประกาศนียบัตร{note}
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={9}>
                    <TextField
                      id='degree'
                      name='degree'
                      value={formik.values.degree}
                      onChange={formik.handleChange}
                      placeholder='ใส่คำค้นหาได้ไม่เกิน 3 คำ เช่น กกก ขขข คคค หมายถึง ในชื่อต้องมีคำค้นหาทั้งหมดปรากฏอยู่'
                      variant='outlined'
                      size='small'
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid container item direction='row' alignItems='center'>
                  <Grid xs={12} md={3}>
                    <Typography
                      variant='body1'
                      color='textPrimary'
                      style={{ fontWeight: 600 }}
                      gutterBottom
                    >
                      สาขาวิชา/วิชาเอก{note}
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={9}>
                    <TextField
                      id='branch'
                      name='branch'
                      value={formik.values.branch}
                      onChange={formik.handleChange}
                      placeholder='ใส่คำค้นหาได้ไม่เกิน 3 คำ เช่น กกก ขขข คคค หมายถึง ในชื่อต้องมีคำค้นหาทั้งหมดปรากฏอยู่'
                      variant='outlined'
                      size='small'
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <Button
              fullWidth
              variant='contained'
              color='secondary'
              disableElevation
              startIcon={<SearchIcon />}
              style={{ marginTop: 32 }}
              type='submit'
            >
              ค้นหา
            </Button>
          </Box>
        </form>
        <Box mt={6} mb={4}>
          <Divider />
        </Box>
        <Grid
          container
          direction='row'
          justify={matches ? 'space-between' : 'center'}
          alignItems='center'
        >
          <Typography
            gutterBottom
            component='h2'
            variant='h6'
            className={classes.sectionTitle}
            align={matches ? 'left' : 'center'}
            style={{ marginBottom: 24 }}
          >
            ผลการค้นหา
          </Typography>
        </Grid>
        <Paper
          elevation={0}
          style={{
            borderRadius: 16,
            padding: 24,
            paddingTop: 8,
            boxShadow: '0 0 20px 0 rgba(0,0,0,0.04)',
            minHeight: 300,
          }}
        >
          <SearchResultTable />
        </Paper>
      </Container>
    </>
  )
}
