import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";


export const ChatContext = createContext()

export const ChatProvider = ({ children }) => {

    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [unseenMessages, setUnseenMessages] = useState({})

    const {socket, axios, authUser} = useContext(AuthContext)

    // Function to get all users for sidebar

    const getUsers = async () => {
       try {
         const { data } = await axios.get('/api/message/users');
            if(data.success){
                setUsers(data.users)
                setUnseenMessages(data.unseenMessages)
            }
       } catch (error) {
        toast.error(error.message)
       }
    }

    // Function to get messages for selected user

    const getMessages = async (userId) => {
        try {

            // For Ai User
            if(selectedUser?.email === "ai@buzzup.com"){
                // initial no message history for aiUser
                setMessages([])
                return;
            }

            const { data } = await axios.get(`/api/message/${userId}`);
            if(data.success){
                setMessages(data.messages)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to send messages

    const sendMessage = async (messageData) => {
        try {
            // ai - user message
            if(selectedUser?.email === "ai@buzzup.com"){
                
                // user message
                const userMessage = {
                    senderId: authUser._id,
                    text: messageData.text,
                    createdAt: new Date().toISOString(),
                }
                setMessages((prev) => [...prev, userMessage])

                const { data } = await axios.post('/api/ai/chat', { text: messageData.text});


                // Ai reply
                if(data.success){
                    const aiReply = {
                        senderId: "ai",
                        text: data.reply,
                        createdAt: new Date().toISOString(),
                    }

                    setMessages((prev) => [...prev, aiReply])
                }else{
                    toast.error(data.message || "Ai Error")
                }

                return
            }

        // user to user message
        const { data } = await axios.post(`/api/message/send/${selectedUser._id}`, messageData)
        if(data.success){
            setMessages((prevMessage) => [...prevMessage, data.newMessage])
        }else{
            toast.error(data.message)
        }
        } catch (error) {
            toast.error(error.message)

        }
    }


    // function to subscribe to messages for selected user

    const subcribeMessages = async () => {
        if(!socket) return;

        socket.on("newMessage", (newMessage) => {
            if(selectedUser && newMessage.senderId === selectedUser._id){
                newMessage.seen = true;
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                axios.put(`/api/message/mark/${newMessage._id}`);
            }else{
                setUnseenMessages((prevUnseenMessages) => ({
                    ...prevUnseenMessages, [newMessage.senderId] :
                    prevUnseenMessages[newMessage.senderId]? prevUnseenMessages[newMessage.senderId] + 1: 1
                }))
            }
        })
    }


    // function to unsubscribe from messages

    const unsubscribeFromMessages = () => {
        if(socket) socket.off("newMessage")
    }

    useEffect(() => {
        subcribeMessages()
        return () => unsubscribeFromMessages()
    }, [socket, selectedUser])

    const value = {
        messages,
        users,
        selectedUser,
        getUsers,
        setMessages,
        getMessages,
        setSelectedUser,
        unseenMessages,
        setUnseenMessages,
        sendMessage,
        subcribeMessages,
        unsubscribeFromMessages

    }

    return(
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}