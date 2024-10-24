import React from 'react'
import { useSelector } from 'react-redux'

function NavBar() {
    const user=useSelector((store)=>store.user)
  return (
    <div>
        <div className="navbar bg-base-100 flex justify-between">
<h1   className="btn btn-ghost text-xl">WHATSAPP</h1>
{user && <h1>{user.name}</h1>}

</div>
    </div>
  )
}

export default NavBar