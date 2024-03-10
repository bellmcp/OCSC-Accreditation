//@ts-nocheck
import * as React from 'react'
import { Typography, Grid, Container } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import logoPictogram from 'assets/images/cert-logo-pictogram.png'
import background from 'assets/images/cert-background.svg'

const theme = createMuiTheme({
  typography: {
    fontFamily: ['"Athiti"', 'sans-serif'].join(','),
    caption: {
      fontFamily: 'Prompt',
    },
  },
  palette: {
    primary: {
      main: '#414042',
    },
    secondary: {
      main: '#EFAA1F',
    },
  },
})

export default class CertificateRenderer extends React.PureComponent<Props> {
  //eslint-disable-next-line
  constructor(props) {
    super(props)
  }

  public render() {
    return (
      <ThemeProvider theme={theme}>
        <Container
          style={{
            width: '210mm',
            minHeight: '297mm',
            background: `url(${background})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            display: 'flex',
          }}
        >
          <Grid
            container
            direction='column'
            justify='center'
            alignItems='center'
            wrap='nowrap'
          >
            <Grid
              item
              style={{ display: 'flex', padding: '0 50px 70px' }}
              direction='column'
            >
              <img
                alt='OCSC Logo'
                src={logoPictogram}
                style={{
                  width: 'auto',
                  height: 150,
                  alignSelf: 'center',
                }}
              />
              <Typography
                variant='h5'
                color='textPrimary'
                align='center'
                style={{
                  fontSize: 30,
                  marginBottom: this.props.text2 ? 10 : 5,
                  lineHeight: '1.1',
                }}
              >
                สำนักงาน ก.พ.
                <br />
                <span style={{ fontSize: 26 }}>
                  รับรองคุณวุฒิของผู้สำเร็จการศึกษา
                </span>
              </Typography>
              <hr
                style={{
                  border: 'none',
                  height: 1,
                  width: 470,
                  color: '#BCBEC0',
                  backgroundColor: '#BCBEC0',
                  marginBottom: 50,
                }}
              />

              {/* NAME */}
              <Typography
                variant='caption'
                color='secondary'
                align='center'
                style={{
                  fontSize: 37,
                  fontWeight: 500,
                  marginBottom: 40,
                  lineHeight: 1,
                }}
              >
                ปริญญาครุศาสตรบัณฑิต (เคมี)
              </Typography>
              <Typography
                variant='body1'
                color='textPrimary'
                align='center'
                style={{ fontSize: 20, marginBottom: 38 }}
              >
                จาก จุฬาลงกรณ์มหาวิทยาลัย
              </Typography>
              <Typography
                variant='h6'
                color='textPrimary'
                align='center'
                style={{ fontSize: 28, marginBottom: 38, lineHeight: '1.2' }}
              >
                เป็นคุณวุฒิ สาขาวิชาศึกษาศาสตร์ ทางเคมี
              </Typography>

              {/* LENGTH AND DATE */}
              <Typography
                variant='body1'
                color='textPrimary'
                align='center'
                style={{ fontSize: 20 }}
              >
                ตาม หนังสือสำนักงาน ก.พ. ที่ นร 1004.3/ว 41
              </Typography>
              <Typography
                variant='body1'
                color='textPrimary'
                align='center'
                style={{ fontSize: 20, marginBottom: 25 }}
              >
                ลงวันที่ 30 กันยายน 2553
              </Typography>

              {/* SIGNATURE */}
              {/* <img
                  alt='Signature'
                  src={getSignature(this.props.signature)}
                  style={{
                    width: 180,
                    height: 'auto',
                    alignSelf: 'center',
                    marginBottom: 10,
                  }}
                /> */}
              <Typography
                variant='body2'
                color='textPrimary'
                align='center'
                style={{ fontSize: 15, marginBottom: 0, lineHeight: '1.2' }}
              >
                {this.props.signer}
                <br />
                {this.props.position1}
                {this.props.position2 && <br />}
                {this.props.position2}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    )
  }
}
