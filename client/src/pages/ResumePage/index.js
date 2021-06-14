import React, { useRef, useState } from 'react';
import { Paper, Box, makeStyles, Button, Typography } from '@material-ui/core';
import { useResume } from '../../contexts/useResume';
import Masonry from 'react-masonry-css';
import ResumeSectionHeader from '../../components/ResumePage/Section/Header';
import './resume.css';
import ResumeRecordContainer from '../../components/ResumePage/Section/Container';
import ResumeDrag from '../../components/ResumePage/Drag';
import * as htmlToImage from 'html-to-image';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import PrintOutlinedIcon from '@material-ui/icons/PrintOutlined';

import { jsPDF } from 'jspdf';
import { useSelector } from 'react-redux';
import { resumeSelector } from '../../features/Resume/ResumeSlice';
import { userSelector } from '../../features/User/UserSlice';
import ResumeSuggestJob from '../../components/ResumePage/SuggestJob';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '940px',
    marginBottom: 36,
    backgroundColor: '#fff',
    background: `red url('bg.png') no-repeat right top`,
  },
  cvRoot: {
    flexGrow: 1,
    padding: theme.spacing(1),
    borderRadius: 4,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(8),
    },
  },
}));

const breakpointColumnsObj = {
  default: 2,
  960: 2,
  700: 1,
  500: 1,
};

const PageResume = () => {
  const classes = useStyles();
  const { handleUpdateResume, fields } = useResume();
  const { resume } = useSelector(resumeSelector);
  const { user } = useSelector(userSelector);
  const isEnabled = resume?.user?._id === user._id;
  const [isActive, setIsActive] = useState(false);

  const inputRef = useRef(null);
  console.log(isEnabled);
  const printDocument = () => {
    htmlToImage
      .toCanvas(inputRef.current, { quality: 1 })
      .then(function (canvas) {
        const pdf = new jsPDF({
          orientation: 'portrait', // landscape or portrait
          unit: 'mm',
          format: 'a4',
        });

        const dataUrl = canvas.toDataURL('image/png', 1.0);
        const imgWidth = pdf.internal.pageSize.width;
        const pageHeight = 295;

        let imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save('ld.pdf');
      });
  };

  return (
    <form onSubmit={handleUpdateResume}>
      {isEnabled && (
        <>
          <Box display="flex" alignItems="center" padding={2}>
            <Button
              variant="outlined"
              type="submit"
              endIcon={<SaveOutlinedIcon />}
            >
              Lưu CV
            </Button>
            <Button
              variant="outlined"
              onClick={printDocument}
              style={{
                marginLeft: 16,
                marginRight: 16,
              }}
              endIcon={<PrintOutlinedIcon />}
            >
              Tải PDF
            </Button>
            <ResumeDrag />
            <Button
              variant="outlined"
              style={{
                marginLeft: 16,
                marginRight: 16,
              }}
              onClick={() => setIsActive(!isActive)}
            >
              Gợi ý việc làm
            </Button>
          </Box>

          <Typography
            variant="subtitle2"
            gutterBottom
            style={{
              padding: 4,
            }}
          >
            Hãy thêm thông tin về kỹ năng chính, vị trí để chúng tôi giúp bạn
            kết nối với nhà tuyển dụng
          </Typography>
        </>
      )}

      <Box display="flex" alignItems="center" justifyContent="center">
        {isActive && <ResumeSuggestJob />}

        <Paper className={classes.paper} ref={inputRef}>
          <Box className={classes.cvRoot} id="resume-print">
            <ResumeSectionHeader />
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {fields.map((item, index) => {
                return (
                  <ResumeRecordContainer
                    index={index}
                    key={item.id}
                    record={item.record}
                  />
                );
              })}
            </Masonry>
            <Box display="flex" justifyContent="flex-end">
              <Typography variant="subtitle1" color="primary" component="h4">
                © ldcv.vn
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </form>
  );
};

const Resume = () => {
  return <PageResume />;
};

export default Resume;
