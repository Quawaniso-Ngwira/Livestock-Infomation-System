import React, { useEffect, useState } from "react";
import "./feedsTable.css";
import { PrintSharp } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function FeedsTable() {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle"><p>Nutrition Requirements(per day)</p>  <PrintSharp aria-describedby={id} variant="contained" color="primary" onClick={handleClick} style={{cursor: "pointer"}}/>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>Export PDF</Typography>
      </Popover>
      </h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Protein(/day)</th>
          <th className="widgetLgTh">Carbohydrates(/day)</th>
          <th className="widgetLgTh">Calcium(/day)</th>
          <th className="widgetLgTh">Vitamin(/day)</th>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgDate">40kg</td>
          <td className="widgetLgDate">5kg</td>
          <td className="widgetLgDate">5kg</td>
          <td className="widgetLgAmount">32kg</td>
          <td className="widgetLgStatus">
          </td>
        </tr>
      
      </table>
    </div>
  );
}
