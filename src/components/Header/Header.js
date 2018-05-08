import React from 'react';
import Typography from 'material-ui/Typography';
import { Card, Paper } from 'material-ui';

const Header = ({ title }) => (
  <div>
    <Card>
      <Paper>
        <Typography variant="display3" gutterBottom style={{padding: "10px"}}>{title}</Typography>
      </Paper>
    </Card>
  </div>
);

export default Header;
