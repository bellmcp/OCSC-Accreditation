import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

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

import * as downloadActions from 'modules/download/actions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
  })
)

export default function DownloadTable({
  data,
  categoryId,
  incrementCounterValue,
}: any) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleClickLink = (categoryId: number, letterId: number) => {
    dispatch(downloadActions.incrementCounter(categoryId, letterId))
    incrementCounterValue(categoryId, letterId)
  }

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell
              align='center'
              width='10%'
              style={{
                verticalAlign: 'top',
                lineHeight: '1.2',
                fontWeight: 600,
              }}
            >
              ลำดับ
            </TableCell>
            <TableCell
              width='20%'
              style={{
                verticalAlign: 'top',
                lineHeight: '1.2',
                fontWeight: 600,
              }}
            >
              วันที่ออกหนังสือเวียน
            </TableCell>
            <TableCell
              width='20%'
              style={{
                verticalAlign: 'top',
                lineHeight: '1.2',
                fontWeight: 600,
              }}
            >
              เลขที่หนังสือเวียน
            </TableCell>
            <TableCell
              style={{
                verticalAlign: 'top',
                lineHeight: '1.2',
                fontWeight: 600,
              }}
            >
              เรื่อง
            </TableCell>
            <TableCell
              width='10%'
              align='center'
              style={{ verticalAlign: 'top', fontWeight: 600 }}
            >
              ดาวน์โหลด
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
              <TableCell
                style={{
                  verticalAlign: 'top',
                }}
              >
                {data.date}
              </TableCell>
              <TableCell
                style={{
                  verticalAlign: 'top',
                }}
              >
                {data.no}
              </TableCell>
              <TableCell
                style={{
                  verticalAlign: 'top',
                }}
              >
                {data.subject}
              </TableCell>
              <TableCell align='center' style={{ verticalAlign: 'top' }}>
                <IconButton
                  size='small'
                  component={Link}
                  href={data.url}
                  onClick={() => handleClickLink(categoryId, data.id)}
                  target='_blank'
                  color='primary'
                >
                  <GetAppIcon fontSize='small' />
                </IconButton>
              </TableCell>
              <TableCell
                align='center'
                style={{
                  verticalAlign: 'top',
                }}
              >
                {data.counter ? data.counter.toLocaleString() : 0} ครั้ง
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
