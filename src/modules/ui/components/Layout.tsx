// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar'
import {
  CssBaseline,
  Snackbar,
  IconButton,
  Slide,
  Container,
  Grid,
  Typography,
  Button,
  Link,
} from '@material-ui/core'
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles'
import { Close as CloseIcon } from '@material-ui/icons'
import Alert from '@material-ui/lab/Alert'

import * as actions from '../actions'
import NavBar from './NavBar'
import Routes from './Routes'
import Footer from './Footer'

import { setCookie, getCookie } from 'utils/cookies'

export default function Layout() {
  const { pathname } = useLocation()
  const PATH = process.env.REACT_APP_BASE_PATH
  const dispatch = useDispatch()
  const { isSnackbarOpen, flashMessage, alertType } = useSelector(
    (state) => state.ui
  )
  const closeFlashMessage = () => dispatch(actions.clearFlashMessage())

  useEffect(() => {
    const setInitialActivePage = () => {
      switch (pathname) {
        case `${PATH}`:
          setActivePage(0)
          break
        case `${PATH}/search/curriculum`:
          setActivePage(1)
          break
        case `${PATH}/edu/international`:
          setActivePage(2)
          break
        case `${PATH}/download`:
          setActivePage(3)
          break
        case `${PATH}/faq`:
          setActivePage(4)
          break
        default:
          setActivePage(99)
          break
      }
    }
    setInitialActivePage()
  }, [pathname]) //eslint-disable-line

  const [activePage, setActivePage] = useState(0)
  const [isCookieBannerOpen, setIsCookieBannerOpen] = useState(true)

  const defaultTheme = createMuiTheme()

  const theme = createMuiTheme({
    typography: {
      fontFamily: ['Prompt', 'sans-serif'].join(','),
    },
    overrides: {
      MuiAccordion: {
        root: {
          '&:before': {
            backgroundColor: 'transparent',
          },
        },
      },
      MuiButton: {
        root: {
          borderRadius: 24,
        },
      },
      MuiToolbar: {
        gutters: {
          [defaultTheme.breakpoints.up('xs')]: {
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
      },
      MuiCardContent: {
        root: {
          padding: 0,
          '&:last-child': {
            paddingBottom: 0,
          },
        },
      },
    },
    breakpoints: {
      values: {
        sm: 670,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    palette: {
      primary: {
        main: process.env.REACT_APP_PRIMARY_COLOR_HEX,
      },
      secondary: {
        main: process.env.REACT_APP_SECONDARY_COLOR_HEX,
      },
      background: {
        default: '#f7feff',
      },
    },
  })

  const handleClickAcceptCookie = () => {
    setCookie('AcceptCookie', 'true', 9999)
    setIsCookieBannerOpen(false)
  }

  useEffect(() => {
    const isCookieAccecpted = getCookie('AcceptCookie')
    setIsCookieBannerOpen(!isCookieAccecpted)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoadingBar
        maxProgress={100}
        updateTime={100}
        style={{
          zIndex: 9999999999,
          height: 2,
          backgroundColor: theme.palette.primary.main,
          transition: 'all 5s ease 3s',
        }}
      />
      <NavBar active={activePage} setActivePage={setActivePage} />
      <Routes />
      <Snackbar
        open={isSnackbarOpen}
        onClose={closeFlashMessage}
        message={flashMessage}
        autoHideDuration={6000}
        action={
          <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={closeFlashMessage}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        }
      >
        <Alert
          onClose={closeFlashMessage}
          severity={alertType ? alertType : 'info'}
          elevation={6}
          variant='filled'
        >
          {flashMessage}
        </Alert>
      </Snackbar>
      <Footer />
      <Slide
        direction='up'
        in={isCookieBannerOpen}
        timeout={{ enter: 2000, exit: 1000 }}
      >
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100vw',
            zIndex: 1199,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            // backdropFilter: 'saturate(180%) blur(20px)',
            boxShadow: 'rgb(0 0 0 / 15%) 0px 0px 10px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Container maxWidth='lg'>
            <Grid
              container
              spacing={2}
              justify='space-between'
              alignItems='center'
              style={{ padding: '18px 12px' }}
            >
              <Grid item>
                <Typography
                  variant='body1'
                  color='textPrimary'
                  style={{ fontWeight: 500 }}
                >
                  เราใช้คุกกี้เพื่อพัฒนาประสิทธิภาพ
                  และประสบการณ์ที่ดีในการใช้เว็บไซต์ของคุณ
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  คุณสามารถศึกษารายละเอียดได้ที่{' '}
                  <Link
                    href='https://www.ocsc.go.th/cookies-policy'
                    target='_blank'
                  >
                    นโยบายคุ้กกี้
                  </Link>
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  color='secondary'
                  style={{ borderRadius: 24 }}
                  onClick={handleClickAcceptCookie}
                >
                  ยอมรับ
                </Button>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Slide>
    </ThemeProvider>
  )
}
