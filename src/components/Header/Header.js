import React from 'react';
import Typography from 'material-ui/Typography';

const Header = ({ title }) => (
    <div>
      <Typography variant="display3" gutterBottom>{ title }</Typography>
    </div>
);

export default Header;
