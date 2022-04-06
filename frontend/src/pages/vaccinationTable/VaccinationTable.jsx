import React, { useEffect, useState } from "react";
import axios from "axios";
import "./vaccinationTable.css";
import { PrintOutlined } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));


export default function VaccinationTable() {
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

  const [finalReport, setFinalReport] = useState([]);
  const [feedingReport,setFeedingReport]=useState([]);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  
  useEffect(() => {
    var KholaId = localStorage.getItem('KholaId');
      axios.get(`https://serveriweta.herokuapp.com/khola/report/vaccination/${KholaId}`).then((response) => {
        setFinalReport(response.data);
        console.log(response.data)
      });
    }, []);

    useEffect(() => {
      var KholaId = localStorage.getItem('KholaId');
        axios.get(`https://serveriweta.herokuapp.com/khola/report/feeding/${KholaId}`).then((response) => {
          setFeedingReport(response.data);
          console.log(response.data)
        });
      }, []);
  
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle"><p>Vaccination Report</p> <PrintOutlined aria-describedby={id} variant="contained" color="primary" onClick={handleClick}/>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Typography className={classes.typography}>Export PDF</Typography>
      </Popover> </h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Type</th>
          <th className="widgetLgTh">Breed</th>
          <th className="widgetLgTh">Vaccination 
          Age(Months)</th>
          <th className="widgetLgTh">Dosage
          (ml)</th>
          <th className="widgetLgTh">Total 
          Dosage(ml)</th>
          <th className="widgetLgTh">Effective 
          After(days)</th>
          <th className="widgetLgTh">Next
          Vaccination Date</th>
          <th className="widgetLgTh">Duration
          (months)</th>
          <th className="widgetLgTh">Revaccination</th>
          <th className="widgetLgTh">Status</th>
        </tr>
  
 {finalReport.map((value, key) => {
   const sts=value.status;
   const isPending=(sts=="pending");
   return (
        <tr key={key} className="widgetLgTr">
          <td className="widgetLgUser">
            <span className="widgetLgName">{value.Type}</span>
          </td>
          <td className="widgetLgDate">{value.Breed}</td>
          <td className="widgetLgDate">{value.Ageofvaccine}</td>
          <td className="widgetLgAmount">{value.Dosage}</td>
          <td className="widgetLgAmount">{value.Total_Dosage}</td>
          <td className="widgetLgDate">{value.EffectiveAfter}</td>
          <td className="widgetLgDate">{value.Next_Vaccination_Day}</td>
          <td className="widgetLgAmount">{value.Duration}</td>
          <td className="widgetLgDate">{value.Revaccination}</td>
          <td className="widgetLgDate" style={{
             backgroundColor:isPending? "#0ee82f":"#f00511"
             }}>{value.status}</td>
          
        </tr>
   );
  })}
      </table>
      <h3 className="widgetLgTitle">Feeding report</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Age(Weeks)</th>
          <th className="widgetLgTh">Weight
          (kgs)</th>
          <th className="widgetLgTh">Daily 
          Gaining()</th>
          <th className="widgetLgTh">Feeding 
          Consumption(kgs/day)</th>
          <th className="widgetLgTh">Water
          Consumption(Ltrs/day)</th>
        </tr>
  
 {feedingReport.map((value, key) => {
   return (
        <tr key={key} className="widgetLgTr">
          <td className="widgetLgDate">{value.Age}</td>
          <td className="widgetLgAmount">{value.Weight}</td>
          <td className="widgetLgAmount">{value.DailyGaining}</td>
          <td className="widgetLgDate">{value.FeedConsumption}</td>
          <td className="widgetLgDate">{value.WaterConsumption}</td>
         
        </tr>
   );
  })}
      </table>
    </div>
  );
}
