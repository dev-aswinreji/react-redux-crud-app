import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchData } from "../utils/adminSlice"
import { Link, useNavigate } from "react-router-dom"






export default function AdminHome() {
    const accessToken = useSelector((store) => store.admin.token)
    const navigate = useNavigate()
    console.log(accessToken, 'accessToken is here');
    const dispatch = useDispatch()
    useEffect(() => {
        if (accessToken) {
            dispatch(fetchData({ accessToken, endpoint: '/home', method: 'GET' }))
        }
    }, [accessToken, dispatch])

    return (
        <>
            <h1>Welcome home</h1>
            <Link to={"/admin/userslist"} >UsersList</Link>
        </>
    )
}