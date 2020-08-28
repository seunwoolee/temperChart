import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {makeStyles} from '@material-ui/styles';
import {
  Typography, Grid, Button, ButtonGroup
} from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarTodayOutlined';
import koLocale from "date-fns/locale/ko";
import DateFnsUtils from "@date-io/date-fns";
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";
import AttachmentIcon from '@material-ui/icons/Attachment';
import { CSVLink } from "react-csv";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2)
  },
  calendar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  calendarButton: {
    backgroundColor: theme.palette.common.white
  },
  calendarTodayIcon: {
    marginRight: theme.spacing(1)
  }
}));

function Header({
  temperRows, startDate, onStartDateChange, endDate, onEndDateChange, onSearchClick})
{
  const classes = useStyles();
  const [selectEdge, setSelectEdge] = useState(null);
  const [calendarDate, setCalendarDate] = useState(moment());
  const open = Boolean(selectEdge);

  const handleCalendarOpen = (edge) => {
    setSelectEdge(edge);
  };

  const handleCalendarChange = (date) => {
    setCalendarDate(date);
  };

  const handleCalendarClose = () => {
    setCalendarDate(moment());
    setSelectEdge(null);
  };

  const handleCalendarAccept = (date) => {
    setCalendarDate(moment());

    if (selectEdge === 'start') {
      onStartDateChange(date);

      if (moment(date).isAfter(endDate)) {
        onEndDateChange(date);
      }
    } else {
      onEndDateChange(date);

      if (moment(date).isBefore(startDate)) {
        onStartDateChange(date);
      }
    }

    setSelectEdge(null);
  };

  return (
    <div
      className={clsx(classes.root)}
    >
      <ButtonGroup
        variant="contained"
      >
        <Button
          className={classes.calendarButton}
          onClick={() => handleCalendarOpen('start')}
        >
          <CalendarTodayIcon className={classes.calendarTodayIcon} />
          {moment(startDate).format('YYYY-MM-DD')}
        </Button>
        <Button
          className={classes.calendarButton}
          onClick={() => handleCalendarOpen('end')}
        >
          <CalendarTodayIcon className={classes.calendarTodayIcon} />
          {moment(endDate).format('YYYY-MM-DD')}
        </Button>
        <IconButton onClick={onSearchClick}><SearchIcon /></IconButton>
        <Tooltip title={"엑셀다운로드"}>
          <CSVLink filename={"kcfeed.csv"} data={temperRows.map(row => [row[0] + " "+ row[1], row[4]])}><IconButton><AttachmentIcon/></IconButton></CSVLink>
        </Tooltip>
      </ButtonGroup>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={koLocale}>
        <DatePicker
          autoOk
          onAccept={handleCalendarAccept}
          onChange={handleCalendarChange}
          onClose={handleCalendarClose}
          open={open}
          style={{display: 'none'}} // Temporal fix to hide the input element
          value={calendarDate}
          variant="dialog"
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}

Header.propTypes = {
  temperRows: PropTypes.array.isRequired,
  startDate: PropTypes.any.isRequired,
  onStartDateChange: PropTypes.func.isRequired,
  endDate: PropTypes.any.isRequired,
  onEndDateChange: PropTypes.func.isRequired,
  onSearchClick: PropTypes.func.isRequired,
};

Header.defaultProps = {};

export default Header;
