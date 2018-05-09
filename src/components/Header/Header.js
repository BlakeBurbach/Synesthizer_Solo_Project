import React from 'react';
import Typography from 'material-ui/Typography';
import { Card, Paper } from 'material-ui';
import { GradientPinkBlue } from '@vx/gradient';

let pinkBlue = <GradientPinkBlue id="pinkBlue" />

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
