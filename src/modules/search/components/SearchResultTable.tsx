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
import Paper from '@material-ui/core/Paper'
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
            <Box style={{ margin: 16 }}>
              <Typography variant='h6' gutterBottom component='div'>
                History
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component='th' scope='row'>
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell>{historyRow.amount}</TableCell>
                      <TableCell>xxxx</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
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
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ลำดับที่</TableCell>
            <TableCell>มหาวิทยาลัย/สถาบันการศึกษา</TableCell>
            <TableCell>ชื่อปริญญา/ประกาศนียบัตร</TableCell>
            <TableCell>สาขา/วิชาเอก</TableCell>
            <TableCell>รัฐ/เอกชน</TableCell>
            <TableCell>ระดับการศึกษา</TableCell>
            <TableCell>คณะ/หน่วยงาน</TableCell>
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
