import React from 'react'
import { get, isNull } from 'lodash'

import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles'
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
import { GetApp as GetAppIcon, Launch as LaunchIcon } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
  })
)

export default function DataTable({ data }: any) {
  const classes = useStyles()
  const theme = useTheme()

  const getValue = (data: any, name: any, defaultValue: any) => {
    const value = get(data, name, null)
    if (isNull(value)) return defaultValue
    else return value
  }

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell
              width={100}
              align='center'
              style={{ lineHeight: '1.2', verticalAlign: 'top' }}
            >
              ลำดับ
            </TableCell>
            <TableCell
              width={250}
              style={{ lineHeight: '1.2', verticalAlign: 'top' }}
            >
              ประเทศ
            </TableCell>
            <TableCell
              width={300}
              style={{ lineHeight: '1.2', verticalAlign: 'top' }}
            >
              ดาวน์โหลด
            </TableCell>
            <TableCell
              width={300}
              style={{ lineHeight: '1.2', verticalAlign: 'top' }}
            >
              ลิงก์ไปยังเว็บไซต์ที่เกี่ยวข้อง
            </TableCell>
            <TableCell style={{ lineHeight: '1.2', verticalAlign: 'top' }}>
              หมายเหตุ
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data: any) => (
            <TableRow key={data.id}>
              <TableCell
                component='th'
                scope='row'
                align='center'
                style={{
                  color: theme.palette.text.secondary,
                  verticalAlign: 'top',
                }}
              >
                {data.id}
              </TableCell>
              <TableCell style={{ verticalAlign: 'top' }}>
                <Grid container alignItems='center' spacing={2} wrap='nowrap'>
                  <Grid item>
                    <Avatar src={data.flag} style={{ width: 30, height: 30 }} />
                  </Grid>
                  <Grid item style={{ color: theme.palette.text.secondary }}>
                    {data.country}
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell style={{ verticalAlign: 'top' }}>
                {getValue(data, 'documentText', []).map(
                  (document: string, index: number) => (
                    <Link
                      href={getValue(data, `documentUrl[${index}]`, '')}
                      target='_blank'
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
                  color: theme.palette.text.secondary,
                  verticalAlign: 'top',
                }}
              >
                {data.note}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
