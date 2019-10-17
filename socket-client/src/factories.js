const createMessage = ({message="" = { }}) => ({
    message,
    time:new Date(Date.now())
})

