// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar'
import useKonami from 'use-konami'
import {
  CssBaseline,
  Snackbar,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Divider,
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
    },
  })

  // DEBUG DIALOG
  useKonami({
    onUnlock: () => setDebugDialogOpen(true),
  })
  const [debugDialogOpen, setDebugDialogOpen] = useState(false)
  const handleDebugDialogClose = () => {
    setDebugDialogOpen(false)
  }

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
      {/* DEBUG DIALOG */}
      <Dialog open={debugDialogOpen} onClose={handleDebugDialogClose}>
        <DialogTitle onClose={handleDebugDialogClose}>เกี่ยวกับ</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom style={{ fontWeight: 600 }} variant='body1'>
            OCSC LEARNING SPACE (LEARNER PART)
            <br />
            Version 2.1.2
          </Typography>
          <Divider style={{ margin: '16px 0' }} />
          <Typography gutterBottom style={{ fontWeight: 600 }}>
            Developer
          </Typography>
          <Typography gutterBottom variant='body2'>
            WUTIPAT KHAMNUANSIN (Front-End)
            <br />
            ANUNYA PRASONGKIAT (Back-End)
          </Typography>
          <Divider style={{ margin: '16px 0' }} />
          <Typography gutterBottom style={{ fontWeight: 600 }}>
            Advisor
          </Typography>
          <Typography gutterBottom variant='body2'>
            ASSOC. PROF. CHATCHAWIT APORNTEWAN, Ph.D.
          </Typography>
          <Divider style={{ margin: '16px 0' }} />
          <Typography gutterBottom variant='caption' color='textSecondary'>
            Licensed under{' '}
            <Link
              href='https://github.com/bellmcp/OCSC-Learning-Platform/blob/master/LICENSE'
              target='_blank'
              rel='noopener noreferrer'
            >
              The GNU General Public License v3.0 License
            </Link>
            .
            <br />
            Copyright © {new Date().getFullYear()}{' '}
            <Link
              href='https://www.ocsc.go.th/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Office of the Civil Service Commission (OCSC)
            </Link>
            , All rights reserved.
          </Typography>
        </DialogContent>
      </Dialog>
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
    </ThemeProvider>
  )
}
