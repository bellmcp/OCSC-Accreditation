// @ts-nocheck
import React, { useEffect } from 'react'
import queryString from 'query-string'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles'
import {
  useMediaQuery,
  Container,
  Typography,
  Grid,
  Box,
  Divider,
  Button,
  Link,
  Avatar,
} from '@material-ui/core'
import {
  ArrowForwardIos as ArrowForwardIcon,
  Search as SearchIcon,
} from '@material-ui/icons'
import CategoryFilter from 'modules/categories/components/CategoryFilter'
import 'pure-react-carousel/dist/react-carousel.es.css'

import * as pressesActions from 'modules/press/actions'
import * as coursesActions from 'modules/courses/actions'
import * as categoriesActions from 'modules/categories/actions'
import * as curriculumsActions from 'modules/curriculums/actions'
import Header from 'modules/ui/components/Header'
import PressCarousel from 'modules/press/components/PressCarousel'
import CourseCarousel from 'modules/courses/components/CourseCarousel'
import CurriculumCarousel from 'modules/curriculums/components/CurriculumCarousel'

import Infographic from 'assets/images/infographic.jpeg'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    sectionTitle: {
      fontSize: '1.7rem',
      fontWeight: 600,
      zIndex: 3,
      marginBottom: '24px',
    },
    seeAllButton: {
      marginBottom: '0.35em',
      zIndex: 3,
    },
  })
)

const TITLE = 'OCSC Learning Space'
const SUBTITLE =
  'โลกแห่งการเรียนรู้ ไม่มีวันจบสิ้น ยิ่งเรียนยิ่งรู้ ยิ่งเพิ่มพลังทางปัญญา'

