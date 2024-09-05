import { useState } from "react";
import {Form, Button, FormControl, InputGroup, } from "react-bootstrap";

const SendMessageForm = ({sendMessage}) =>{
    const [message,setMessage] = useState('');

    return <Form onSubmit={ (e)=>{
        e.preventDefault();
        sendMessage(message);
        setMessage('');
    }}>
        <InputGroup>
        <div style={{width:"90%"}}>
        <FormControl placeholder="message..."
        onChange={e=>setMessage(e.target.value)} value={message} /></div>
        
        <div style={{width:"10%", float:"right"}}>
            <Button variant="primary" type="submit" disabled={!message}>Send</Button>    </div>
        </InputGroup>
    </Form>
}

export default SendMessageForm;