import React from 'react';

function ProfilePicture() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ marginRight: '30px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title='Account settings'>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 50, height: 50 }}>
              <img height={100} src='/Jira-Emblem.png' alt='Otis logo' />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default ProfilePicture;