export default function Home() {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const dispatch = useDispatch()
  const history = useHistory()
  const PATH = process.env.REACT_APP_BASE_PATH

  const linkToFaq = () => {
    history.push(`${PATH}/faq`)
  }

  const linkToSearchCurriculum = () => {
    history.push(`${PATH}/search/curriculum`)
  }

  return (
    <>
      <Header title='FAQ' subtitle='คำถามที่พบบ่อย' icon={<div />} />
      <Container maxWidth='lg' className={classes.content}>
        <Grid container spacing={10}>
          <Grid container item xs={6} justify='space-between'>
            <Box mt={2} mb={4}>
              <Grid container direction='row' alignItems='center'>
                <Typography
                  gutterBottom
                  component='h2'
                  variant='h6'
                  className={classes.sectionTitle}
                >
                  การรับรองคุณวุฒิหลักสูตร
                </Typography>
              </Grid>
              <Typography
                variant='body1'
                color='textSecondary'
                style={{ textIndent: '50px', marginBottom: '16px' }}
              >
                การรับรองคุณวุฒิบุคคลเพื่อบรรจุเข้ารับราชการ
                และกำหนดอัตราเงินเดือนที่ควรได้รับ เป็นอำนาจหน้าที่ของ
                ก.พ.และสำนักงาน ก.พ.ตามนัยมาตรา8(10) และมาตรา13(11)
                แห่งพระราชบัญญัติระเบียบข้าราชการพลเรือน พ.ศ 2551
              </Typography>
              <Typography
                variant='body1'
                color='textSecondary'
                gutterBottom
                style={{ textIndent: '50px', marginBottom: '16px' }}
              >
                การรับรองคุณวุฒิของ ก.พ.
                จึงมีวัตถุประสงค์เพื่อให้ทางราชการได้บุคคลที่มีความรู้ความสามารถไม่ต่ำกว่ามาตรฐานที่
                ก.พ. กำหนด มาปฏิบัติราชการ
                และกำหนดเงินเดือนที่ควรได้รับให้เหมาะสมกับความรู้ความสามารถ ก.พ.
                จะรับรองคุณวุฒิการศึกษาในระดับต่าง ๆ ตามหลักสูตรการศึกษา
                ที่สถาบันการศึกษาได้จัดทำขึ้น
                และได้รับการรับรองมาตรฐานการศึกษาจากกระทรวงศึกษาธิการแล้วหมายถึง
                ก.พ. รับรองคุณวุฒิ แต่มิได้รับรองวิทยฐานะสถาบันการศึกษาต่าง ๆ
                ทั้งในประเทศและต่างประเทศ
              </Typography>
              <Typography
                variant='body1'
                color='textSecondary'
                gutterBottom
                style={{ textIndent: '50px', marginBottom: '16px' }}
              >
                หลักเกณฑ์การรับรองคุณวุฒิของผู้สำเร็จการศึกษาจากต่างประเทศ
                เพื่อประโยชน์ในการบรรจุและการแต่งตั้งข้าราชการพลเรือนสามัญ ก.พ.
                จะรับรองคุณวุฒิที่ได้รับ
                จากสถาบันการศึกษาที่ได้รับการรับรองวิทยฐานะจากหน่วยงานที่มีอำนาจหน้าที่ตามกฎหมายของประเทศนั้น
                ๆ ให้บรรจุเข้ารับราชการได้
              </Typography>
              <Typography
                variant='body1'
                color='textSecondary'
                gutterBottom
                style={{ textIndent: '50px', marginBottom: '16px' }}
              >
                ระบบการจัดเก็บข้อมูลหลักสูตรและคุณวุฒิที่ ก.พ.รับรอง
                เป็นการเผยแพร่ข้อมูลหลักสูตรการศึกษาต่างๆ
                ทั้งในประเทศและต่างประเทศว่ามีหลักสูตรใดบ้างที่
                ก.พ.รับรองคุณวุฒิ ให้บรรจุเข้ารับราชการได้
                โดยข้อมูลในระบบฯจะแบ่งเป็น 2 ส่วนใหญ่ๆ คือ
              </Typography>
              <Typography
                variant='body1'
                color='textSecondary'
                gutterBottom
                style={{ marginLeft: '50px', marginBottom: '16px' }}
              >
                1. การรับรองคุณวุฒิในประเทศ
                <br />
                2. การรับรองคุณวุฒิต่างประเทศ
              </Typography>
              <Typography
                variant='body1'
                color='textSecondary'
                gutterBottom
                style={{ textIndent: '50px', marginBottom: '32px' }}
              >
                ซึ่งจะปรากฏข้อมูลที่ผู้ค้นหาควรทราบเบื้องต้น
                และคำแนะนำในการใช้ระบบ
                เพื่อให้ท่านบรรลุวัตถุประสงค์ในการค้นหาข้อมูลที่ท่านต้องการ
              </Typography>
            </Box>
            <Grid item style={{ width: '100%' }}>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                disableElevation
                startIcon={<SearchIcon />}
                onClick={linkToSearchCurriculum}
              >
                ค้นหาการรับรองคุณวุฒิหลักสูตร
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Box mt={2} mb={4}>
              <Link href={Infographic} target='_blank'>
                <Avatar
                  variant='rounded'
                  src={Infographic}
                  style={{ width: '100%', height: 'auto' }}
                >
                  test
                </Avatar>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <div style={{ backgroundColor: '#F2F4F3' }}>
        <Container maxWidth='lg' className={classes.content}>
          <Grid
            container
            direction='row'
            justify={matches ? 'space-between' : 'center'}
            alignItems='center'
          >
            <Typography
              gutterBottom
              component='h2'
              variant='h6'
              className={classes.sectionTitle}
            >
              คำถามที่พบบ่อย
            </Typography>
            <Button
              variant='text'
              color='primary'
              endIcon={<ArrowForwardIcon />}
              onClick={linkToFaq}
              className={classes.seeAllButton}
            >
              ดูทั้งหมด
            </Button>
          </Grid>
          <Typography
            variant='h6'
            color='textPrimary'
            style={{ marginBottom: '16px', fontWeight: 600 }}
          >
            1. การนำผลการรับรองในระบบรับรองคุณวุฒิด้วยระบบอิเล็กทรอนิกส์ไปใช้
          </Typography>
          <Typography
            variant='body1'
            color='textSecondary'
            style={{ textIndent: '50px', marginBottom: '16px' }}
          >
            สำนักงาน ก.พ. ขอเรียนว่า ผลการรับรองที่ได้จากระบบอิเล็กทรอนิกส์นี้
            เป็นเพียงเครื่องมือที่ช่วยค้นหาคุณวุฒิที่ต้องการ
            ว่าปรากฏอยู่ในหนังสือเวียนฉบับใด ดังนั้น
            หากประสงค์จะนำไปอ้างอิงในกรณีใด ๆ ก็ตาม
            ต้องอ้างอิงจากหนังสือเวียนหรือไฟล์หนังสือเวียนที่เป็น PDF เท่านั้น
            ตรวจสอบหนังสือเวียนได้จาก ที่นี่
          </Typography>
          <Typography
            variant='h6'
            color='textPrimary'
            style={{ marginBottom: '16px', fontWeight: 600 }}
          >
            2. การสมัครสอบของข้าราชการประเภทอื่น
          </Typography>
          <Typography
            variant='body1'
            color='textSecondary'
            style={{ textIndent: '50px', marginBottom: '16px' }}
          >
            การสมัครสอบใด ๆ ที่ไม่ใช่ข้าราชการพลเรือนสามัญ
            หากมีข้อสงสัยเรื่องคุณวุฒิว่าตรงตามคุณสมบัติเฉพาะสำหรับตำแหน่งที่ประกาศรับสมัครกำหนดไว้หรือไม่
            โปรดติดต่อกับหน่วยงานที่ประกาศรับสมัครนั้น ๆ โดยตรง
          </Typography>
        </Container>
      </div>
    </>
  )
}
