import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid, Link, Divider, Paper } from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import If from 'src/components/logical/If';
import { assets } from 'src/assets/assets';
import _ from 'lodash';
import { AccountStoreContext } from 'src/store/AccountStore';
import CustomLoader from 'src/components/loader/loader';
import Expanded from 'src/components/helper/Expanded';
import { AppStoreContext } from 'src/store/AppStore';
import SubPageWrapper from 'src/components/helper/SubPageWrapper';
import SideBarDrawer from 'src/components/appNavBar/components/SideBarDrawer';

const AccountInfoLeftNav = ({ item, onClick, selectedleftNav, open }) => {
  return (
    <ListItem key={item.displayName} disablePadding>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: 'center',
          px: 2.5,
          mx: 1,
          backgroundColor:
            selectedleftNav === item.displayName ? assets.colors.lightGrey : '',
          '&:hover': {
            backgroundColor:
              selectedleftNav === item.displayName
                ? assets.colors.lightGrey
                : '',
          },
          borderRadius: '8px',
        }}
        onClick={() => onClick(item.displayName)}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            justifyContent: 'center',
            color: selectedleftNav === item.displayName ? 'white' : 'black',
          }}
        >
          <img alt="category icon" width={24} src={item.icon} />
        </ListItemIcon>
        <If condition={open}>
          <ListItemText
            primary={item.displayName}
            sx={{ opacity: 1, fontWeight: 500, mx: '4px' }}
          />
        </If>
      </ListItemButton>
    </ListItem>
  );
};

