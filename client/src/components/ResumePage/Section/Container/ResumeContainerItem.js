import { Box } from '@material-ui/core';
import React, { useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { useResume } from '../../../../contexts/useResume';
import ResumeSectionSetting from '../../Setting/ResumeSectionSetting';
import AbilityItem from '../Ability/AbilityItem';
import AchievementItem from '../Achievements/AchievementItem';
import ActivityItem from '../Activity/ActivityItem';
import CourceItem from '../Course/CourceItem';
import EducationItem from '../Education/EducationItem';
import ExperienceItem from '../Experience/ExperienceItem';
import ResumeSectionLayout from '../Layout/ResumeSectionLayout';
import SummaryItem from '../Sumary/SummaryItem';
import TechnologyItem from '../Technology/TechnologyItem';
import VolunteerItem from '../Volunteer/VolunteerItem';

const ResumeContainerItem = ({
  nameField,
  controlLists,
  isHiddenUp,
  isHiddenDown,
  handleAddField,
  handleDownField,
  handleUpField,
  handleRemoveField,
  indexField,
  parentField,
  record,
}) => {
  const { control } = useResume();
  const watchObj = useWatch({
    control,
    name: nameField,
  });

  const handleDataItem = (watchObj, nameField, parentField) => ({
    AchievementSection: {
      component: <AchievementItem watchObj={watchObj} nameField={nameField} />,
    },
    CourseSection: {
      component: <CourceItem watchObj={watchObj} nameField={nameField} />,
    },
    SkillSection: {
      component: (
        <AbilityItem parentField={parentField} nameField={nameField} />
      ),
    },
    ActivitySection: {
      component: <ActivityItem watchObj={watchObj} nameField={nameField} />,
    },
    EducationSection: {
      component: <EducationItem watchObj={watchObj} nameField={nameField} />,
    },
    ExperienceSection: {
      component: <ExperienceItem watchObj={watchObj} nameField={nameField} />,
    },
    TechnologySection: {
      component: <TechnologyItem watchObj={watchObj} nameField={nameField} />,
    },
    VolunteerSection: {
      component: <VolunteerItem watchObj={watchObj} nameField={nameField} />,
    },
    SummarySection: {
      component: <SummaryItem nameField={nameField} />,
    },
  });

  const itemData = useMemo(
    () => handleDataItem(watchObj, nameField, parentField),
    [watchObj, nameField, parentField]
  );

  return (
    <ResumeSectionLayout
      settingComponent={
        <ResumeSectionSetting
          handleDownField={handleDownField(indexField)}
          handleUpField={handleUpField(indexField)}
          handleRemoveField={handleRemoveField(indexField)}
          handleAddField={handleAddField}
          isHiddenUp={isHiddenUp(indexField)}
          isHiddenDown={isHiddenDown(indexField)}
          listTriggerMenu={controlLists.map((control) => ({
            label: control.label,
            nameField:
              record === 'SkillSection'
                ? `${parentField}.showSlider`
                : `${nameField}.${control.nameField}`,
          }))}
        />
      }
    >
      <Box
        display="flex"
        flexDirection="column"
        style={{
          borderBottom: `1px dashed #111`,
        }}
      >
        {itemData[record].component}
      </Box>
    </ResumeSectionLayout>
  );
};

export default ResumeContainerItem;
