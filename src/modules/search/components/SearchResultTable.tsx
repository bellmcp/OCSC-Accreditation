import * as React from 'react'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

function createData(
  id: number,
  name: string,
  calories: string,
  fat: string,
  carbs: string,
  protein: string,
  price: string,
  test: string
) {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    test,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  }
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props
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
        <TableCell component='th' scope='row'>
          {row.id}
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.name}
        </TableCell>
        <TableCell>{row.calories}</TableCell>
        <TableCell>{row.fat}</TableCell>
        <TableCell>{row.carbs}</TableCell>
        <TableCell>{row.protein}</TableCell>
        <TableCell>{row.test}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <List>
              <ListItem divider>
                <Box style={{ flexBasis: '25%', flexShrink: 0 }}>
                  <Typography variant='body2' style={{ fontWeight: 600 }}>
                    ผลการรับรอง
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='body2' color='textSecondary'>
                    สาขาวิชาศึกษาศาสตร์
                    <br />
                    ทางธุรกิจการศึกษา
                  </Typography>
                  <Typography variant='caption' color='primary'>
                    สำนักงานคณะกรรมการข้าราชการพลเรือน (สำนักงาน ก.พ.)
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
                  <Typography variant='body2' color='textSecondary'>
                    เอกเดี่ยว
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
                  <Typography variant='body2' color='textSecondary'>
                    นร 1004.3/ว42
                  </Typography>
                </Box>
              </ListItem>
              <ListItem>
                <Box style={{ flexBasis: '25%', flexShrink: 0 }}>
                  <Typography variant='body2' style={{ fontWeight: 600 }}>
                    ลงวันที่
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='body2' color='textSecondary'>
                    30 กันยายน 2563
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

const rows = [
  createData(
    1,
    'จุฬาลงกรณ์มหาวิทยาลัย',
    'ปริญญาครุศาสตรบัณฑิต',
    'ธุรกิจศึกษา',
    'รัฐ',
    'ป.ตรี',
    'คณะครุศาสตร์',
    'คณะครุศาสตร์'
  ),
]

export default function CollapsibleTable() {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell
              align='center'
              style={{ verticalAlign: 'top', lineHeight: '1.2' }}
            >
              ลำดับ
            </TableCell>
            <TableCell style={{ verticalAlign: 'top', lineHeight: '1.2' }}>
              มหาวิทยาลัย/สถาบันการศึกษา
            </TableCell>
            <TableCell style={{ verticalAlign: 'top', lineHeight: '1.2' }}>
              ชื่อปริญญา/ประกาศนียบัตร
            </TableCell>
            <TableCell style={{ verticalAlign: 'top', lineHeight: '1.2' }}>
              สาขา/วิชาเอก
            </TableCell>
            <TableCell style={{ verticalAlign: 'top', lineHeight: '1.2' }}>
              รัฐ/เอกชน
            </TableCell>
            <TableCell style={{ verticalAlign: 'top', lineHeight: '1.2' }}>
              ระดับการศึกษา
            </TableCell>
            <TableCell style={{ verticalAlign: 'top', lineHeight: '1.2' }}>
              คณะ/หน่วยงาน
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
