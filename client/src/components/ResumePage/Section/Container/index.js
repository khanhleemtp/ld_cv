import React from 'react';
import ResumeRecordLayout from '../Layout/ResumeRecordLayout';
import MuiTextField from '../../Mui/MuiTextField';
import { useResumeSetting } from '../../Setting/useResumeSetting';
import ResumeTitleSetting from '../../Setting/ResumeTitleSetting';
import ResumeContainerItem from './ResumeContainerItem';
import { Box } from '@material-ui/core';

const ResumeRecordContainer = ({ index, record }) => {
  const {
    removeSection,
    handleDownSection,
    handleUpSection,
    fields,
    isHiddenUp,
    isHiddenDown,
    handleAddField,
    handleDownField,
    handleUpField,
    handleRemoveField,
  } = useResumeSetting(index);

  const dataRecord = {
    AchievementSection: {
      data: {
        title: '',
        description: '',
        showDescription: true,
      },
      controlLists: [
        {
          label: 'Show Description',
          nameField: 'showDescription',
        },
      ],
    },
    TechnologySection: {
      data: { title: '', tags: [{ name: '' }], showTitle: true },
      controlLists: [
        {
          label: 'Show Title',
          nameField: `showTitle`,
        },
      ],
    },
    EducationSection: {
      data: {
        title: '',
        location: '',
        from: '',
        to: '',
        gpa: '',
        gpaText: '',
        maxGpa: '',
        degree: '',
        institution: '',
        showGpa: true,
        showLocation: true,
        showDateRange: true,
        showBullets: true,
        bullets: [{ name: '' }],
      },
      controlLists: [
        {
          label: 'Show Gpa',
          nameField: 'showGpa',
        },
        {
          label: 'Show Date',
          nameField: 'showDateRange',
        },
        {
          label: 'Show Location',
          nameField: 'showLocation',
        },
        {
          label: 'Show Bullets',
          nameField: 'showBullets',
        },
      ],
    },
    ActivitySection: {
      data: {
        title: '',
        description: '',
        position: '',
        location: '',
        workplace: '',
        from: '',
        to: '',
        showDescription: true,
        showTitle: true,
        showCompany: true,
        showBullets: true,
        showLocation: true,
        showDateRange: true,
        bullets: [{ name: '' }],
      },
      controlLists: [
        {
          label: 'Show Description',
          nameField: 'showDescription',
        },
        {
          label: 'Show Title',
          nameField: 'showTitle',
        },
        {
          label: 'Show Company',
          nameField: 'showCompany',
        },
        {
          label: 'Show Date',
          nameField: 'showDateRange',
        },
        {
          label: 'Show Location',
          nameField: 'showLocation',
        },
        {
          label: 'Show Bullets',
          nameField: 'showBullets',
        },
      ],
    },
    CourseSection: {
      data: {
        title: '',
        description: '',
        showDescription: true,
      },
      controlLists: [
        {
          label: 'Show Description',
          nameField: 'showDescription',
        },
      ],
    },
    VolunteerSection: {
      data: {
        role: '',
        institution: '',
        location: '',
        from: '',
        to: '',
        description: '',
        showDescription: true,
        showLocation: true,
        showBullets: true,
        showDateRange: true,
        bullets: [''],
      },
      controlLists: [
        {
          label: 'Show DateRange',
          nameField: `showDateRange`,
        },
        {
          label: 'Show Location',
          nameField: `showLocation`,
        },
        {
          label: 'Show Description',
          nameField: `showDescription`,
        },
        {
          label: 'Show Bullets',
          nameField: `showBullets`,
        },
      ],
    },
    SummarySection: {
      data: { text: '' },
      controlLists: [
        {
          label: 'Show Description',
          nameField: `showText`,
        },
      ],
    },
    SkillSection: {
      data: {
        name: '',
        level: 0,
      },
      controlLists: [
        {
          label: 'Show Slider',
          nameField: 'showSlider',
        },
      ],
    },
    ExperienceSection: {
      data: {
        title: '',
        description: '',
        position: '',
        location: '',
        workplace: '',
        from: '',
        to: '',
        showDescription: true,
        showTitle: true,
        showCompany: true,
        showBullets: true,
        showLocation: true,
        showDateRange: true,
        bullets: [{ name: '' }],
      },
      controlLists: [
        {
          label: 'Show Title',
          nameField: `showTitle`,
        },
        {
          label: 'Show Company',
          nameField: `showCompany`,
        },
        {
          label: 'Show DateRange',
          nameField: `showDateRange`,
        },
        {
          label: 'Show Location',
          nameField: `showLocation`,
        },
        {
          label: 'Show Description',
          nameField: `showDescription`,
        },
        {
          label: 'Show Bullets',
          nameField: `showBullets`,
        },
      ],
    },
  };

  return (
    <ResumeRecordLayout
      settingComponent={
        <ResumeTitleSetting
          removeSection={removeSection(index)}
          handleAddField={handleAddField(dataRecord[record].data)}
          handleUpSection={handleUpSection(index)}
          handleDownSection={handleDownSection(index)}
        />
      }
      titleComponent={
        <MuiTextField
          typeText="h5"
          title
          record="section"
          placeholder="Title"
          nameField={`sections[${index}].name`}
        />
      }
    >
      <Box
        display="flex"
        flexDirection={record === 'CourseSection' ? 'row' : 'column'}
        flexWrap="wrap"
        width="100%"
      >
        {fields?.map((item, k) => (
          <ResumeContainerItem
            key={item.id}
            nameField={`sections[${index}].items[${k}]`}
            parentField={`sections[${index}]`}
            controlLists={dataRecord[record].controlLists}
            isHiddenUp={isHiddenUp}
            handleDownField={handleDownField}
            handleAddField={handleAddField(dataRecord[record].data)}
            handleUpField={handleUpField}
            handleRemoveField={handleRemoveField}
            isHiddenDown={isHiddenDown}
            indexField={k}
            record={record}
          />
        ))}
      </Box>
    </ResumeRecordLayout>
  );
};

export default ResumeRecordContainer;
