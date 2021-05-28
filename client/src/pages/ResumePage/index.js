import React, { useRef, useState } from 'react';
import { Paper, Box, makeStyles, Button, Typography } from '@material-ui/core';
import { useResume } from '../../contexts/useResume';
import Masonry from 'react-masonry-css';
import ResumeSectionHeader from '../../components/ResumePage/Section/Header';
import './resume.css';
import ResumeRecordContainer from '../../components/ResumePage/Section/Container';
import ResumeDrag from '../../components/ResumePage/Drag';
import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';
import { ReactHeight } from 'react-height';

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
  const { handleSubmit, fields } = useResume();
  const inputRef = useRef(null);
  const printDocument = () => {
    const input = document.getElementById('resume-print');

    htmlToImage.toCanvas(input, { quality: 1 }).then(function (canvas) {
      const pdf = new jsPDF({
        orientation: 'portrait', // landscape or portrait
        unit: 'mm',
        format: 'a4',
      });
      // const imgProps = pdf.getImageProperties(dataUrl);
      // const margin = 0;

      // const pdfWidth = pdf.internal.pageSize.width * (1 - margin);
      // const pdfHeight = pdf.internal.pageSize.height * (1 - margin);

      // const x = pdf.internal.pageSize.width * (margin / 2);
      // const y = pdf.internal.pageSize.height * (margin / 2);

      // const widthRatio = pdfWidth / imgProps.width;
      // const heightRatio = pdfHeight / imgProps.height;
      // const ratio = Math.min(widthRatio, heightRatio);

      // const w = imgProps.width * ratio;
      // const h = imgProps.height * ratio;

      // pdf.addImage(dataUrl, 'JPEG', x, y, w, h);

      // const imgProps = pdf.getImageProperties(dataUrl);

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

      pdf.save('download.pdf');
    });
  };
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        // flexDirection="column"
      >
        <Paper className={classes.paper}>
          <Button type="submit">Save Data</Button>
          <Button variant="outlined" onClick={printDocument}>
            Print
          </Button>
          <ResumeDrag />
          <ReactHeight onHeightReady={(height) => console.log(height)}>
            <Box className={classes.cvRoot} id="resume-print" ref={inputRef}>
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
              <Box
                display="flex"
                justifyContent="flex-end"
                style={{ width: '100%' }}
              >
                <Typography variant="subtitle1" color="primary" component="h4">
                  © ldcv.vn
                </Typography>
              </Box>
            </Box>
          </ReactHeight>
        </Paper>
      </Box>
    </form>
  );
};

const Resume = () => {
  return <PageResume />;
};

export default Resume;
