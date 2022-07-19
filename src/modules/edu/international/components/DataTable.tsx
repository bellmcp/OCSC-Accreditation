import React from 'react'
import { get, isNull } from 'lodash'

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
            <TableCell width={100}>ลำดับ</TableCell>
            <TableCell width={250}>ประเทศ</TableCell>
            <TableCell width={300}>ดาวน์โหลด</TableCell>
            <TableCell width={300}>ลิงก์ไปยังเว็บไซต์ที่เกี่ยวข้อง</TableCell>
            <TableCell>หมายเหตุ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data: any) => (
            <TableRow key={data.id}>
              <TableCell component='th' scope='row'>
                {data.id}
              </TableCell>
              <TableCell>
                <Grid container alignItems='center' spacing={2} wrap='nowrap'>
                  <Grid item>
                    <Avatar src={data.flag} style={{ width: 30, height: 30 }} />
                  </Grid>
                  <Grid item>{data.country}</Grid>
                </Grid>
              </TableCell>
              <TableCell>
                {getValue(data, 'documentText', []).map(
                  (document: string, index: number) => (
                    <Link
                      href={getValue(data, `documentUrl[${index}]`, '')}
                      target='_blank'
                    >
                      <Grid
                        container
                        alignItems='center'
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
              <TableCell>
                {getValue(data, 'websiteText', []).map(
                  (website: string, index: number) => (
                    <Link
                      href={getValue(data, `websiteUrl[${index}]`, '')}
                      target='_blank'
                    >
                      <Grid
                        container
                        alignItems='center'
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
              <TableCell>{data.note}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
