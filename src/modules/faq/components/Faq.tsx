import React, { useEffect } from 'react'
import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Container, Typography, Card, Grid, Link } from '@material-ui/core'

import Header from 'modules/ui/components/Header'

import * as faqActions from 'modules/faq/actions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    sectionTitle: {
      fontSize: '1.7rem',
      fontWeight: 600,
      zIndex: 3,
    },
    seeAllButton: {
      marginBottom: '0.35em',
      zIndex: 3,
    },
  })
)

interface FaqType {
  id: number
  question: string
  answer: string
  documentUrl: string[]
  documentText: string[]
  websiteUrl: string[]
  websiteText: string[]
}

export default function Faq() {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(faqActions.loadFaq())
  }, [dispatch])

  const { faq } = useSelector((state: any) => state.faq)

  return (
    <>
      <Header title='FAQ' subtitle='คำถามที่พบบ่อย' icon={<div />} />
      <Container maxWidth='lg' className={classes.content}>
        <Grid container direction='row' alignItems='center'>
          <Typography
            gutterBottom
            component='h2'
            variant='h6'
            className={classes.sectionTitle}
          >
            คำถามที่พบบ่อย
          </Typography>
        </Grid>
        {faq.map((item: FaqType) => (
          <Card
            style={{
              padding: '24px 36px',
              borderRadius: 24,
              boxShadow: '0 4px 20px 0 rgba(0,0,0,0.08)',
            }}
            elevation={0}
          >
            <Grid container direction='row' alignItems='center' spacing={4}>
              <Grid item>
                <Typography
                  variant='h3'
                  color='secondary'
                  style={{ fontWeight: 600 }}
                >
                  {item.id}.
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant='body1'
                  style={{ fontWeight: 600, fontSize: 20 }}
                >
                  {item.question} ?
                </Typography>
                <Typography variant='body1'>
                  <b>ตอบ</b> {item.answer}
                </Typography>
                {item.documentText.map((document: any, index: number) => (
                  <div>
                    <Link
                      underline='hover'
                      href={get(item, `documentUrl[${index}]`, '')}
                      target='_blank'
                    >
                      {document}
                    </Link>{' '}
                    {get(item, `websiteText[${index}]`, '')}
                  </div>
                ))}
              </Grid>
            </Grid>
          </Card>
        ))}
      </Container>
    </>
  )
}
