import React from 'react'

import Loading from 'modules/ui/components/Loading'

import { Typography, Grid, Box, Paper } from '@material-ui/core'

import { Inbox as InboxIcon } from '@material-ui/icons'
import JobTable from './JobTable'
import { isEmpty } from 'lodash'

interface JobTableRendererProps {
  isLoading: boolean
  isError: boolean
  data: any
}

export default function JobTableRenderer({
  isLoading,
  isError,
  data,
}: JobTableRendererProps) {
  if (isLoading) {
    return <Loading height={307} />
  } else if (isError || isEmpty(data)) {
    return (
      <Box my={4}>
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
          style={{ height: 120 }}
        >
          <InboxIcon
            color='disabled'
            style={{ fontSize: 54, marginBottom: 14 }}
          />
          <Typography component='h2' variant='body2' color='textSecondary'>
            ยังไม่มีข้อมูล
          </Typography>
        </Grid>
      </Box>
    )
  } else {
    return (
      <Paper
        elevation={0}
        style={{
          borderRadius: 16,
          padding: 24,
          paddingTop: 8,
          boxShadow: '0 0 20px 0 rgba(204,242,251,0.3)',
          border: '1px solid rgb(204 242 251)',
        }}
      >
        <JobTable data={data} />
      </Paper>
    )
  }
}
