import CardInAdminPanel from "./CardInAdminPanel";

export default function AdminPanel(){
    return(
        <>
            <div className="sticky top-0 w-full flex justify-center">
                <input type="text" placeholder="Find people" className="h-10 rounded-b-2xl p-4 shadow-md"/>
            </div>
            <div className="UserList flex flex-col p-2 gap-2 ">
                <CardInAdminPanel/>
                <CardInAdminPanel/>
                <CardInAdminPanel/>
                <CardInAdminPanel/>
                <CardInAdminPanel/>
                <CardInAdminPanel/>

            </div>
        </>
    )
}