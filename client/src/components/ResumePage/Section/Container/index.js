import React from 'react';
import ResumeRecordLayout from '../Layout/ResumeRecordLayout';
import MuiTextField from '../../Mui/MuiTextField';
import { useResumeSetting } from '../../Setting/useResumeSetting';
import ResumeTitleSetting from '../../Setting/ResumeTitleSetting';
import ResumeContainerItem from './ResumeContainerItem';
import Box from '@material-ui/core/Box';

const ResumeRecordContainer = ({ index, record }) => {
  const dataRecord = {
    AchievementSection: {
      data: {
        title: '',
        description: '',
        showDescription: true,
      },
      controlLists: [
        {
          label: 'Mô tả',
          nameField: 'showDescription',
        },
      ],
    },
    TechnologySection: {
      data: { title: '', tags: [{ name: '' }], showTitle: true },
      controlLists: [
        {
          label: 'Tiêu đề',
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
          label: 'Gpa',
          nameField: 'showGpa',
        },
        {
          label: 'Thời gian',
          nameField: 'showDateRange',
        },
        {
          label: 'Địa điểm',
          nameField: 'showLocation',
        },
        {
          label: 'Chi tiết',
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
          label: 'Mô tả',
          nameField: 'showDescription',
        },
        {
          label: 'Vị trí',
          nameField: 'showTitle',
        },
        {
          label: 'Tổ chức',
          nameField: 'showCompany',
        },
        {
          label: 'Thời gian',
          nameField: 'showDateRange',
        },
        {
          label: 'Địa điểm',
          nameField: 'showLocation',
        },
        {
          label: 'Chi tiết',
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
          label: 'Chi tiết',
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
          label: 'Thời gian',
          nameField: `showDateRange`,
        },
        {
          label: 'Địa điểm',
          nameField: `showLocation`,
        },
        {
          label: 'Mô tả',
          nameField: `showDescription`,
        },
        {
          label: 'Chi tiết',
          nameField: `showBullets`,
        },
      ],
    },
    SummarySection: {
      data: { text: '' },
      controlLists: [
        {
          label: 'Mô tả',
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
          label: 'Slider',
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
          label: 'Tiêu đề',
          nameField: `showTitle`,
        },
        {
          label: 'Công ty',
          nameField: `showCompany`,
        },
        {
          label: 'Thời gian',
          nameField: `showDateRange`,
        },
        {
          label: 'Địa điểm',
          nameField: `showLocation`,
        },
        {
          label: 'Mô tả',
          nameField: `showDescription`,
        },
        {
          label: 'Chi tiết',
          nameField: `showBullets`,
        },
      ],
    },
  };

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
          placeholder="Tiêu đề"
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
