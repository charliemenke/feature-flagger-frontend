import React, { useState, useEffect } from "react";
import axios from "axios";
import { Switch, FormControlLabel, FormGroup, Snackbar, Alert, Stack, IconButton, Paper, InputBase }  from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
 
const Features = () => {
    const [features, setFeatures] = useState({})
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("")
    const [newFeature, setNewFeature] = useState("")

    useEffect(() => {
        console.log("useEffect")
        getFeatures()
    }, [])
    async function getFeatures() {
        console.log("getFeatures")
        let obj = {}
        const resp = await axios.get(process.env.REACT_APP_BACKEND+"/api/features")
        for(let i = 0; i < resp.data.length; i++) {
            obj[resp.data[i].name] = resp.data[i].enabled
        }
        setFeatures(obj)
    }
    const handleChange = (name) => async (event) => {
        console.log("handleChange")
        let body = { enabled: event.target.checked }
        try {
            const resp = await axios.put(process.env.REACT_APP_BACKEND+"/api/features/"+name, { enabled: event.target.checked })
            if (resp.status === 200) {
                let obj = features
                obj[name] = body.enabled
                setFeatures({...obj})
            } else {
                setOpen(true)
                setMessage(resp.body)
            }
        } catch(error) {
            setOpen(true)
            setMessage(error.response.data)
        }
        
    }
    const handleDelete = (name) => async (event) => {
        console.log("handleDelete");
        try {
            const resp = await axios.delete(process.env.REACT_APP_BACKEND+"/api/features/"+name)
            if (resp.status === 200) {
                let obj = features
                delete obj[name]
                setFeatures({...obj})
            } else {
                setMessage(resp.body)
                setOpen(true)
            }
        } catch (error) {
            setOpen(true)
            setMessage(error.response.data)
        }
    }
    const handleNewFeatureName = (event) => {
        setNewFeature(event.target.value)
    }
    const handleCreateFeature = async (event) => {
        if (newFeature === "") {
            setMessage("Please give the feature a name before creating it.")
            setOpen(true)
        } else {
            try {
                const resp = await axios.post(process.env.REACT_APP_BACKEND+"/api/features", { name: newFeature, enabled: false })
                if (resp.status === 200) {
                    window.location.reload(false);
                } else {
                    setMessage(resp.body)
                    setOpen(true)
                }
            } catch (error) {
                setOpen(true)
                setMessage(error.response.data)
            }
        }

    }

    const handleClose = (event, reason) => {
        console.log("handleClose")
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    }
  
    return (
        <div>
            <h2>Feature Flags</h2>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Add New Feature Here"
                    inputProps={{ 'aria-label': 'Add New Feature Here' }}
                    onChange={handleNewFeatureName}
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={handleCreateFeature}>
                    <AddIcon />
                </IconButton>
            </Paper>
            <Stack
                spacing={4}
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <FormGroup>
                {Object.keys(features).map((featureName, i) => {
                    return<Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={2}
                        key={i}
                    >
                        <FormControlLabel
                            key={i}
                            control={<Switch checked={features[featureName]} onChange={handleChange(featureName)} inputProps={{ 'aria-label': 'controlled' }} />}
                            label={featureName}
                            labelPlacement="start"
                        />
                        <IconButton aria-label="delete" size="small" onClick={handleDelete(featureName)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                })}
                </FormGroup>
            </Stack>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {message}
                </Alert>
            </Snackbar>
        </div>
    )
  }
 
export default Features;