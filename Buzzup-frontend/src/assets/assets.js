import sam from './profile_enrique.png'
import ram from './profile_marco.png'
import sonu from './profile_richard.png'
import martin from './profile_martin.png'
import avatar from './avatar_icon.png'
import arrow from './arrow_icon.png'
import help from './help_icon.png'
import logo from './buzzup.svg'
import img1 from './pic1.png'
import img2 from './pic2.png'
import img3 from './pic3.png'
import img4 from './pic4.png'
import gallery from './gallery_icon.svg'
import send from './send_button.svg'

const assets = {
    avatar,
    martin,
    arrow,
    help,
    logo,
    gallery,
    send
}
export default assets;

export const imagesDummyData = [img1, img2, img3, img4]

export const userDummyData = [
    {
            "_id": "3478gdftrfv5484bf4801",
            "email": "user1@gmail.com",
            "fullName": "Sam",
            "profilePic": sam,
            "bio": "Hello, I am available right now!"
    },
    {
            "_id": "3478gdftrfv5484bf4802",
            "email": "user2@gmail.com",
            "fullName": "Ram",
            "profilePic": ram,
            "bio": "Hello, I am available right now!"
    },
    {
            "_id": "3478gdftrfv5484bf4803",
            "email": "user3@gmail.com",
            "fullName": "Sonu",
            "profilePic": sonu,
            "bio": "Hello, I am available right now!"
    },
    {
            "_id": "3478gdftrfv5484bf4805",
            "email": "user5@gmail.com",
            "fullName": "Martin",
            "profilePic": martin,
            "bio": "Hello, I am available right now!"
    },
]

export const messageDummyData = [
        {
             "_id": "4648u3480hy39401",
             "senderId": "648u04ju93ur901",
             "receiverId": "74308409fjurf83901",
             "text": "Lets start our conversation with some tech talks",
             "seen": true,
             "createdAt": "2025-07-28T10:23:27.433Z"
        },
        {
             "_id": "4648u3480hy39402",
             "senderId": "648u04ju93ur902",
             "receiverId": "74308409fjurf83902",
             "text": "Lets start our conversation with some tech talks",
             "seen": true,
             "createdAt": "2025-07-28T03:45:34.783Z"
        },
        {
             "_id": "4648u3480hy39403",
             "senderId": "648u04ju93ur903",
             "receiverId": "74308409fjurf83903",
             "image": img2,
             "seen": true,
             "createdAt": "2025-07-28T10:35:26.893Z"
        },
        {
             "_id": "4648u3480hy39404",
             "senderId": "648u04ju93ur904",
             "receiverId": "74308409fjurf83904",
             "image": img1,
             "seen": true,
             "createdAt": "2025-07-28T11:24:27.476Z"
        },
        {
             "_id": "4648u3480hy39405",
             "senderId": "648u04ju93ur905",
             "receiverId": "74308409fjurf83905",
             "text": "Lets start our conversation with some tech talks",
             "seen": true,
             "createdAt": "2025-07-28T12:44:56.343Z"
        },
]

