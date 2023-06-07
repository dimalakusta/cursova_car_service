import {
  Link as LinkIcon,
  LocalPhone as LocalPhoneIcon,
  LocationOnOutlined as LocationOnIcon
} from '@mui/icons-material';
import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { UserRole } from 'common/enums/enums';
import { memo } from 'react';
import { ContactsIconWrapper } from './contacts-card.styles';

const ContactsCard = memo(({ userRole, name, address, phoneNumber, website, onOpenOrderForm }) => {
  return (
    <Card>
      <CardContent sx={{ padding: 4 }}>
        <Typography variant="h2" marginBottom={3}>
          {name}
        </Typography>
        <Stack direction="row" alignItems="center" marginBottom={3}>
          <LocationOnIcon color="primary" />
          <Typography variant="body2" color="text.secondary" marginLeft={2}>
            {address}
          </Typography>
        </Stack>

        {userRole === UserRole.USER ? (
          <Button
            fullWidth
            color="primary"
            variant="contained"
            sx={{ textTransform: 'uppercase', marginBottom: 6 }}
            onClick={onOpenOrderForm}
          >
            Забронювати візит
          </Button>
        ) : null}

        <Typography variant="h6" marginBottom={3}>
          Контакти
        </Typography>

        <Stack direction="row" alignItems="center" marginBottom={3}>
          <ContactsIconWrapper>
            <LocalPhoneIcon />
          </ContactsIconWrapper>
          <Typography
            variant="body2"
            color="text.primary"
            as="a"
            href="tel:+380674502686"
            sx={{ textDecoration: 'none' }}
          >
            {phoneNumber}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <ContactsIconWrapper>
            <LinkIcon />
          </ContactsIconWrapper>
          <Typography
            variant="body2"
            color="text.primary"
            as="a"
            href={website}
            sx={{ textDecoration: 'none' }}
          >
            Website
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
});

ContactsCard.displayName = 'ContactsCard';

export { ContactsCard };
