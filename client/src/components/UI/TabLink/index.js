import React, { useEffect } from 'react';
import { Tabs, Tab, AppBar, Container, Box } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';

const TabLink = ({ rootLink, listTabs }) => {
  const history = useHistory();
  const { page } = useParams();

  const getPage = (index) =>
    listTabs?.filter((item) => item?.index === index)[0].page;

  useEffect(() => {
    const getIndex = (page) =>
      listTabs.filter((item) => item?.page === page)[0]?.index;
    setSelectedTab(getIndex(page));
  }, [page, listTabs]);

  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log('new vl ', newValue);
    history.push(`/${rootLink}/${getPage(newValue)}`);
    setSelectedTab(newValue);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {listTabs?.map((item) => (
            <Tab label={item?.label} key={item?.label} />
          ))}
        </Tabs>
      </AppBar>
      <Container>
        <Box margin={2}>
          {listTabs.map((item) => selectedTab === item.index && item.component)}
        </Box>
      </Container>
    </div>
  );
};

export default TabLink;
