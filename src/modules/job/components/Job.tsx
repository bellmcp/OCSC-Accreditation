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
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Print as PrintIcon, Inbox as InboxIcon } from '@material-ui/icons'

import Header from 'modules/ui/components/Header'
import JobTable from './JobTable'
import * as jobActions from '../actions'
import * as certActions from 'modules/cert/actions'
import JobTableRenderer from './JobTableRenderer'
import Loading from 'modules/ui/components/Loading'

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
    isCloseJobsLoading,
    isCloseJobsError,
    closeJobs,
    isOpenJobsLoading,
    isOpenJobsError,
    openJobs,
    isSemiJobsLoading,
    isSemiJobsError,
    semiJobs,
  } = useSelector((state: any) => state.job)

  useEffect(() => {
    dispatch(certActions.loadCertificate(certificateId))
    dispatch(jobActions.loadCloseJobs(certificateId))
    dispatch(jobActions.loadOpenJobs(certificateId))
    dispatch(jobActions.loadSemiJobs(certificateId))
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
            <Typography
              gutterBottom
              component='h2'
              variant='h6'
              color='secondary'
              align={matches ? 'left' : 'center'}
              style={{ fontWeight: 600 }}
            >
              สายงานปิด
            </Typography>
            <JobTableRenderer
              isLoading={isCloseJobsLoading}
              isError={isCloseJobsError}
              data={closeJobs}
            />
            <Typography
              gutterBottom
              component='h2'
              variant='h6'
              color='secondary'
              align={matches ? 'left' : 'center'}
              style={{ fontWeight: 600, marginTop: 32 }}
            >
              สายงานกึ่งเปิด
            </Typography>
            <JobTableRenderer
              isLoading={isSemiJobsLoading}
              isError={isSemiJobsError}
              data={semiJobs}
            />
            <Typography
              gutterBottom
              component='h2'
              variant='h6'
              color='secondary'
              align={matches ? 'left' : 'center'}
              style={{ fontWeight: 600, marginTop: 32 }}
            >
              สายงานเปิด
            </Typography>
            <JobTableRenderer
              isLoading={isOpenJobsLoading}
              isError={isOpenJobsError}
              data={openJobs}
            />
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
              ตำแหน่งงานสำหรับผู้สำเร็จการศึกษาหลักสูตรนี้
            </Typography>
          </Grid>
          {renderCertificateDetails()}
        </Box>
      </Container>
    </>
  )
}