const AccountInfoPageTables = ({ accountScreenData }) => {
  const accountInfoPage = accountScreenData?.AccountInfoPage;

  const StyledTableCell = styled(TableCell)`
    border: 1px solid #8080808f;
    text-align: center;
  `;

  return (
    <div>
      {Object.keys(accountInfoPage || []).map((key) => {
        const category = accountInfoPage[key];
        const { name, headings, data } = category;

        return (
          <div key={name} id={name}>
            <h2>{name}</h2>
            <TableContainer component={Paper}>
              <Table sx={{ textAlign: 'center' }}>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: assets.colors.lightGrey,
                    }}
                  >
                    {headings.map((heading) => (
                      <StyledTableCell key={heading}>{heading}</StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item, index) => (
                    <React.Fragment key={index}>
                      <TableRow>
                        <StyledTableCell rowSpan={item.column2.length}>
                          {item.column1}
                        </StyledTableCell>
                        <StyledTableCell>{item.column2[0]}</StyledTableCell>
                        <StyledTableCell>{item.column3[0]}</StyledTableCell>
                      </TableRow>
                      {item.column2.slice(1).map((value, subIndex) => (
                        <TableRow key={value}>
                          <StyledTableCell>{value}</StyledTableCell>
                          <StyledTableCell>
                            {item.column3[subIndex + 1]}
                          </StyledTableCell>
                        </TableRow>
                      ))}
                      <If condition={index !== data.length - 1}>
                        <TableRow>
                          <StyledTableCell></StyledTableCell>
                          <StyledTableCell></StyledTableCell>
                          <StyledTableCell></StyledTableCell>
                        </TableRow>
                      </If>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br />
            <Divider />
          </div>
        );
      })}
    </div>
  );
};

const PointsGridItem = ({ keyName, count, name }) => {
  return (
    <Grid margin={2} item xs={4} md={3} key={keyName}>
      <Box
        padding={1}
        sx={{
          border: '0.25px solid #8080808f',
          borderRadius: '5px',
          height: '100%',
          width: 'fit-content',
        }}
      >
        <Typography
          variant="body2"
          color={'black'}
          fontWeight={'500'}
          fontSize={18}
        >
          {count}
        </Typography>
        <Typography variant="body2" color="textSecondary" fontSize={'1rem'}>
          {name} Points
        </Typography>
      </Box>
    </Grid>
  );
};

function AccountInfoPage() {
  const { accountScreenData } = useContext(AccountStoreContext);

  const appStore = useContext(AppStoreContext);

  const navigate = useNavigate();

  const [selectedleftNav, setSelectLeftnav] = useState(
    appStore?.loginData?.services?.[0].displayName
  );

  const [open, setOpen] = useState(true);

  const points = Object.keys(accountScreenData?.AccountInfoPage || []).map(
    (key) => {
      const category = accountScreenData?.AccountInfoPage[key];
      const { name, data } = category;
      const column2Count = data.reduce(
        (count, item) => count + item.column2.length,
        0
      );

      return {
        name: name,
        count: column2Count,
      };
    }
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetId = entry.target.id;
          const correspondingNavItem = appStore?.loginData?.services.find(
            (navItem) => navItem.displayName === targetId
          );
          if (correspondingNavItem) {
            setSelectLeftnav(correspondingNavItem.displayName);
          }
        }
      });
    }, options);

    appStore?.loginData?.services.forEach((service) => {
      const serviceElement = document.getElementById(service.displayName);
      if (serviceElement) {
        observer.observe(serviceElement);
      }
    });

    return () => {
      appStore?.loginData?.services.forEach((service) => {
        const serviceElement = document.getElementById(service.displayName);
        if (serviceElement) {
          observer.unobserve(serviceElement);
        }
      });
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    appStore.setSelectedCategory();
    // eslint-disable-next-line
  }, []);

  const handleNavigateBack = () => {
    navigate('../');
  };

  const handleSectionClick = (sectionName) => {
    const sectionElement = document.getElementById(sectionName);
    setSelectLeftnav(sectionName);
    if (sectionElement) {
      sectionElement.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  if (points) {
    return (
      <SubPageWrapper>
        <SideBarDrawer
          open={appStore.sideBarOpen}
          setOpen={appStore.setSideBarOpen}
        />
        <Box
          sx={{
            backgroundColor: { md: assets.colors.background },
            width: '-webkit-fill-available',
          }}
        >
          <Grid
            container
            spacing={4}
            justifyContent="center"
            sx={{ marginTop: 0 }}
          >
            <Grid
              item
              sx={{
                display: { xs: 'none', md: 'block' },
                minWidth: 'fit-content',
              }}
              md={2}
            >
              <Paper
                elevation={0}
                sx={{
                  height: '90vh',
                  marginLeft: open ? '0' : 'auto',
                  marginRight: open ? 'auto' : '0',
                  px: 2,
                  width: 'fit-content',
                }}
              >
                <Typography
                  noWrap
                  sx={{
                    py: 3,
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: open ? 'flex-start' : 'center',
                    alignItems: 'center',
                  }}
                  fontSize={24}
                  fontWeight={600}
                >
                  <ArrowBackIcon
                    onClick={handleNavigateBack}
                    sx={{ mx: 1, cursor: 'pointer' }}
                  />
                  {open && 'Account info'}
                </Typography>
                <List>
                  {appStore?.loginData?.services.map((item, index) => (
                    <AccountInfoLeftNav
                      key={item.displayName}
                      item={item}
                      onClick={handleSectionClick}
                      selectedleftNav={selectedleftNav}
                      open={open}
                      setOpen={setOpen}
                    />
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  height: '90vh',
                  overflowY: 'scroll',
                  margin: '0 20px',
                }}
              >
                <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                    py: 2,
                    px: 3,
                    backgroundColor: assets.colors.white,
                    borderRadius: '5px',
                  }}
                >
                  <Typography paragraph>
                    Account Info is{' '}
                    <Typography component="span" fontWeight={'900'}>
                      view only
                    </Typography>
                    . Please contact{' '}
                    <Link href="mailto:projectsupport@gmail.com">
                      projectsupport@fluxgen.com
                    </Link>{' '}
                    to make changes.
                  </Typography>
                  <Grid container sx={{ mb: 4 }}>
                    {_.map(points, (item, index) => (
                      <PointsGridItem
                        key={item?.name}
                        count={item?.count}
                        name={item?.name}
                      />
                    ))}
                  </Grid>
                  <div>
                    <AccountInfoPageTables
                      accountScreenData={accountScreenData}
                    />
                  </div>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </SubPageWrapper>
    );
  } else {
    return (
      <Expanded
        extraSx={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CustomLoader />
      </Expanded>
    );
  }
}

export default AccountInfoPage;
