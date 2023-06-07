import { LocalPhone as LocalPhoneIcon } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import { AppRoute, UserRole } from 'common/enums/enums';
import { Image } from 'components/common/common';
import { memo } from 'react';
import { StyledCard, StyledCardContent, StyledWorkshopLink } from './workshop-card.styles';

const WorkshopCard = memo(({ onOpenOrderForm, workshop, userRole }) => {
  return (
    <StyledCard>
      <StyledCardContent>
        <Image width={260} borderRadius={5} src={workshop.image.link} />
        <Stack direction="column" gap={2}>
          <StyledWorkshopLink to={`${AppRoute.WORKSHOP}/${workshop.id}`}>
            <Typography variant="h6">{workshop.name}</Typography>
          </StyledWorkshopLink>
          <Typography variant="body2" color="text.secondary">
            {workshop.address}
          </Typography>
          <Stack direction="row" gap={4} alignItems="center">
            <LocalPhoneIcon color="primary" />
            <Typography variant="body2" color="text.secondary" as="a" href="tel:+380674502686">
              {workshop.phoneNumber}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" gap={4} marginTop={5}>
            <Typography
              variant="subtitle2"
              color="text.primary"
              sx={{
                width: 400,
                overflow: 'hidden',
                whiteSpace: 'pre-wrap',
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical',
                display: '-webkit-box'
              }}
            >
              {workshop.description}
            </Typography>
            {userRole === UserRole.USER ? (
              <Button size="large" variant="outlined" color="primary" onClick={onOpenOrderForm}>
                Забронювати візит
              </Button>
            ) : null}
          </Stack>
        </Stack>
      </StyledCardContent>
    </StyledCard>
  );
});

WorkshopCard.displayName = 'WorkshopCard';

export { WorkshopCard };
