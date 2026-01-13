import React, { useRef, useState, useCallback, useEffect } from 'react'
import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { useReactToPrint } from 'react-to-print'
import { useParams } from 'react-router-dom'
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  List,
  ListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {
  Print as PrintIcon,
  Inbox as InboxIcon,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons'

import Header from 'modules/ui/components/Header'
import JobTable from './JobTable'
import * as jobActions from '../actions'
import * as certActions from 'modules/cert/actions'
import JobTableRenderer from './JobTableRenderer'
import Loading from 'modules/ui/components/Loading'

import {
  purple,
  indigo,
  amber,
  deepOrange,
  green,
  blue,
  brown,
  grey,
  red,
} from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
  },
  content: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  mr8: {
    marginRight: 8,
  },
  mr27: {
    marginRight: 27,
  },
  sectionTitle: {
    fontSize: '1.7rem',
    fontWeight: 600,
    lineHeight: '1.3',
    zIndex: 3,
    color: theme.palette.secondary.main,
    marginBottom: 16,
  },
  closeJobsTitle: {
    color: red[500],
  },
  semiJobsTitle: {
    color: amber[600],
  },
  openJobsTitle: {
    color: green[500],
  },
  jobDescription: {
    marginBottom: 16,
    lineHeight: 1.6,
    '& b': {
      fontWeight: 600,
    },
  },
  accordion: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
    '&:before': {
      display: 'none',
    },
    '&.Mui-expanded': {
      margin: 0,
    },
  },
  accordionSummary: {
    padding: 0,
    paddingLeft: 24,
    paddingRight: 24,
    minHeight: 'unset',
    '&.Mui-expanded': {
      minHeight: 'unset',
    },
    '& .MuiAccordionSummary-content': {
      margin: 0,
      '&.Mui-expanded': {
        margin: 0,
      },
    },
  },
  accordionDetails: {
    padding: 0,
    paddingTop: 8,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    flexDirection: 'column',
  },
  closeAccordion: {
    borderLeft: `4px solid ${red[500]}`,
    paddingLeft: 16,
    marginBottom: 24,
  },
  semiAccordion: {
    borderLeft: `4px solid ${amber[700]}`,
    paddingLeft: 16,
    marginBottom: 24,
  },
  openAccordion: {
    borderLeft: `4px solid ${green[500]}`,
    paddingLeft: 16,
    marginBottom: 24,
  },
  expandAllButton: {
    marginBottom: 16,
    textTransform: 'none',
  },
}))

const parseLinkToDefaultColor = (text: string) => {
  return text.replace(/<a/g, '<a class="custom_link"')
}

const getLabel = (row: any, fieldName: string) => {
  const result = get(row, fieldName, null)
  if (result === null || result === undefined || result === '') {
    return '-'
  } else {
    return result
  }
}

