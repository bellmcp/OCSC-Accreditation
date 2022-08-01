import React, { useState, useEffect } from 'react'
import { get } from 'lodash'
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
  Paper,
  useMediaQuery,
} from '@material-ui/core'

import Header from 'modules/ui/components/Header'
import Loading from 'modules/ui/components/Loading'
import DataTable from './DataTable'

import * as internationalActions from 'modules/edu/international/actions'

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

function createData(
  id: number,
  country: string,
  flag: string,
  note: string,
  documentUrl?: string[],
  documentText?: string[],
  websiteUrl?: string[],
  websiteText?: string[]
) {
  return {
    id,
    country,
    flag,
    note,
    documentUrl,
    documentText,
    websiteUrl,
    websiteText,
  }
}

export default function InternationalEdu() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const [tableData, setTableData] = useState([])

  const { countries: initialCountries = [], isLoading = false } = useSelector(
    (state: any) => state.international
  )

  useEffect(() => {
    dispatch(internationalActions.loadCountries())
  }, [dispatch])

  useEffect(() => {
    setTableData(initialCountries)
    const parsedData = initialCountries.map((country: any) =>
      createData(
        get(country, 'id'),
        get(country, 'country'),
        get(country, 'flag'),
        get(country, 'note'),
        get(country, 'documentUrl'),
        get(country, 'documentText'),
        get(country, 'websiteUrl'),
        get(country, 'websiteText')
      )
    )
    setTableData(parsedData)
  }, [initialCountries])

  return (
    <>
      <Header title='FAQ' subtitle='คำถามที่พบบ่อย' icon={<div />} />
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
              สถาบันการศึกษาในต่างประเทศ
            </Typography>
          </Grid>
          <Paper
            elevation={0}
            style={{
              borderRadius: 16,
              padding: 24,
              paddingTop: 12,
              boxShadow: '0 0 20px 0 rgba(204,242,251,0.3)',
              border: '1px solid rgb(204 242 251)',
              minHeight: 300,
            }}
          >
            {!isLoading ? (
              <DataTable data={tableData} />
            ) : (
              <Loading height={200} />
            )}
          </Paper>
        </Box>
      </Container>
    </>
  )
}
