import { Button, SxProps, Theme } from "@mui/material";
import useAdminContext from "../hooks/useAdminContext";

const AdminButton = () => {
  const { isAdmin, setIsAdmin } = useAdminContext();

  const adminButtonStyle: SxProps<Theme> = {
    cursor: isAdmin ? 'pointer' : 'default', 
    ":hover": { backgroundColor: 'rgb(0,0,0,0)' },
    position: 'absolute',
    top: '37px',
    left: 0,
    height: '40px'
  }

  const adminClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if ( isAdmin ) { 
      setIsAdmin(false);
      return;
    }
    if (e.detail === 3) setIsAdmin(true);
  }

  return (
    <Button
      color={isAdmin ? 'error': 'primary'}
      onClick={adminClick}
      disableRipple
      sx={adminButtonStyle}
    >
      {isAdmin ? 'Admin' : ''}
    </Button>
  )
}

export default AdminButton;