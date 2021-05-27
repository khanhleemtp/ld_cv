import MuiTextField from '../../Mui/MuiTextField';
import ResumeBulletSection from '../Bullets';
import { Box } from '@material-ui/core';
const TechnologyItem = ({ nameField, watchObj }) => {
  const { showTitle } = watchObj;
  return (
    <>
      {showTitle && (
        <MuiTextField
          typeText="subtitle1"
          disableUnderline
          name
          record="section"
          nameField={`${nameField}.title`}
          placeholder="Title"
          blueTitle
        />
      )}
      <Box
        display="flex"
        flexWrap="wrap"
        style={{
          width: '100%',
        }}
      >
        <ResumeBulletSection
          nameField={`${nameField}.tags`}
          data={{ name: '' }}
          record="skills"
        />
      </Box>
    </>
  );
};

export default TechnologyItem;
