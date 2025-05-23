import React, { useEffect, useState } from 'react'
import { get } from 'lodash'
import { useDispatch } from 'react-redux'

import * as searchActions from 'modules/search/actions'

import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  List,
  ListItem,
  Tooltip,
} from '@material-ui/core'

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import PrintIcon from '@material-ui/icons/Print'

const PATH = process.env.REACT_APP_BASE_PATH

function createData(
  id: number,
  university: string,
  degree: string,
  branch: string,
  category: string,
  level: string,
  faculty: string,
  accreditation1: string,
  accreditation2: string,
  note: string,
  letterNo: string,
  letterDate: string,
  cert: boolean,
  counter: number
) {
  return {
    id,
    university,
    degree,
    branch,
    category,
    level,
    faculty,
    accreditation1,
    accreditation2,
    note,
    letterNo,
    letterDate,
    cert,
    counter,
  }
}

const getLabel = (row: any, fieldName: string) => {
  const result = get(row, fieldName, null)
  if (result === null || result === undefined || result === '') {
    return '-'
  } else {
    return result
  }
}

const parseLinkToDefaultColor = (text: string) => {
  return text.replace(/<a/g, '<a class="custom_link"')
}

interface SearchResultTableType {
  data: any
}

export default function SearchResultTable({ data }: SearchResultTableType) {
  const [tableData, setTableData] = useState([])
  const dispatch = useDispatch()

  const incrementCounterValue = (curriculumId: number) => {
    const updatedData = tableData.map((curriculum: any) => {
      if (curriculum.id === curriculumId) {
        return { ...curriculum, counter: curriculum.counter + 1 }
      } else {
        return curriculum
      }
    })
    setTableData(updatedData as any)
  }

  const goToCert = (id: number) => {
    if (id !== null) {
      window.open(`${PATH}/cert/${id}`, '_blank')
      dispatch(searchActions.incrementCounter(id))
      incrementCounterValue(id)
    }
  }

  function Row(props: any) {
    const { row, index } = props
    const [open, setOpen] = React.useState(false)

    return (
      <React.Fragment>
        <TableRow style={{ borderBottom: 'unset' }}>
          <TableCell>
            <IconButton
              aria-label='expand row'
              size='small'
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <KeyboardArrowUpIcon color='primary' />
              ) : (
                <KeyboardArrowDownIcon color='primary' />
              )}
            </IconButton>
          </TableCell>
          <TableCell component='th' scope='row' align='center'>
            {index + 1}
          </TableCell>
          <TableCell component='th' scope='row'>
            {getLabel(row, 'university')}
          </TableCell>
          <TableCell>{getLabel(row, 'degree')}</TableCell>
          <TableCell>{getLabel(row, 'branch')}</TableCell>
          <TableCell>{getLabel(row, 'category')}</TableCell>
          <TableCell>{getLabel(row, 'level')}</TableCell>
          <TableCell>{getLabel(row, 'faculty')}</TableCell>
          <TableCell width={130}>
            {get(row, 'cert', false) && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Tooltip title='พิมพ์ผลการรับรอง'>
                  <IconButton
                    aria-label='พิมพ์ผลการรับรอง'
                    size='small'
                    onClick={() => goToCert(get(row, 'id', null))}
                  >
                    <PrintIcon color='primary' fontSize='small' />
                  </IconButton>
                </Tooltip>
                <Typography
                  align='center'
                  variant='caption'
                  style={{ lineHeight: '1.2', fontSize: 11 }}
                >
                  (พิมพ์{' '}
                  {get(row, 'counter')
                    ? get(row, 'counter').toLocaleString()
                    : 0}{' '}
                  ครั้ง)
                </Typography>
              </div>
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            style={{ paddingBottom: 0, paddingTop: 0, borderBottom: 'none' }}
            colSpan={6}
          >
            <Collapse in={open} timeout='auto' unmountOnExit>
              <List>
                <ListItem divider>
                  <Box style={{ flexBasis: '25%', flexShrink: 0 }}>
                    <Typography
                      variant='body2'
                      style={{ lineHeight: '1.2', fontWeight: 600 }}
                    >
                      ผลการรับรอง
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant='body2'
                      gutterBottom
                      color='secondary'
                      style={{ lineHeight: '1.2', fontWeight: 500 }}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: parseLinkToDefaultColor(
                            getLabel(row, 'accreditation1')
                          ),
                        }}
                      ></div>
                    </Typography>
                    <Typography
                      variant='caption'
                      color='secondary'
                      style={{ lineHeight: '1.2' }}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: parseLinkToDefaultColor(
                            getLabel(row, 'accreditation2')
                          ),
                        }}
                      ></div>
                    </Typography>
                  </Box>
                </ListItem>
                <ListItem divider>
                  <Box style={{ flexBasis: '25%', flexShrink: 0 }}>
                    <Typography variant='body2' style={{ fontWeight: 600 }}>
                      หมายเหตุ
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant='body2' color='secondary'>
                      {getLabel(row, 'note')}
                    </Typography>
                  </Box>
                </ListItem>
                <ListItem divider>
                  <Box style={{ flexBasis: '25%', flexShrink: 0 }}>
                    <Typography variant='body2' style={{ fontWeight: 600 }}>
                      เลขที่หนังสือเวียน
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant='body2' color='secondary'>
                      {getLabel(row, 'letterNo')}
                    </Typography>
                  </Box>
                </ListItem>
                <ListItem divider>
                  <Box style={{ flexBasis: '25%', flexShrink: 0 }}>
                    <Typography variant='body2' style={{ fontWeight: 600 }}>
                      ลงวันที่
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant='body2' color='secondary'>
                      {getLabel(row, 'letterDate')}
                    </Typography>
                  </Box>
                </ListItem>
                <ListItem divider>
                  <Box style={{ flexBasis: '25%', flexShrink: 0 }}>
                    <Typography variant='body2' style={{ fontWeight: 600 }}>
                      เลขที่อ้างอิง
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant='body2' color='secondary'>
                      {getLabel(row, 'id')}
                    </Typography>
                  </Box>
                </ListItem>
              </List>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    )
  }

  useEffect(() => {
    const parsedData = data.map((item: any) =>
      createData(
        get(item, 'id'),
        get(item, 'university'),
        get(item, 'degree'),
        get(item, 'branch'),
        get(item, 'category'),
        get(item, 'level'),
        get(item, 'faculty'),
        get(item, 'accreditation1'),
        get(item, 'accreditation2'),
        get(item, 'note'),
        get(item, 'letterNo'),
        get(item, 'letterDate'),
        get(item, 'cert'),
        get(item, 'counter')
      )
    )
    setTableData(parsedData)
  }, [data])

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell
              align='center'
              style={{
                verticalAlign: 'top',
                lineHeight: '1.2',
                fontWeight: 600,
              }}
            >
              ลำดับ
            </TableCell>
            <TableCell
              style={{
                verticalAlign: 'top',
                lineHeight: '1.2',
                fontWeight: 600,
              }}
            >
              มหาวิทยาลัย/สถาบันการศึกษา
            </TableCell>
            <TableCell
              style={{
                verticalAlign: 'top',
                lineHeight: '1.2',
                fontWeight: 600,
              }}
            >
              ชื่อปริญญา/ประกาศนียบัตร
            </TableCell>
            <TableCell
              style={{
                verticalAlign: 'top',
                lineHeight: '1.2',
                fontWeight: 600,
              }}
            >
              สาขา/วิชาเอก
            </TableCell>
            <TableCell
              style={{
                verticalAlign: 'top',
                lineHeight: '1.2',
                fontWeight: 600,
              }}
            >
              รัฐ/เอกชน
            </TableCell>
            <TableCell
              style={{
                verticalAlign: 'top',
                lineHeight: '1.2',
                fontWeight: 600,
              }}
            >
              ระดับการศึกษา
            </TableCell>
            <TableCell
              style={{
                verticalAlign: 'top',
                lineHeight: '1.2',
                fontWeight: 600,
              }}
            >
              คณะ/หน่วยงาน
            </TableCell>
            <TableCell
              align='center'
              style={{
                verticalAlign: 'top',
                lineHeight: '1.2',
                fontWeight: 600,
              }}
            >
              พิมพ์ผลการรับรอง
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row: any, index: number) => (
            <Row key={row.id} row={row} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
