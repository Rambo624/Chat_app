import React from 'react'
import { useSelector } from 'react-redux'
function ProfileModel() {
    const user=useSelector((store)=>store.user)
  return (
    <div className='p-0 hover:bg-transparent'>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="" onClick={()=>document.getElementById('my_modal_1').showModal()}>Profile</button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
   {user &&  <h3 className="font-bold text-lg">Hello {`${user.name}`}</h3>}
    <figure>
        {user && <img src={user.photo} alt="" />}
    </figure>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    </div>
  )
}

export default ProfileModel