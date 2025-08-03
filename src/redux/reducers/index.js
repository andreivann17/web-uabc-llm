import {combineReducers} from "redux"
import menus from "./menus"
import utils from "./utils"
import form from "./form"
import records from "./records"
import patients from "./patients"
import monitor from "./monitor"
import statistics from "./statistics"
import diagnosisResult from "./diagnosisResult"
import detections from "./detections"
import login from "./login"
export default combineReducers({
    menus,
    utils,
    detections,
    form,
    records,
    patients,
    monitor,
    statistics,
    diagnosisResult,
    login
})