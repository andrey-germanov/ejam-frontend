import { SxProps, Theme } from '@mui/material';

export const pageStyle: SxProps<Theme> = () => ({
  marginTop: '24px',
  '.heroes-form': {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  '.delete': {
    fontSize: '10px',
    color: 'gray',
    cursor: 'pointer',
    position: 'absolute',
    right: '8px',
    top: '8px'
  }
});

export const cardStyle: SxProps<Theme> = () => ({
  position: 'relative',
  minWidth: 200,
  maxWidth: 400,
  background: '#ededed'
});
