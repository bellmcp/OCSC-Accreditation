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
import Loading from 'modules/ui/components/Loading'
import CertificateRenderer from './CertificateRenderer'
import * as certActions from '../actions'

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

  const { isLoading, certificate } = useSelector((state: any) => state.cert)

  useEffect(() => {
    dispatch(certActions.loadCertificate(certificateId))
  }, [dispatch, certificateId]) //eslint-disable-line

  //PRINT
  const componentRef = useRef(null)
  const onBeforeGetContentResolve = useRef<(() => void) | null>(null)
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('old boring text')
  const handleAfterPrint = useCallback(() => {}, [])
  const handleBeforePrint = useCallback(() => {}, [])
  const handleOnBeforeGetContent = useCallback(() => {
    setLoading(true)
    setText('Loading new text...')

    return new Promise<void>((resolve) => {
      onBeforeGetContentResolve.current = resolve

      setTimeout(() => {
        setLoading(false)
        setText('New, Updated Text!')
        resolve()
      }, 2000)
    })
  }, [setLoading, setText])

  const reactToPrintContent = useCallback(() => {
    return componentRef.current
  }, [componentRef.current]) //eslint-disable-line

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: `ใบรับรอง${certificateId}`,
    onBeforeGetContent: handleOnBeforeGetContent,
    onBeforePrint: handleBeforePrint,
    onAfterPrint: handleAfterPrint,
    removeAfterPrint: true,
    pageStyle:
      '@page { size: 210mm 297mm; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }',
  })

  useEffect(() => {
    if (
      text === 'New, Updated Text!' &&
      typeof onBeforeGetContentResolve.current === 'function'
    ) {
      onBeforeGetContentResolve.current()
    }
  }, [onBeforeGetContentResolve.current, text]) //eslint-disable-line

  function renderCertificateView() {
    if (isLoading) {
      return <Loading height={307} />
    } else if (certificate === null || certificate === undefined) {
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
            <CertificateRenderer ref={componentRef} />
          </Box>
          <Box my={3}>
            <Button
              variant='contained'
              color='secondary'
              startIcon={<PrintIcon />}
              onClick={handlePrint}
              size='large'
              fullWidth
            >
              {loading ? 'กำลังโหลด...' : 'สั่งพิมพ์'}
            </Button>
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
              พิมพ์ใบรับรอง
            </Typography>
          </Grid>
          {renderCertificateView()}
        </Box>
      </Container>
    </>
  )
}
