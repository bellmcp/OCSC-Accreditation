import React, { useState, useEffect } from 'react'
import { get } from 'lodash'
import SwipeableViews from 'react-swipeable-views'
import { useDispatch, useSelector } from 'react-redux'

import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles'
import {
  Container,
  Typography,
  Grid,
  Box,
  Tabs,
  Tab,
  Paper,
  useMediaQuery,
} from '@material-ui/core'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import ApartmentIcon from '@material-ui/icons/Apartment'
import SchoolIcon from '@material-ui/icons/School'
import DescriptionIcon from '@material-ui/icons/Description'

import Header from 'modules/ui/components/Header'
import Loading from 'modules/ui/components/Loading'
import DownloadTable from './DownloadTable'

import * as downloadActions from 'modules/download/actions'

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
      lineHeight: '1.3',
    },
    table: {
      minWidth: 650,
    },
  })
)

function TabPanel(props: any) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function createData(
  id: number,
  date: string,
  no: string,
  subject: string,
  url: string,
  counter: number
) {
  return { id, date, no, subject, url, counter }
}

export default function Download() {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useDispatch()
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [tableData, setTableData] = useState([])
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const { letters: initialLetters = [], isLoading = false } = useSelector(
    (state: any) => state.download
  )

  useEffect(() => {
    dispatch(downloadActions.loadLetters(activeTabIndex + 1))
  }, [dispatch, activeTabIndex]) //eslint-disable-line

  useEffect(() => {
    const parsedData = initialLetters.map((letter: any) =>
      createData(
        get(letter, 'id'),
        get(letter, 'date'),
        get(letter, 'no'),
        get(letter, 'subject'),
        get(letter, 'url'),
        get(letter, 'counter')
      )
    )
    setTableData(parsedData)
  }, [initialLetters])

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTabIndex(newValue)
  }

  const handleChangeIndex = (index: number) => {
    setActiveTabIndex(index)
  }

  const incrementCounterValue = (categoryId: number, letterId: number) => {
    if (categoryId !== activeTabIndex + 1) {
      return
    }

    const updatedData = tableData.map((letter: any) => {
      if (letter.id === letterId) {
        return { ...letter, counter: letter.counter + 1 }
      } else {
        return letter
      }
    })
    setTableData(updatedData as any)
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
              เอกสารดาวน์โหลด/หนังสือเวียน
            </Typography>
          </Grid>
          <Paper
            elevation={0}
            style={{
              borderRadius: 16,
              boxShadow: '0 0 20px 0 rgba(204,242,251,0.3)',
              border: '1px solid rgb(204 242 251)',
            }}
          >
            <Tabs
              value={activeTabIndex}
              indicatorColor='primary'
              textColor='primary'
              onChange={handleChange}
              centered
              variant='fullWidth'
              style={{
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Tab
                value={0}
                icon={<AccountBalanceIcon />}
                label='หนังสือเวียนภาครัฐ'
                style={{
                  borderTopLeftRadius: 16,
                  lineHeight: '1.2',
                  paddingTop: 16,
                  paddingBottom: 16,
                }}
              />
              <Tab
                value={1}
                icon={<ApartmentIcon />}
                label='หนังสือเวียนภาคเอกชน'
                style={{ lineHeight: '1.2', paddingTop: 16, paddingBottom: 16 }}
              />
              <Tab
                value={2}
                icon={<SchoolIcon />}
                label='หนังสือเวียนที่เกี่ยวข้องกับการรับรองรายชื่อปริญญาต่าง ๆ'
                style={{ lineHeight: '1.2', paddingTop: 16, paddingBottom: 16 }}
              />
              <Tab
                value={3}
                icon={<DescriptionIcon />}
                label='หนังสือเวียนอื่น ๆ ที่เกี่ยวข้อง'
                style={{
                  borderTopRightRadius: 16,
                  lineHeight: '1.2',
                  paddingTop: 16,
                  paddingBottom: 16,
                }}
              />
            </Tabs>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={activeTabIndex}
              onChangeIndex={handleChangeIndex}
            >
              {[0, 1, 2, 3].map((item) => (
                <TabPanel
                  value={activeTabIndex}
                  index={item}
                  dir={theme.direction}
                  style={{ minHeight: 300 }}
                >
                  {!isLoading ? (
                    <DownloadTable
                      data={tableData}
                      categoryId={activeTabIndex + 1}
                      incrementCounterValue={incrementCounterValue}
                    />
                  ) : (
                    <Loading height={200} />
                  )}
                </TabPanel>
              ))}
            </SwipeableViews>
          </Paper>
        </Box>
      </Container>
    </>
  )
}
