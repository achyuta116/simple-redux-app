import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsers } from "./app/users";
import './Home.css'

const Home = () => {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [avatar, setAvatar] = useState('')

    const dispatch = useDispatch()
    const { users } = useSelector((state) => state.users)
    const handleClick = (index) => {
        console.log('clicked')
        fetch(`https://reqres.in/api/users/${index}`).then(res => {
            return res.json()
        })
            .then(({data}) => {
                setEmail(data.email)
                setFirstName(data.first_name)
                setLastName(data.last_name)
                setAvatar(data.avatar)
            }).catch(err => console.log(err))
    }

    useEffect(() => {
        fetch('https://reqres.in/api/users').then(res => {
            return res.json()
        }).then(data => {
            dispatch(updateUsers(data.data))
        })
    }, [dispatch])
    return ( 
        <div className="container">
            <div className="card">
                <div>
                    {!email && <h3>Select a button</h3>}
                    {firstName && <h3>{firstName}</h3>}
                    {lastName && <h4>{lastName}</h4>}
                    {email && <div>{email}</div>}
                </div>
                {avatar && <img src={avatar} alt="userAvatar"/>}
            </div>
            <div className="buttons">
                {users.map((user, index) => {
                    return (
                        <button key={user.id} onClick={() => handleClick(user.id)}>{ user.id }</button>
                    )
                })}
            </div>
        </div>
     );
}
 
export default Home;