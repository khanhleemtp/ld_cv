import Box from '@material-ui/core/Box';
import MuiTextField from '../input/MuiTextField';
import { useFieldArray } from 'react-hook-form';
import ContainerSection from '../section/ContainerSection';
import Section from '../section/Section';

const Achievements = ({ control, index, removeSection }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `sections[${index}].items`,
  });
  return (
    <Section
      title={
        <MuiTextField
          typeText="h5"
          title
          control={control}
          record="section"
          nameField={`sections[${index}].name`}
        />
      }
      append={append}
      index={index}
      remove={removeSection}
    >
      {fields.map((item, k) => (
        <ContainerSection
          key={item.id}
          index={k}
          remove={remove}
          append={append}
        >
          <Box
            key={item.id}
            style={{
              borderBottom: `1px dashed #111`,
            }}
          >
            <MuiTextField
              typeText="subtitle1"
              disableUnderline
              name
              control={control}
              record="section"
              nameField={`sections[${index}].items[${k}].title`}
              defaultValue={item.title}
            />
            <MuiTextField
              typeText="subtitle2"
              disableUnderline
              description
              control={control}
              record="section"
              nameField={`sections[${index}].items[${k}].description`}
              defaultValue={item.description}
            />
          </Box>
        </ContainerSection>
      ))}
    </Section>
  );
};

export default Achievements;
