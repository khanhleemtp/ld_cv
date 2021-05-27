import React from 'react';
import Box from '@material-ui/core/Box';
import InputUser from './InputUser';
import MuiDatePicker from '../input/MuiDatePicker';
import MuiTextField from '../input/MuiTextField';

const Project = ({ project, control }) => {
  return (
    <Box display="flex" padding={2} flexDirection="column">
      <MuiTextField
        typeText="h5"
        record="section"
        title
        control={control}
        nameField="project.title"
      />
      <Box
        style={{
          borderBottom: `1px dashed #111`,
        }}
      >
        <MuiTextField
          typeText="h6"
          record="project"
          name
          control={control}
          nameField="project.title"
          disableUnderline
        />
        <MuiTextField
          typeText="subtitle2"
          record="project"
          description
          control={control}
          nameField="project.title"
          disableUnderline
        />
        {/* <InputUser
          defaultValue="Tiki lazada"
          typeText="h6"
          record="project"
          name
        />
        <InputUser
          defaultValue="Hello World"
          typeText="subtitle2"
          record="section"
          description
        /> */}
      </Box>
      <Box
        style={{
          borderBottom: `1px dashed #111`,
        }}
      >
        <InputUser
          defaultValue="Hello World"
          typeText="subtitle1"
          record="section"
          name
        />

        <InputUser
          defaultValue="Hello World"
          typeText="subtitle2"
          record="section"
          description
        />
      </Box>
      <Box
        style={{
          borderBottom: `1px dashed #111`,
        }}
      >
        <InputUser
          defaultValue="Hello World"
          typeText="subtitle1"
          record="section"
          name
        />
        <MuiDatePicker control={control} label="from" name="from" />
        <MuiDatePicker control={control} label="to" name="to" />
      </Box>
    </Box>
  );
};

export default Project;