export default function Certficate() {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useDispatch()

  const { id: certificateId }: any = useParams()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const { certificate, isLoading } = useSelector((state: any) => state.cert)

  const {
    isLoading: isJobsLoading,
    isError: isJobsError,
    jobDesc1,
    jobDesc2,
    jobDesc3,
    closeJobs,
    semiJobs,
    openJobs,
  } = useSelector((state: any) => state.job)

  const [expandAllClose, setExpandAllClose] = useState<boolean | null>(null)
  const [expandAllSemi, setExpandAllSemi] = useState<boolean | null>(null)
  const [expandAllOpen, setExpandAllOpen] = useState<boolean | null>(null)

  useEffect(() => {
    dispatch(certActions.loadCertificate(certificateId))
    dispatch(jobActions.loadJobPositions(certificateId))
  }, [dispatch, certificateId]) //eslint-disable-line

  function renderCertificateDetails() {
    if (isLoading) {
      return <Loading height={307} />
    } else if (
      certificate === null ||
      certificate === undefined ||
      get(certificate, 'cert', false) === false
    ) {
      return (
        <Box my={15}>
          <Grid
            container
            direction='column'
            justify='center'
            alignItems='center'
            style={{ height: 150 }}
          >
            <InboxIcon
              color='disabled'
              style={{ fontSize: 54, marginBottom: 14 }}
            />
            <Typography component='h2' variant='body2' color='textSecondary'>
              ไม่พบใบรับรอง
            </Typography>
          </Grid>
        </Box>
      )
    } else {
      return (
        <>
          <Box>
            <List>
              <ListItem divider>
                <Box style={{ flexBasis: '25%', flexShrink: 0 }}>
                  <Typography variant='body2' style={{ fontWeight: 600 }}>
                    มหาวิทยาลัย/สถาบันการศึกษา
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='body2' color='secondary'>
                    {getLabel(certificate, 'university')}
                  </Typography>
                </Box>
              </ListItem>
              <ListItem divider>
                <Box style={{ flexBasis: '25%', flexShrink: 0 }}>
                  <Typography variant='body2' style={{ fontWeight: 600 }}>
                    ชื่อปริญญา/ประกาศนียบัตร
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='body2' color='secondary'>
                    {getLabel(certificate, 'degree')}
                  </Typography>
                </Box>
              </ListItem>
              <ListItem divider>
                <Box style={{ flexBasis: '25%', flexShrink: 0 }}>
                  <Typography variant='body2' style={{ fontWeight: 600 }}>
                    สาขา/วิชาเอก
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='body2' color='secondary'>
                    {getLabel(certificate, 'branch')}
                  </Typography>
                </Box>
              </ListItem>
              <ListItem divider>
                <Box style={{ flexBasis: '25%', flexShrink: 0 }}>
                  <Typography variant='body2' style={{ fontWeight: 600 }}>
                    ระดับการศึกษา
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='body2' color='secondary'>
                    {getLabel(certificate, 'level')}
                  </Typography>
                </Box>
              </ListItem>
              <ListItem divider>
                <Box style={{ flexBasis: '25%', flexShrink: 0 }}>
                  <Typography variant='body2' style={{ fontWeight: 600 }}>
                    คณะ/หน่วยงาน
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='body2' color='secondary'>
                    {getLabel(certificate, 'faculty')}
                  </Typography>
                </Box>
              </ListItem>
              <ListItem divider>
                <Box style={{ flexBasis: '25%', flexShrink: 0 }}>
                  <Typography
                    variant='body2'
                    style={{ lineHeight: '1.2', fontWeight: 600 }}
                  >
                    ผลการรับรอง
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant='body2'
                    gutterBottom
                    color='secondary'
                    style={{ lineHeight: '1.2', fontWeight: 500 }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: parseLinkToDefaultColor(
                          getLabel(certificate, 'accreditation1')
                        ),
                      }}
                    ></div>
                  </Typography>
                  <Typography
                    variant='caption'
                    color='secondary'
                    style={{ lineHeight: '1.2' }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: parseLinkToDefaultColor(
                          getLabel(certificate, 'accreditation2')
                        ),
                      }}
                    ></div>
                  </Typography>
                </Box>
              </ListItem>
              <ListItem divider>
                <Box style={{ flexBasis: '25%', flexShrink: 0 }}>
                  <Typography variant='body2' style={{ fontWeight: 600 }}>
                    หมายเหตุ
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='body2' color='secondary'>
                    {getLabel(certificate, 'note')}
                  </Typography>
                </Box>
              </ListItem>
              <ListItem divider>
                <Box style={{ flexBasis: '25%', flexShrink: 0 }}>
                  <Typography variant='body2' style={{ fontWeight: 600 }}>
                    เลขที่หนังสือเวียน
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='body2' color='secondary'>
                    {getLabel(certificate, 'letterNo')}
                  </Typography>
                </Box>
              </ListItem>
              <ListItem divider>
                <Box style={{ flexBasis: '25%', flexShrink: 0 }}>
                  <Typography variant='body2' style={{ fontWeight: 600 }}>
                    ลงวันที่
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='body2' color='secondary'>
                    {getLabel(certificate, 'letterDate')}
                  </Typography>
                </Box>
              </ListItem>
              <ListItem divider>
                <Box style={{ flexBasis: '25%', flexShrink: 0 }}>
                  <Typography variant='body2' style={{ fontWeight: 600 }}>
                    เลขที่อ้างอิง
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='body2' color='secondary'>
                    {getLabel(certificate, 'id')}
                  </Typography>
                </Box>
              </ListItem>
            </List>
          </Box>
          <Box my={6} style={{ overflow: 'auto' }}>
            {/* สายงานปิด */}
            <Accordion
              defaultExpanded
              className={`${classes.accordion} ${classes.closeAccordion}`}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{ color: red[500] }} />}
                className={classes.accordionSummary}
              >
                <Typography
                  component='h2'
                  variant='h5'
                  className={classes.closeJobsTitle}
                  style={{ fontWeight: 600 }}
                >
                  สายงานปิด
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetails}>
                {jobDesc1 && (
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    className={classes.jobDescription}
                    dangerouslySetInnerHTML={{ __html: jobDesc1 }}
                  />
                )}
                {closeJobs && closeJobs.length > 0 && (
                  <Button
                    variant='outlined'
                    className={classes.expandAllButton}
                    onClick={() =>
                      setExpandAllClose(expandAllClose === true ? false : true)
                    }
                    style={{ borderColor: red[500], color: red[500] }}
                  >
                    {expandAllClose === true ? 'ย่อทั้งหมด' : 'ขยายทั้งหมด'}
                  </Button>
                )}
                <JobTableRenderer
                  isLoading={isJobsLoading}
                  isError={isJobsError}
                  data={closeJobs}
                  colorScheme='close'
                  expandAll={expandAllClose}
                  onResetExpandAll={() => setExpandAllClose(null)}
                />
              </AccordionDetails>
            </Accordion>

            {/* สายงานกึ่งปิด */}
            <Accordion
              defaultExpanded
              className={`${classes.accordion} ${classes.semiAccordion}`}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{ color: amber[700] }} />}
                className={classes.accordionSummary}
              >
                <Typography
                  component='h2'
                  variant='h5'
                  className={classes.semiJobsTitle}
                  style={{ fontWeight: 600 }}
                >
                  สายงานกึ่งปิด
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetails}>
                {jobDesc2 && (
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    className={classes.jobDescription}
                    dangerouslySetInnerHTML={{ __html: jobDesc2 }}
                  />
                )}
                {semiJobs && semiJobs.length > 0 && (
                  <Button
                    variant='outlined'
                    className={classes.expandAllButton}
                    onClick={() =>
                      setExpandAllSemi(expandAllSemi === true ? false : true)
                    }
                    style={{ borderColor: amber[700], color: amber[700] }}
                  >
                    {expandAllSemi === true ? 'ย่อทั้งหมด' : 'ขยายทั้งหมด'}
                  </Button>
                )}
                <JobTableRenderer
                  isLoading={isJobsLoading}
                  isError={isJobsError}
                  data={semiJobs}
                  colorScheme='semi'
                  expandAll={expandAllSemi}
                  onResetExpandAll={() => setExpandAllSemi(null)}
                />
              </AccordionDetails>
            </Accordion>

            {/* สายงานเปิด */}
            <Accordion
              defaultExpanded
              className={`${classes.accordion} ${classes.openAccordion}`}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{ color: green[500] }} />}
                className={classes.accordionSummary}
              >
                <Typography
                  component='h2'
                  variant='h5'
                  className={classes.openJobsTitle}
                  style={{ fontWeight: 600 }}
                >
                  สายงานเปิด
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetails}>
                {jobDesc3 && (
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    className={classes.jobDescription}
                    dangerouslySetInnerHTML={{ __html: jobDesc3 }}
                  />
                )}
                {openJobs && openJobs.length > 0 && (
                  <Button
                    variant='outlined'
                    className={classes.expandAllButton}
                    onClick={() =>
                      setExpandAllOpen(expandAllOpen === true ? false : true)
                    }
                    style={{ borderColor: green[500], color: green[500] }}
                  >
                    {expandAllOpen === true ? 'ย่อทั้งหมด' : 'ขยายทั้งหมด'}
                  </Button>
                )}
                <JobTableRenderer
                  isLoading={isJobsLoading}
                  isError={isJobsError}
                  data={openJobs}
                  colorScheme='open'
                  expandAll={expandAllOpen}
                  onResetExpandAll={() => setExpandAllOpen(null)}
                />
              </AccordionDetails>
            </Accordion>
          </Box>
        </>
      )
    }
  }

  return (
    <>
      <Header />
      <Container maxWidth='lg' className={classes.content}>
        <Box mt={2} mb={4}>
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
              color='secondary'
              className={classes.sectionTitle}
              align={matches ? 'left' : 'center'}
            >
              <span style={{ color: '#FF3281' }}>ตัวอย่าง</span>
              ตำแหน่งงานราชการพลเรือนสำหรับผู้สำเร็จการศึกษาหลักสูตรนี้
            </Typography>
          </Grid>
          {renderCertificateDetails()}
        </Box>
      </Container>
    </>
  )
}
