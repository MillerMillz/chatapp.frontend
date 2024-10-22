import { useEffect, useRef,Fragment } from "react";
import React from "react";
import dayjs from "dayjs";
import 'bootstrap/dist/css/bootstrap.min.css'
import relativeTime from "dayjs/plugin/relativeTime";
import { useUserContext } from "../Contexts/UserContext";
dayjs.extend(relativeTime);

const MessageContainer = ({messages}) =>{
    const {Authuser} = useUserContext();
    const messageRef = useRef();
    const today = new Date();
    let previousMessage = null;
    useEffect(()=>{
        if(messageRef && messageRef.current)
        {
            const {scrollHeight,clientHeight} = messageRef.current;
            messageRef.current.scrollTo({
                left:0,top: scrollHeight - clientHeight, behavior:'smooth'
            });
        }
    },[messages])

    return (
        <div ref={messageRef} className="message-container">
          {messages.map((m, index, arr) => {
            let previousMessage = arr[index - 1] || null;
            let dateElement = previousMessage=== null? (dayjs(m.time).date() === dayjs(today).date() &&
            dayjs(m.time).month() === dayjs(today).month() &&
            dayjs(m.time).year() === dayjs(today).year())?<div className="date" key={`date-${index}`}>Today</div>:<div className="date" key={`date-${index}`}>{dayjs(m.time).date()}/{dayjs(m.time).month()+1}/{dayjs(m.time).year()}</div>:null;
      
            if (previousMessage !== null) {
              if (
                dayjs(m.time).date() !== dayjs(previousMessage.time).date() ||
                dayjs(m.time).month() !== dayjs(previousMessage.time).month() ||
                dayjs(m.time).year() !== dayjs(previousMessage.time).year()
              ) {
                dateElement = (dayjs(m.time).date() === dayjs(today).date() &&
                dayjs(m.time).month() === dayjs(today).month() &&
                dayjs(m.time).year() === dayjs(today).year())?<div className="date" key={`date-${index}`}>Today</div>:<div className="date" key={`date-${index}`}>{dayjs(m.time).date()}/{dayjs(m.time).month()+1}/{dayjs(m.time).year()}</div>;
              }
            }
      
            return (
              <React.Fragment key={index}>
                {dateElement}
                {m.user === "Xylem ChatBot" ? (
                  <div className="user-message-bot">
                    <div className="message bg-secondary">{m.messageContent}</div>
                    <div className="from-user">
                      {m.user} &bull; {dayjs(m.time).hour()}:{dayjs(m.time).minute()}
                    </div>
                  </div>
                ) : m.user.id === Authuser.id ? (
                  <div className="user-message">
                    <div className="message bg-primary">{m.messageContent}</div>
                    <div className="from-user">
                      You &bull; {dayjs(m.time).hour()}:{dayjs(m.time).minute()}
                    </div>
                  </div>
                ) : (
                  <div className="user-message-me">
                    <div className="message bg-secondary">{m.messageContent}</div>
                    <div className="from-user">
                      {m.user.firstName} &bull;
                      {dayjs(m.time).hour()}:{dayjs(m.time).minute()}
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      );
}

export default MessageContainer;