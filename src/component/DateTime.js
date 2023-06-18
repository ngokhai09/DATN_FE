import moment from "moment";
import {useEffect, useState} from "react";

function DateTime({date}){
    const [countDown, setCountDown] = useState(5000);

    useEffect(()=>{

    })
    const formatDate = ()=>{
        let time = new Date(date);
        let currentTime = new Date();
        if(currentTime.getTime() - time.getTime() <= 86400000){
            time = convertMsToTime(currentTime.getTime() - time.getTime())
            let [hour, minute, second] = time.split(":").map(Number);
            if(hour < 1){
                if(minute < 1){
                    return `${second} second ago`
                }
                else{
                    return `${minute} minute ago`
                }
            }else if(hour <= 24){
                return `${hour} hour ago`
            }
        }

        time = moment(time).format('HH:mm:ss DD-MM-YYYY')

        return time;
    }
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
     const convertMsToTime = (milliseconds) => {
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        seconds = seconds % 60;
        minutes = minutes % 60;

        hours = hours % 24;

        return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
            seconds,
        )}`;
    }

    return(
        <>
            {formatDate()}
        </>
    )
}
export default DateTime;