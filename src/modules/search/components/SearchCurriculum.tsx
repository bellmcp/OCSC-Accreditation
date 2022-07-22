// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

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
      zIndex: 3,
      marginBottom: '24px',
    },
    seeAllButton: {
      marginBottom: '0.35em',
      zIndex: 3,
    },
  })
)

const TITLE = 'OCSC Learning Space'
const SUBTITLE =
  'โลกแห่งการเรียนรู้ ไม่มีวันจบสิ้น ยิ่งเรียนยิ่งรู้ ยิ่งเพิ่มพลังทางปัญญา'

export default function SearchCurriculum() {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const dispatch = useDispatch()
  const history = useHistory()
  const PATH = process.env.REACT_APP_BASE_PATH

  useEffect(() => {
    dispatch(searchActions.loadEducationlevels())
  }, [dispatch])

  const handleClickSearch = () => {
    dispatch(
      searchActions.searchCurriculums({
        isGov: false,
        level: null,
        university: 'ss',
        faculty: 'xxx',
        degree: 'aa',
        branch: 'bb',
        isLetter: false,
      })
    )
  }

  const note = (
    <span style={{ color: theme.palette.primary.main, marginLeft: 2 }}>*</span>
  )

  const [selected, setSelected] = useState(null)
  const [educationLevels, setEducationLevels] = useState([])

  const { educationLevels: initalEducationLevels = [] } = useSelector(
    (state: any) => state.search
  )

  useEffect(() => {
    setEducationLevels(initalEducationLevels)
  }, [initalEducationLevels])

  const handleChange = (event: any) => {
    console.log('event :>> ', event.target)
    setSelected(event.target.value)
  }

  return (
    <>
      <Header title='FAQ' subtitle='คำถามที่พบบ่อย' icon={<div />} />
      <Container maxWidth='lg' className={classes.content}>
        <Box mt={2} mb={4}>
          <Grid container direction='row' alignItems='center'>
            <Typography
              gutterBottom
              component='h2'
              variant='h6'
              className={classes.sectionTitle}
            >
              ค้นหาการรับรองคุณวุฒิหลักสูตร
            </Typography>
          </Grid>
          <Grid container direction='column' alignItems='center' spacing={3}>
            <Grid
              container
              item
              spacing={2}
              style={{
                padding: 16,
                borderRadius: 8,
                margin: '16px 0',
                backgroundColor: 'white',
                boxShadow: '0 0 20px 0 rgba(0,0,0,0.04)',
              }}
            >
              <Grid container item direction='row' alignItems='center'>
                <Grid xs={3}>
                  <Typography
                    variant='body1'
                    color='textPrimary'
                    style={{ fontWeight: 600 }}
                  >
                    ประเภทหลักสูตร
                  </Typography>
                </Grid>
                <Grid xs={9}>
                  <RadioGroup row defaultValue='female'>
                    <FormControlLabel
                      value='female'
                      control={<Radio size='small' />}
                      label='หลักสูตรของรัฐ'
                      style={{ marginRight: 96 }}
                    />
                    <FormControlLabel
                      value='male'
                      control={<Radio size='small' />}
                      label='หลักสูตรของเอกชน'
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
              <Grid container item direction='row' alignItems='center'>
                <Grid xs={3}>
                  <Typography
                    variant='body1'
                    color='textPrimary'
                    style={{ fontWeight: 600 }}
                  >
                    ระดับการศึกษา
                  </Typography>
                </Grid>
                <Grid xs={9}>
                  <FormControl fullWidth size='small'>
                    <Select
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
                      value={selected}
                      onChange={handleChange}
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
                <Grid xs={3}>
                  <Typography
                    variant='body1'
                    color='textPrimary'
                    style={{ fontWeight: 600 }}
                  >
                    สถานะหลักสูตร
                  </Typography>
                </Grid>
                <Grid xs={9}>
                  <RadioGroup row defaultValue='female'>
                    <FormControlLabel
                      value='female'
                      control={<Radio size='small' />}
                      label='หลักสูตรที่ออกหนังสือเวียนแล้ว'
                      style={{ marginRight: 96 }}
                    />
                    <FormControlLabel
                      value='male'
                      control={<Radio size='small' />}
                      label='หลักสูตรที่รอออกหนังสือเวียน'
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              item
              spacing={2}
              style={{
                padding: 16,
                borderRadius: 8,
                margin: '16px 0',
                backgroundColor: 'white',
                boxShadow: '0 0 20px 0 rgba(0,0,0,0.04)',
              }}
            >
              <Grid container item direction='row' alignItems='center'>
                <Grid xs={12}>
                  <Typography variant='body2' color='primary'>
                    <b>*</b> ไม่จำเป็นต้องระบุข้อมูลที่ใช้ค้นหาครบทุกฟิลด์
                    จะค้นจาก มหาวิทยาลัย หรือ คณะ หรือ ชื่อปริญญา หรือ สาขาวิชา
                    หรือ ทั้งหมดก็ได้
                  </Typography>
                </Grid>
              </Grid>
              <Grid container item direction='row' alignItems='center'>
                <Grid xs={3}>
                  <Typography
                    variant='body1'
                    color='textPrimary'
                    style={{ fontWeight: 600 }}
                  >
                    มหาวิทยาลัย/สถาบันการศึกษา{note}
                  </Typography>
                </Grid>
                <Grid xs={9}>
                  <TextField
                    placeholder='ใส่คำค้นหาได้ไม่เกิน 3 คำ เช่น กกก ขขข คคค หมายถึง ในชื่อต้องมีคำค้นหาทั้งหมดปรากฏอยู่'
                    variant='outlined'
                    size='small'
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container item direction='row' alignItems='center'>
                <Grid xs={3}>
                  <Typography
                    variant='body1'
                    color='textPrimary'
                    style={{ fontWeight: 600 }}
                  >
                    คณะ/หน่วยงานที่เทียบเท่าคณะ{note}
                  </Typography>
                </Grid>
                <Grid xs={9}>
                  <TextField
                    placeholder='ใส่คำค้นหาได้ไม่เกิน 3 คำ เช่น กกก ขขข คคค หมายถึง ในชื่อต้องมีคำค้นหาทั้งหมดปรากฏอยู่'
                    variant='outlined'
                    size='small'
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container item direction='row' alignItems='center'>
                <Grid xs={3}>
                  <Typography
                    variant='body1'
                    color='textPrimary'
                    style={{ fontWeight: 600 }}
                  >
                    ชื่อปริญญา/ประกาศนียบัตร{note}
                  </Typography>
                </Grid>
                <Grid xs={9}>
                  <TextField
                    placeholder='ใส่คำค้นหาได้ไม่เกิน 3 คำ เช่น กกก ขขข คคค หมายถึง ในชื่อต้องมีคำค้นหาทั้งหมดปรากฏอยู่'
                    variant='outlined'
                    size='small'
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container item direction='row' alignItems='center'>
                <Grid xs={3}>
                  <Typography
                    variant='body1'
                    color='textPrimary'
                    style={{ fontWeight: 600 }}
                  >
                    สาขาวิชา/วิชาเอก{note}
                  </Typography>
                </Grid>
                <Grid xs={9}>
                  <TextField
                    placeholder='ใส่คำค้นหาได้ไม่เกิน 3 คำ เช่น กกก ขขข คคค หมายถึง ในชื่อต้องมีคำค้นหาทั้งหมดปรากฏอยู่'
                    variant='outlined'
                    size='small'
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant='contained'
            color='secondary'
            disableElevation
            startIcon={<SearchIcon />}
            onClick={handleClickSearch}
            style={{ marginTop: 32 }}
          >
            ค้นหา
          </Button>
        </Box>
        <Box mt={8} mb={6}>
          <Divider />
        </Box>
        <Grid container direction='row' alignItems='center'>
          <Typography
            gutterBottom
            component='h2'
            variant='h6'
            className={classes.sectionTitle}
          >
            ผลการค้นหา
          </Typography>
        </Grid>
        <Paper
          elevation={0}
          style={{
            borderRadius: 16,
            padding: 24,
            paddingTop: 12,
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
