import React from 'react'
import { FaBell } from 'react-icons/fa';
import { useSelector } from 'react-redux';
function BelldropDown() {
    const notif=useSelector((store)=>store.notification)
  return (
    <div>
        <details className="dropdown">
  <summary className="btn m-1"> 
<FaBell className='mr-2 text-2xl'/>
  
</summary>
  <ul className="menu  dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    {!notif.length &&  <li>No new Messages</li>}
   {notif.length && notif.map((n)=><li>{`New message from ${n?.sender?.name}`}</li>)}

  </ul>
</details>
    </div>
  )
}

export default BelldropDown


