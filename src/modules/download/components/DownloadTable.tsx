import React from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Link,
} from '@material-ui/core'
import { GetApp as GetAppIcon } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
  })
)

export default function DownloadTable({ data }: any) {
  const classes = useStyles()

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align='center' width={100}>
              ลำดับ
            </TableCell>
            <TableCell width={200}>วันที่ออกหนังสือเวียน</TableCell>
            <TableCell width={200}>เลขที่หนังสือเวียน</TableCell>
            <TableCell>เรื่อง</TableCell>
            <TableCell width={100} align='center'>
              ดาวน์โหลด
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data: any) => (
            <TableRow key={data.id}>
              <TableCell component='th' scope='row' align='center'>
                {data.id}
              </TableCell>
              <TableCell>{data.date}</TableCell>
              <TableCell>{data.no}</TableCell>
              <TableCell>{data.subject}</TableCell>
              <TableCell align='center'>
                <IconButton
                  size='small'
                  component={Link}
                  href={data.url}
                  target='_blank'
                >
                  <GetAppIcon fontSize='small' />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
