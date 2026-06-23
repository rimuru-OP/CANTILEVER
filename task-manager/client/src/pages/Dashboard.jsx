import { useAuth } from "../hooks/useAuth";

export default function Dashboard(){
    const { user } = useAuth();
    console.log("user:", user);
    return(
        <>
            <h1>Dashboard</h1>
        </>
    )
}