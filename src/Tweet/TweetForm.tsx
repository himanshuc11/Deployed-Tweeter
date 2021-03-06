import { FormControl } from "@chakra-ui/form-control"
import { Button, Input } from "@chakra-ui/react"
import React, { useEffect, useState, useContext } from "react"
import useForm from "../Hooks/useForm"
import { baseUrl } from "../settings"

import {TokenContext } from '../App'
import { useNavigate } from "react-router-dom"

// type tweetForm = {tweet: string}
type contentData = {content: string}

const TweetForm = () => {

    const navigate = useNavigate()
    const [form, setForm, resetForm] = useForm({content: ""}) as [contentData, Function, Function]
    const [submit, setSubmit] = useState(false) as [boolean, Function]
    // @ts-ignore
    const {token, setToken} = useContext(TokenContext)
    


    useEffect(() => {
        if(submit === true) {
            fetch(`${baseUrl}/tweet`, {
                method: "POST",
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            .then(res => {
                setSubmit(false)
                resetForm()
                if(res.status === 401) {
                    alert('Please Login')
                    return
                }
            })
            .catch(err => alert(err))
        }
    }, [submit, form.content, token])


    return (
        <FormControl id="tweet" maxWidth="40vw">
            <Input type="text" placeholder={token === "" ? "Please Login To Tweet": "Tweet it!!"} name="content" 
            onChange={(e) => setForm(e)} value={form.content} disabled={token === ""}></Input>
            <Button onClick={() => setSubmit(true)} disabled={token===""}>Tweet</Button>
        </FormControl>
    )
}

export default TweetForm
