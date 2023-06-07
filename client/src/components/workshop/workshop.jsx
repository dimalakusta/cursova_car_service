import { Add as AddIcon } from '@mui/icons-material';
import { Fab, Grid, Typography } from '@mui/material';
import { ModalVariant, UserRole } from 'common/enums/enums';
import { Image, LoadingContainer } from 'components/common/common';
import { useModal } from 'hooks/hooks';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetWorkshopByIdQuery } from 'store/workshop/workshop';
import { ContactsCard, Services } from './components/components';
import { StyledLeftSideWrapper } from './workshop.styles';

const Workshop = () => {
  const { id } = useParams();
  const { userRole } = useSelector(state => ({ userRole: state.auth.user.role }));

  const { data: workshop = null, isLoading } = useGetWorkshopByIdQuery(id);
  const { handleOpen } = useModal();

  const handleOpenOrderForm = useCallback(
    () => handleOpen({ variant: ModalVariant.CREATE_ORDER, state: { workshop } }),
    [handleOpen, workshop]
  );

  const handleOpenServiceForm = useCallback(
    () => handleOpen({ variant: ModalVariant.CREATE_SERVICE, state: { workshop } }),
    [handleOpen, workshop]
  );

  if (isLoading) {
    return <LoadingContainer />;
  }

  return (
    <Grid container spacing={4} paddingTop={4} paddingBottom={4}>
      <Grid item xs={8}>
        <StyledLeftSideWrapper>
          <Image borderRadius={5} src={workshop?.image?.link} />
          <Typography variant="h2" marginTop={4} marginBottom={3}>
            Про майстерню
          </Typography>
          <Typography variant="body1" color="text.secondary" marginBottom={4}>
            {workshop?.description}
          </Typography>
          <Typography variant="h2" marginTop={4} marginBottom={3}>
            Послуги
          </Typography>
          <Services services={workshop.services} />
        </StyledLeftSideWrapper>
      </Grid>
      <Grid item xs={4}>
        <ContactsCard
          userRole={userRole}
          name={workshop?.name}
          address={workshop?.address}
          phoneNumber={workshop?.phoneNumber}
          website={workshop?.website}
          onOpenOrderForm={handleOpenOrderForm}
        />
      </Grid>
      {userRole === UserRole.ADMIN ? (
        <Fab
          color="primary"
          variant="extended"
          aria-label="add"
          sx={{ position: 'absolute', bottom: 25, right: 25 }}
          onClick={handleOpenServiceForm}
        >
          <AddIcon />
          Створити послугу
        </Fab>
      ) : null}
    </Grid>
  );
};

export { Workshop };
