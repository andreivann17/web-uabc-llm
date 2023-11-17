import {combineReducers} from "redux"
import menus from "./menus"
import utils from "./utils"
import form from "./form"
import records from "./records"
import patients from "./patients"
import statistics from "./statistics"
export default combineReducers({
    menus,
    utils,
    form,
    records,
    patients,
    statistics,
})