//@ts-nocheck
import * as React from 'react'
import { get } from 'lodash'
import QRCode from 'react-qr-code'
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
    this.state = {
      isContentOverflowing: false,
    }
    this.containerRef = React.createRef()
  }

  componentDidMount() {
    this.checkContentOverflow()
  }

  checkContentOverflow = () => {
    const container = this.containerRef.current
    if (container.scrollHeight > 1122) {
      this.setState({ isContentOverflowing: true })
    } else {
      this.setState({ isContentOverflowing: false })
    }
  }

  parseTextToNewLine = (text: string) => {
    return text.replaceAll('|', '<br>')
  }

  public render() {
    const { isContentOverflowing } = this.state

    return (
      <ThemeProvider theme={theme}>
        <Container
          style={{
            width: '210mm',
            minHeight: '297mm',
            // backgroundColor: 'white',
            // border: '1px solid lightgray',
            background: `url(${background})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            display: 'flex',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 55,
              right: 55,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                height: 'auto',
                margin: '0 auto',
                maxWidth: 75,
                width: '100%',
              }}
            >
              <QRCode
                size={256}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value={`https://accreditation.ocsc.go.th/accreditation/cert/${get(
                  this,
                  'props.certificate.id',
                  '-'
                )}`}
                viewBox={`0 0 256 256`}
              />
            </div>
            <Typography
              variant='caption'
              color='textSecondary'
              align='center'
              style={{
                fontSize: 12,
                marginTop: 5,
                lineHeight: '1.2',
              }}
            >
              Cert ID: {get(this, 'props.certificate.id', '-')}
            </Typography>
          </div>
          <div
            style={{
              position: 'absolute',
              top: 55,
              left: 55,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant='caption'
              color='textSecondary'
              align='center'
              style={{
                fontSize: 12,
                marginTop: 5,
                lineHeight: '1.2',
              }}
            >
              พิมพ์ ณ วันที่{' '}
              {new Date(new Date()).toLocaleDateString('th-TH', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}{' '}
              เวลา{' '}
              {new Date(new Date()).toLocaleTimeString('th-TH', {
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              น.
            </Typography>
          </div>

          <Grid
            container
            direction='column'
            justify='center'
            alignItems='center'
            wrap='nowrap'
            style={{ overflow: 'hidden', maxHeight: '297mm' }}
          >
            <Grid
              item
              ref={this.containerRef}
              style={{
                transform: isContentOverflowing ? 'scale(0.85)' : 'scale(1)',
                display: 'flex',
                padding: '50px',
              }}
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
                  fontSize:
                    get(this, 'props.certificate.degree.length', 0) >= 50
                      ? 27
                      : 37,
                  fontWeight: 500,
                  marginBottom: 12,
                  lineHeight: 1,
                }}
              >
                {get(this, 'props.certificate.degree', '-')}
              </Typography>
              {get(this, 'props.certificate.branch', '') !== '' && (
                <Typography
                  variant='caption'
                  color='secondary'
                  align='center'
                  style={{
                    fontSize:
                      get(this, 'props.certificate.branch.length', 0) >= 40
                        ? 20
                        : 25,
                    fontWeight: 500,
                    marginBottom: 24,
                    lineHeight: 1,
                  }}
                >
                  ({get(this, 'props.certificate.branch', '')})
                </Typography>
              )}
              <Typography
                variant='body1'
                color='textPrimary'
                align='center'
                style={{ fontSize: 20, marginBottom: 5 }}
              >
                จาก
              </Typography>
              <Typography
                variant='h6'
                color='textPrimary'
                align='center'
                style={{
                  fontSize:
                    get(this, 'props.certificate.university.length', 0) >= 50
                      ? 24
                      : 28,
                  marginBottom: 24,
                  lineHeight: '1.2',
                }}
              >
                {get(this, 'props.certificate.university', '-')}
              </Typography>

              <Typography
                variant='body1'
                color='textPrimary'
                align='center'
                style={{ fontSize: 20, marginBottom: 5 }}
              >
                เป็นคุณวุฒิ
              </Typography>

              {get(this, 'props.certificate.accreditation3', '') !== '' ? (
                <Typography
                  variant='h6'
                  color='textPrimary'
                  align='center'
                  style={{
                    fontSize: 22,
                    marginTop: 8,
                    marginBottom: 38,
                    lineHeight: '1.2',
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.parseTextToNewLine(
                        get(this, 'props.certificate.accreditation3', '-')
                      ),
                    }}
                  />
                </Typography>
              ) : (
                <Typography
                  variant='h6'
                  color='textPrimary'
                  align='center'
                  style={{
                    fontSize: 28,
                    marginTop: 8,
                    marginBottom: 38,
                    lineHeight: '1.2',
                  }}
                >
                  {get(this, 'props.certificate.accreditation1', '-')}
                </Typography>
              )}

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

              {get(this, 'props.certificate.note', '') !== '' && (
                <Typography
                  variant='body1'
                  color='textPrimary'
                  align='center'
                  style={{
                    lineHeight: '1.2',
                    fontSize:
                      get(this, 'props.certificate.note.length', 0) >= 100
                        ? 14
                        : 20,
                    marginBottom: 25,
                  }}
                >
                  หมายเหตุ {get(this, 'props.certificate.note', '-')}
                </Typography>
              )}

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
                color='textSecondary'
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
                color='textSecondary'
                align='center'
                style={{
                  fontSize: 15,
                  marginBottom: 0,
                  lineHeight: '1.2',
                  marginTop: 20,
                }}
              >
                การพิจารณาคุณวุฒิของผู้สมัครสอบแข่งขันเพื่อบรรจุและแต่งตั้งบุคคลเข้ารับราชการเป็นข้าราชการพลเรือนสามัญ
                <br />
                มีเงื่อนไขที่แตกต่างกันตามประกาศรับสมัครที่สอบแข่งขันฯ
                ของแต่ละส่วนราชการ ดังนั้น หากมีข้อสงสัย
                <br />
                ในการสมัครสอบขอได้โปรดติดต่อสอบถามกับส่วนราชการที่ประกาศรับสมัครสอบแข่งขันฯ
                โดยตรง
              </Typography>
              <Typography
                variant='body2'
                color='textSecondary'
                align='center'
                style={{
                  color: '#f44336',
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
                color='textSecondary'
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
                <br />
                กรณีที่ใช้พิจารณาสำหรับข้าราชการประเภทอื่น
                เป็นอำนาจหน้าที่ของคณะกรรมการข้าราชการ
              </Typography>
              {/* 
              <Typography
                variant='caption'
                color='textSecondary'
                align='center'
                style={{
                  fontSize: 12,
                  marginBottom: 0,
                  lineHeight: '1.2',
                  marginTop: 40,
                }}
              >
                https://accreditation.ocsc.go.th/accreditation/cert/
                {get(this, 'props.certificate.id', '-')}
              </Typography> */}
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    )
  }
}
