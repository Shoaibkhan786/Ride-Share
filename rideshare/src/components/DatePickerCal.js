import React from "react";
import { View } from "react-native";
import DatePicker from "react-native-datepicker";
import { format } from "date-fns";
import {inject,observer} from 'mobx-react'

let gapDays;
let dateStringMax;
let month;
let date;

@inject('store')
@observer
export default class DatePickerCal extends React.Component {
  constructor(props) {
    super(props);
    date = format(new Date(), "YYYY-MM-DD");
    this.props.store.passengerDate=date;
    this.state = { date: date };
  }

  render() {
    console.log("Date is : " + format(new Date(), "MM-DD-YYYY"));
    gapDays = new Date().getDate() + 7;
    dateStringMax = new Date().getFullYear() + "-" + month + "-" + gapDays;
    return (
      <View>
        <DatePicker
          style={{ width: 200 }}
          date={this.state.date}
          mode="date"
          placeholder="Select date"
          format="YYYY-MM-DD"
          //minDate={date}
          //maxDate={dateStringMax}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36,
              borderColor: "white",
              borderRadius: 18,
              color: "white"
            }

            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            this.props.store.passengerDate=date;
            console.log("Date of passenger is :"+this.props.store.passengerDate);
            this.setState({ date: date });
          }}
        />
      </View>
    );
  }
}
