import React from 'react'
import { get, isNull } from 'lodash'
import { useDispatch } from 'react-redux'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  Grid,
  Avatar,
} from '@material-ui/core'
import {
  GetApp as GetAppIcon,
  Launch as LaunchIcon,
  Flag as FlagIcon,
} from '@material-ui/icons'

import * as internationalActions from 'modules/edu/international/actions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
  })
)

export default function DataTable({ data, incrementCounterValue }: any) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const getValue = (data: any, name: any, defaultValue: any) => {
    const value = get(data, name, null)
    if (isNull(value)) return defaultValue
    else return value
  }

  const handleClickLink = (countryId: number) => {
    dispatch(internationalActions.incrementCounter(countryId))
    incrementCounterValue(countryId)
  }

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell
              width={50}
              align='center'
              style={{
                lineHeight: '1.3',
                verticalAlign: 'top',
                fontWeight: 600,
              }}
            >
              ลำดับ
            </TableCell>
            <TableCell
              width={250}
              style={{
                lineHeight: '1.3',
                verticalAlign: 'top',
                fontWeight: 600,
              }}
            >
              ประเทศ
            </TableCell>
            <TableCell
              width={300}
              style={{
                lineHeight: '1.3',
                verticalAlign: 'top',
                fontWeight: 600,
              }}
            >
              ดาวน์โหลด
            </TableCell>
            <TableCell
              width={300}
              style={{
                lineHeight: '1.3',
                verticalAlign: 'top',
                fontWeight: 600,
              }}
            >
              เว็บไซต์ที่เกี่ยวข้อง
            </TableCell>
            <TableCell
              style={{
                lineHeight: '1.3',
                verticalAlign: 'top',
                fontWeight: 600,
              }}
            >
              หมายเหตุ
            </TableCell>
            <TableCell
              width={120}
              align='center'
              style={{
                lineHeight: '1.3',
                verticalAlign: 'top',
                fontWeight: 600,
              }}
            >
              จำนวนครั้งที่เข้าชม
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data: any, index: number) => (
            <TableRow key={data.id}>
              <TableCell
                component='th'
                scope='row'
                align='center'
                style={{
                  verticalAlign: 'top',
                }}
              >
                {index + 1}
              </TableCell>
              <TableCell style={{ verticalAlign: 'top' }}>
                <Grid container spacing={2} wrap='nowrap'>
                  <Grid item>
                    <Avatar
                      alt={data.country}
                      src={data.flag}
                      variant='square'
                      style={{ height: 18, width: 30 }}
                    >
                      <FlagIcon />
                    </Avatar>
                  </Grid>
                  <Grid item>{data.country}</Grid>
                </Grid>
              </TableCell>
              <TableCell style={{ verticalAlign: 'top' }}>
                {getValue(data, 'documentText', []).map(
                  (document: string, index: number) => (
                    <Link
                      href={getValue(data, `documentUrl[${index}]`, '')}
                      target='_blank'
                      onClick={() => handleClickLink(data.id)}
                    >
                      <Grid
                        container
                        alignItems='flex-start'
                        spacing={2}
                        wrap='nowrap'
                      >
                        <Grid item>
                          <GetAppIcon
                            fontSize='small'
                            style={{ marginBottom: '-6px' }}
                          />
                        </Grid>
                        <Grid item>{document}</Grid>
                      </Grid>
                    </Link>
                  )
                )}
              </TableCell>
              <TableCell style={{ verticalAlign: 'top' }}>
                {getValue(data, 'websiteText', []).map(
                  (website: string, index: number) => (
                    <Link
                      href={getValue(data, `websiteUrl[${index}]`, '')}
                      target='_blank'
                      onClick={() => handleClickLink(data.id)}
                    >
                      <Grid
                        container
                        alignItems='flex-start'
                        spacing={2}
                        wrap='nowrap'
                      >
                        <Grid item>
                          <LaunchIcon
                            fontSize='small'
                            style={{ marginBottom: '-6px' }}
                          />
                        </Grid>
                        <Grid item>{website}</Grid>
                      </Grid>
                    </Link>
                  )
                )}
              </TableCell>
              <TableCell
                style={{
                  verticalAlign: 'top',
                }}
              >
                {data.note}
              </TableCell>
              <TableCell
                align='center'
                style={{
                  verticalAlign: 'top',
                }}
              >
                {data.counter.toLocaleString()} ครั้ง
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
