import * as React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Box,
  Grow,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Add, Remove } from '@material-ui/icons'
import { red, amber, green } from '@material-ui/core/colors'
import { JobColorScheme } from './JobTableRenderer'

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
  colorScheme?: JobColorScheme
}

const colorSchemeConfig = {
  close: {
    main: red[500],
    light: red[50],
  },
  semi: {
    main: amber[700],
    light: amber[50],
  },
  open: {
    main: green[500],
    light: green[50],
  },
}

type MinistryBlock = { name: string; departments: string[] }
type RowData = { position: string; ministries: MinistryBlock[] }

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    margin: '0 auto',
  },
  table: {
    tableLayout: 'fixed',
  },
  positionCell: {
    width: 260,
    maxWidth: 260,
    fontWeight: 500,
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

export default function JobTable({
  data,
  colorScheme = 'close',
}: JobTableProps) {
  const classes = useStyles()
  const [openMap, setOpenMap] = React.useState<Record<string, boolean>>({})
  const colors = colorSchemeConfig[colorScheme]

  const toggle = (rowIndex: number, ministryName: string) => {
    const key = `${rowIndex}-${ministryName}`
    setOpenMap((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const transformedData = transformData(data)

  return (
    <TableContainer className={classes.tableContainer}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell
              className={classes.positionCell}
              style={{
                verticalAlign: 'top',
                lineHeight: '1.2',
                fontWeight: 600,
              }}
            >
              ตำแหน่ง
            </TableCell>
            <TableCell
              style={{
                verticalAlign: 'top',
                lineHeight: '1.2',
                fontWeight: 600,
              }}
            >
              กระทรวง / ส่วนราชการ
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transformedData.map((row, rowIndex) => (
            <TableRow key={rowIndex} style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
              <TableCell
                className={classes.positionCell}
                style={{ verticalAlign: 'top', paddingTop: 21 }}
              >
                {row.position}
              </TableCell>
              <TableCell>
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
                            style={{
                              borderColor: colors.main,
                              color: colors.main,
                              fontWeight: 500,
                            }}
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
                                <Chip
                                  label={d}
                                  size='small'
                                  style={{
                                    backgroundColor: colors.light,
                                    color: colors.main,
                                    fontWeight: 500,
                                  }}
                                />
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
