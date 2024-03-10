//@ts-nocheck
import * as React from 'react'
import { get } from 'lodash'
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
            backgroundColor: 'white',
            border: '1px solid lightgray',
            // background: `url(${background})`,
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
                  marginBottom: 10,
                  lineHeight: '1.1',
                  marginTop: 20,
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
                  marginTop: 20,
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
                {get(this, 'props.certificate.degree', '-')}
              </Typography>
              <Typography
                variant='body1'
                color='textPrimary'
                align='center'
                style={{ fontSize: 20, marginBottom: 38 }}
              >
                จาก {get(this, 'props.certificate.university', '-')}
              </Typography>
              <Typography
                variant='h6'
                color='textPrimary'
                align='center'
                style={{ fontSize: 28, marginBottom: 38, lineHeight: '1.2' }}
              >
                เป็นคุณวุฒิ
                <br />
                {get(this, 'props.certificate.accreditation1', '-')}
              </Typography>

              {/* LENGTH AND DATE */}
              <Typography
                variant='body1'
                color='textPrimary'
                align='center'
                style={{ fontSize: 20 }}
              >
                ตาม หนังสือสำนักงาน ก.พ. ที่{' '}
                {get(this, 'props.certificate.letterNo', '-')}
              </Typography>
              <Typography
                variant='body1'
                color='textPrimary'
                align='center'
                style={{ fontSize: 20, marginBottom: 25 }}
              >
                ลงวันที่ {get(this, 'props.certificate.letterDate', '-')}
              </Typography>

              <Typography
                variant='body1'
                color='textPrimary'
                align='center'
                style={{ fontSize: 20, marginBottom: 25 }}
              >
                หมายเหตุ {get(this, 'props.certificate.note', '-')}
              </Typography>

              <hr
                style={{
                  border: 'none',
                  height: 1,
                  width: 470,
                  color: '#BCBEC0',
                  backgroundColor: '#BCBEC0',
                  marginTop: 20,
                  marginBottom: 20,
                }}
              />
              <Typography
                variant='body2'
                color='textPrimary'
                align='center'
                style={{
                  fontSize: 15,
                  marginBottom: 0,
                  lineHeight: '1.2',
                  marginTop: 20,
                }}
              >
                ในกรณีที่ส่วนราชการกำหนด "สาขาวิชาใดสาขาวิชาหนึ่ง ทาง..."
                จะต้องนำหนังสือสำนักงาน ก.พ. ที่ นร 1004.3/ว 14 ลงวันที่ 11
                ธันวาคม 2551 และที่ นร 1004/ว21 ลงวันที่ 22 กันยายน 2564
                ร่วมประกอบการพิจารณาด้วย
              </Typography>
              <Typography
                variant='body2'
                color='textPrimary'
                align='center'
                style={{
                  fontSize: 15,
                  marginBottom: 0,
                  lineHeight: '1.2',
                  marginTop: 20,
                }}
              >
                การพิจารณาคุณวุฒิของผู้สมัครสอบแข่งขันเพื่อบรรจุและแต่งตั้งบุคคลเข้ารับราชการเป็นข้าราชการพลเรือนสามัญ
                มีเงื่อนไขที่แตกต่างกันตามประกาศรับสมัครที่สอบแข่งขันฯ
                ของแต่ละส่วนราชการ ดังนั้น
                หากมีข้อสงสัยในการสมัครสอบขอได้โปรดติดต่อสอบถามกับส่วนราชการที่ประกาศรับสมัครสอบแข่งขันฯ
                โดยตรง
              </Typography>
              <Typography
                variant='body2'
                color='textPrimary'
                align='center'
                style={{
                  color: 'red',
                  fontSize: 15,
                  marginBottom: 0,
                  lineHeight: '1.2',
                  marginTop: 20,
                }}
              >
                ทั้งนี้
                ส่วนราชการโปรดตรวจสอบหลักฐานการศึกษาของผู้สมัครประกอบการพิจารณาต่อไป
              </Typography>
              <Typography
                variant='body2'
                color='textPrimary'
                align='center'
                style={{
                  fontSize: 15,
                  marginBottom: 0,
                  lineHeight: '1.2',
                  marginTop: 20,
                }}
              >
                อนึ่ง หลักเกณฑ์การพิจารณาข้างต้น เป็นหลักเกณฑ์ที่ ก.พ.
                กำหนดสำหรับพิจารณาข้าราชการพลเรือนสามัญ
                กรณีที่ใช้พิจารณาสำหรับข้าราชการประเภทอื่น
                เป็นอำนาจหน้าที่ของคณะกรรมการข้าราชการ
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    )
  }
}
