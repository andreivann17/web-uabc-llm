import React, { useRef, useEffect, useState } from "react";
import Header from "../../components/navigation/header";
import Contenido from "../../components/navigation/content";
import {actionMeses} from "../../redux/actions/utils/utils"
import { actionRecordsGet } from "../../../src/redux/actions/records/records";
import { useParams } from "react-router-dom";
import { useDispatch,connect } from "react-redux";
import CardRecords from "../../components/cards/cardRecords"
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  subDays,
} from "date-fns";
import {

  Dropdown,
  Menu,
  Button,
  Drawer,
  DatePicker,
} from "antd";
import backgroundImage from "../../assets/img/BackgroundRecords.jpg"
const token = localStorage.getItem("tokends");
const { RangePicker } = DatePicker;
const currentDate = new Date();
function Home({meses,fechas,data,dataRecords}) {
  let {id} = useParams()
  const dispatch = useDispatch();
  const [isCustomDrawerOpen, setIsCustomDrawerOpen] = useState(false);
  const [customRange, setCustomRange] = useState([]);
  const [titleDate, setTitleDate] = useState(format(currentDate, 'MMM dd, yyyy'));
  const [selectedRange, setSelectedRange] = useState([]);
  const [selectValue, setSelectValue] = useState("thisMonth");
  
  const options = [
    "thisYear",
    "thisMonth",
    "thisWeek",
    "today",
    "yesterday",
    "lastMonth",
    "lastWeek",
    "lastYear",
    "custom",
  ];

  const handleSelectChange = (value) => {
    setSelectValue(formatKeyToReadableText(value));
    if (value === "custom") {
      
      setIsCustomDrawerOpen(true);

      return;
    }

    let start, end;

    const formatDate = (date) => format(date, "yyyy-MM-dd");

    switch (value) {
      case "thisYear":
        start = startOfYear(new Date());
        end = endOfYear(new Date());
        break;
      case "thisMonth":
        start = startOfMonth(new Date());
        end = endOfMonth(new Date());
        break;
      case "thisWeek":
        start = startOfWeek(new Date());
        end = endOfWeek(new Date());
        break;
      case "today":
        start = new Date();
        end = new Date();
        break;
      case "yesterday":
        start = subDays(new Date(), 1);
        end = subDays(new Date(), 1);
        break;
      case "lastMonth":
        start = startOfMonth(subDays(new Date(), 30));
        end = endOfMonth(subDays(new Date(), 30));
        break;
      case "lastWeek":
        start = startOfWeek(subDays(new Date(), 7));
        end = endOfWeek(subDays(new Date(), 7));
        break;
      case "lastYear":
        start = startOfYear(subDays(new Date(), 365));
        end = endOfYear(subDays(new Date(), 365));
        break;
      case "custom":
        break;
      default:
        break;
    }
   
    if (value === "today" || value === "yesterday") {
        setTitleDate(format(start, 'MMM dd, yyyy'));
      } else {
        setTitleDate(`${format(start, 'MMM dd')} - ${format(end, 'dd, yyyy')}`);
      }
  
  
    const startDate = formatDate(start);
    const endDate = formatDate(end);
    dispatch(actionRecordsGet(startDate, endDate));
  };
  const formatKeyToReadableText = (key) => {
    if (
      key === "thisYear" ||
      key === "thisMonth" ||
      key === "thisWeek" ||
      key === "today" ||
      key === "yesterday" ||
      key === "lastMonth" ||
      key === "lastWeek" ||
      key === "lastYear"
    ) {
      return key
        .split(/(?=[A-Z])/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    } else {
      return "Custom";
    }
  };
  useEffect(() => {
    handleSelectChange("thisMonth");
  }, []);

  const handleAcceptClick = () => {
    try {
        setIsCustomDrawerOpen(false);
        setCustomRange(selectedRange);
        // Set the title date here for custom range
        setTitleDate(`${format(new Date(selectedRange[0]), 'MMM dd')} - ${format(new Date(selectedRange[1]), 'dd, yyyy')}`);
    } catch (error) {
        console.log(error)
    }
  };

  const handleRangeChange = (dates, dateStrings) => {
    setSelectedRange(dateStrings);
  };

  useEffect(() => {
    console.log(customRange)
    if (customRange.length === 2) {

      dispatch(actionRecordsGet(customRange[0], customRange[1]));
    }
  }, [customRange]);

  const handleMenuClick = (e) => {
    handleSelectChange(e.key);
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      {options.map((option) => (
        <Menu.Item key={option}>{formatKeyToReadableText(option)}</Menu.Item>
      ))}
    </Menu>
  );

  
  useEffect(() => {
    dispatch(actionMeses(id))
  }, []);
  return (
    <>
      {token != null && (
        <>
         
          
          <Drawer
        title="Select custom range"
        placement="right"
        closable={true}
        onClose={() => setIsCustomDrawerOpen(false)}
        visible={isCustomDrawerOpen}
      >
        <RangePicker onChange={handleRangeChange} />
        <Button onClick={handleAcceptClick}>Accept</Button>
      </Drawer>
          <Header title={"Records"} icon={"fas fa-book marginr-1 "} />
          <Contenido
              title={"Records"}
              backgroundImage={backgroundImage}
              icon={"fas fa-book marginr-1 "} 
            />
          <div className="Panel_Contenido  marginb-5">
            
            <div className="mt-3">
            <div className="marginb-2  d-flex justify-content-end align-items-center">
            <div className="marginr-2 mt-2">
                <h5 className="text-success">{titleDate}</h5>
              </div>
              <div>
              <Dropdown overlay={menu}>
            <Button className="w-100">
              <i className="fas fa-calendar marginr-1"></i> {selectValue}{" "}
              <i className="fas fa-angle-down marginl-1"></i>
            </Button>
          </Dropdown>
              </div>
            
          </div> 
          <div>
            <CardRecords data={dataRecords}/>
          </div>

            </div>
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  meses: state.utils.meses ?? [],
  fechas:state.utils.fechas,
  data: state.form.data[0],
  dataRecords: state.records.data ?? [],
});

export default connect(mapStateToProps)(Home);
