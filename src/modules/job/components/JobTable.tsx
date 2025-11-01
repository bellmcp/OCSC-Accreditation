import * as React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Box,
  Typography,
  Grow,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Add, Remove } from '@material-ui/icons'

// API Data Types
type WorkPlace = {
  ministry: string
  departments: string[] | null
}

type JobData = {
  job: string
  workPlace: WorkPlace[]
}

type JobTableProps = {
  data: JobData[]
}

// Transform API data to component format
type MinistryBlock = { name: string; departments: string[] }
type RowData = { position: string; ministries: MinistryBlock[] }

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    maxWidth: 1200,
    margin: '0 auto',
    marginTop: theme.spacing(4),
  },
  table: {
    tableLayout: 'fixed',
  },
  headerRow: {
    backgroundColor: '#1565c0',
  },
  headerCell: {
    color: '#fff',
    fontWeight: 'bold',
  },
  positionCell: {
    width: 260,
    maxWidth: 260,
  },
  ministriesColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    '& > *': {
      // marginBottom: theme.spacing(1),
      '&:last-child': {
        marginBottom: 0,
      },
    },
  },
  ministriesRow: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '100%',
    '& > *': {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  ministryGroup: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    '& > *': {
      marginRight: theme.spacing(0.5),
    },
  },
  ministryRow: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    '& > *': {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  departmentChipWrapper: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: 'inline-block',
  },
}))

const transformData = (apiData: JobData[]): RowData[] => {
  return apiData.map((item) => ({
    position: item.job,
    ministries: item.workPlace.map((wp) => ({
      name: wp.ministry,
      departments: wp.departments || [],
    })),
  }))
}

export default function JobTable({ data }: JobTableProps) {
  const classes = useStyles()
  const [openMap, setOpenMap] = React.useState<Record<string, boolean>>({})

  const toggle = (rowIndex: number, ministryName: string) => {
    const key = `${rowIndex}-${ministryName}`
    setOpenMap((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const transformedData = transformData(data)

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.headerRow}>
            <TableCell
              className={`${classes.headerCell} ${classes.positionCell}`}
            >
              ตำแหน่ง
            </TableCell>
            <TableCell className={classes.headerCell}>
              กระทรวง / ส่วนราชการ
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transformedData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {/* คอลัมน์แรก fix width + ellipsis */}
              <TableCell className={classes.positionCell}>
                <Typography noWrap title={row.position}>
                  {row.position}
                </Typography>
              </TableCell>
              <TableCell style={{ padding: '16px 16px 8px' }}>
                <Box className={classes.ministriesColumn}>
                  {row.ministries.map((m) => {
                    const key = `${rowIndex}-${m.name}`
                    const isOpen = !!openMap[key]
                    const departmentCount = m.departments.length

                    return (
                      <Box key={m.name} className={classes.ministryRow}>
                        <Box className={classes.ministryGroup}>
                          <Chip
                            label={`${m.name} ${
                              departmentCount > 0 ? ` (${departmentCount})` : ''
                            }`}
                            variant='outlined'
                            color='primary'
                          />
                          {departmentCount > 0 && (
                            <IconButton
                              size='small'
                              onClick={() => toggle(rowIndex, m.name)}
                              aria-label={isOpen ? 'collapse' : 'expand'}
                            >
                              {isOpen ? (
                                <Remove fontSize='small' />
                              ) : (
                                <Add fontSize='small' />
                              )}
                            </IconButton>
                          )}
                        </Box>
                        {m.departments.map((d, idx) => (
                          <Box
                            key={d}
                            className={classes.departmentChipWrapper}
                          >
                            <Grow
                              in={isOpen}
                              timeout={300 + idx * 60}
                              unmountOnExit
                            >
                              <Box>
                                <Chip label={d} size='small' />
                              </Box>
                            </Grow>
                          </Box>
                        ))}
                      </Box>
                    )
                  })}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
