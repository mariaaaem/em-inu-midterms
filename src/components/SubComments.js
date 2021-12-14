import React, { useState, useEffect } from 'react';
import {
    ChatBubbleOutline as ChatBubbleOutlineIcon,
    ReportGmailerrorred as ReportGmailerrorredIcon,
    Reply as ReplyIcon
} from '@mui/icons-material';
import { Button, Typography, Grid, Box, } from '@mui/material';
import { TextField, } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

import firebase from '../utils/firebase/firebase';

//SELECTOR
import { useSelector } from "react-redux";


const StyledTextField = withStyles((theme) => ({
    root: {
        width: 300,
        "& .MuiInputBase-root": {
            color: '#D1D4C9',
            paddingLeft: 10,
            paddingRight: 10,
        }
    }
}))(TextField);

export default function SubComments(props) {
    const db = firebase.firestore();

    const [subComments, showSubComments] = useState(false);
    const [replies, setReplies] = useState([]);
    const [replyCount, setReplyCount] = useState(0);
    const [replyText, setReplyText] = useState("");
    const student = useSelector((state) => state.student);

    useEffect(() => {
        let datas = [];
        db.collection("sub_comment")
            .where("comment_id", "==", props.id)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    datas.push({ ...doc.data(), id: doc.id })
                });

                setTimeout(() => {
                    setReplyCount(datas.length)
                }, 500)

            });
        return () => {
            setReplyCount(datas.length);
        };
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const showComments = (e) => {
        e.preventDefault();

        if (subComments) {
            showSubComments(false);
            return;
        }

        let datas = [];
        db.collection("sub_comment").onSnapshot((doc) => {
            doc.forEach((c) => {
                if (c.data().comment_id === props.id) {
                    datas.push({ ...c.data(), id: c.id })
                }
            });

            setTimeout(() => {
                let check = {};
                let res = [];
                for (let i = 0; i < datas.length; i++) {
                    if (!check[datas[i]["id"]]) {
                        check[datas[i]["id"]] = true;
                        res.push(datas[i]);
                    }
                }
                setReplies(res);
                showSubComments(true);

            }, 500)

        });

    }


    const handleChange = (e) => {
        setReplyText(e.target.value);
    };

    const addReply = (e) => {
        e.preventDefault();
        if(student.authEmail === undefined ||  student.authEmail === "" ){
            alert("Please sign in to continue.");
            return;
        }
        if(!replyText){
            alert("Please leave a comment.")
            return;
        }
        let email = student.authEmail;
        db.collection("sub_comment")
            .add({
                comment_id: props.id,
                commentor_email: email,
                text: replyText,
                created_at: Date.now()
            })
            .then((docRef) => {
                setReplyText("");
            })
            .catch((error) => { });
    }

    return (
        <>
            <Box style={{ height: 30, marginTop: 30, width: 280, float: 'right'}}>
                <Grid container spacing={4}>
                    <Grid item xs={8} style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', cursor: 'pointer',
                        textDecoration: 'underline', textDecorationColor: "#86888A" 
                    }}>
                        <ChatBubbleOutlineIcon style={{ marginRight: 7, color: '#86888A' }} />
                        <Typography style={{ color: '#86888A', fontSize: 14 }} onClick={showComments}>{replyCount} Comments</Typography>
                    </Grid>
                    <Grid item xs={4} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <ReportGmailerrorredIcon style={{ marginRight: 7, color: '#86888A', marginTop: -2 }} />
                        <Typography style={{ color: '#86888A', fontSize: 14 }}>Report</Typography>
                    </Grid>
                </Grid>
            </Box>

            {subComments ? (<>

                {/* sub comments */}
                {replies.map((row) => (
                    <Box style={{
                        backgroundColor: '#2C2F31', minHeight: 100, marginTop: 60,
                        borderRadius: 10, border: '1px solid #303336',
                        paddingBottom: 8, paddingTop: 10
                    }} key={row.id}>
                        <Grid container style={{ width: 320, }}>
                            <Grid item xs={2} style={{}}>
                                <Box style={{
                                    display: 'flex', width: '100%',
                                    flexDirection: 'column',
                                    height: 30, alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <ReplyIcon style={{ marginRight: 7, color: '#86888A' }} />
                                </Box>
                            </Grid>
                            <Grid item xs={9} style={{}}>
                                <Box style={{
                                    display: 'flex', width: '100%',
                                    flexDirection: 'column',
                                    height: 30, alignItems: 'flex-start', justifyContent: 'center',
                                    textAlign: 'left'
                                }}>
                                    <Typography style={{ color: '#86888A', fontSize: 14, marginLeft: -13 }}>
                                        {row.commentor_email}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        <Box style={{
                            marginTop: 13,
                            paddingLeft: 38, paddingRight: 38,
                            paddingBottom: 10
                        }}>
                            <Typography style={{ color: '#D1D4C9', fontSize: 14, marginTop: 5 }}>
                                {row.text}
                            </Typography>
                        </Box>

                    </Box>
                ))}

                {/* comment area */}
                < Box style={{
                    backgroundColor: '#2C2F31', minHeight: 120, marginTop: 20,
                    borderRadius: 10, border: '1px solid #303336',
                    paddingBottom: 15, paddingTop: 15
                }}>
                    <Grid container style={{ width: 240, }}>
                        <Grid item xs={2} style={{}}>
                            <Box style={{
                                display: 'flex', width: '100%',
                                flexDirection: 'column',
                                height: 30, alignItems: 'center', justifyContent: 'center',
                            }}>
                                <ReplyIcon style={{ marginRight: 0, color: '#86888A' }} />
                            </Box>
                        </Grid>
                        <Grid item xs={9} style={{}}>
                            <Box style={{
                                display: 'flex', width: '100%',
                                flexDirection: 'column',
                                height: 30, alignItems: 'flex-start', justifyContent: 'center',
                                textAlign: 'left'
                            }}>
                                <Typography style={{ color: '#86888A', fontSize: 14 }}>Add your comment</Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container style={{ width: '100%', marginTop: 10, paddingLeft: 40 }}>
                        <Grid item xs={8} style={{}}>
                            <Box style={{
                                display: 'flex', width: '100%',
                                flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                paddingRight: 20
                            }}>
                                <StyledTextField
                                    variant="standard"
                                    placeholder="Write your comment..."
                                    multiline
                                    minRows={2}
                                    maxRows={10}
                                    style={{
                                        width: '100%', paddingTop: 5,
                                        backgroundColor: '#131414', color: '#fff',
                                        borderRadius: 5,
                                    }}
                                    onChange={handleChange}
                                    value={replyText}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={4} style={{ marginTop: 3 }}>
                            <Box style={{
                                display: 'flex', width: '100%',
                                flexDirection: 'column',
                                height: 30, alignItems: 'center', justifyContent: 'center',
                            }}>
                                <Button variant="contained" style={{
                                    width: '50%',
                                    backgroundColor: '#20C284'
                                }} onClick={addReply}>Submit</Button>
                            </Box>
                        </Grid>
                    </Grid>

                </Box>

                

                {/* load more */}
                <Box style={{ textAlign: 'center', marginTop: 15 }}>
                    <Typography style={{ color: '#22B77E', fontSize: 14, marginTop: 5 }}>
                        Load more comments ...
                    </Typography>
                </Box>
            </>) : (
                <div></div>
            )}
        </>
    )
}