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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              width='50%'
              style={{ lineHeight: '1.2', verticalAlign: 'top' }}
            >
              ดาวน์โหลด
            </TableCell>
            <TableCell
              width='50%'
              style={{ lineHeight: '1.2', verticalAlign: 'top' }}
            >
              ลิงก์ไปยังเว็บไซต์ที่เกี่ยวข้อง
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
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
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}