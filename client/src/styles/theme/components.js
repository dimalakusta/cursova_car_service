import { palette } from './palette';

export const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none'
        },
        '&:hover': {
          boxShadow: 'none'
        }
      },
      sizeSmall: {
        height: 32,
        padding: '5px 12px',
        minWidth: 75
      },
      sizeMedium: {
        height: 40,
        fontSize: 14,
        padding: '9px 16px',
        minWidth: 160
      },
      sizeLarge: {
        height: 46,
        fontSize: 16,
        padding: '13px 28.5px',
        minWidth: 164
      },
      containedSizeSmall: {
        background: palette.primaryStates.disabledSecondary,
        color: palette.text?.primary,
        borderRadius: 8,
        fontSize: 12,
        '&:hover': {
          background: palette.others.background
        },
        '&.Mui-disabled': {
          color: palette.primaryStates.disabled,
          background: palette.others.background
        }
      },
      containedPrimary: {
        '&:hover': {
          backgroundColor: palette.primaryStates.hover
        },
        '&.Mui-disabled': {
          color: palette.common?.white,
          background: palette.primaryStates.disabled
        }
      },
      containedSecondary: {
        color: palette.primary?.main,
        '&:hover': {
          backgroundColor: palette.secondary?.main
        },
        '&.Mui-disabled': {
          color: palette.primaryStates.disabled,
          background: palette.others.background
        }
      },
      containedSuccess: {
        color: palette.success?.contrastText,
        backgroundColor: palette.success?.main,
        '&:hover': {
          color: palette.success?.contrastText,
          backgroundColor: palette.success?.main
        }
      },
      text: {
        color: palette.text?.primary,
        background: palette.primaryStates.disabledSecondary,
        '&:hover': {
          background: 'transparent'
        }
      }
    }
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 64px 0 64px'
      }
    }
  },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '32px 64px 40px 64px'
      }
    }
  }
};
