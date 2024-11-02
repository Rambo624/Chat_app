import React from 'react'

function UserListItem({id,name,photo,email,handlefunction}) {
  return (
    <div onClick={handlefunction}>
          <div  className='w-full mt-5'>
       <div className='flex w-full '>
        <figure className='  w-3/12 '>
          <img className=' rounded-full  ' src={photo} alt="" />
        </figure>
<div className=' w-10/12  flex flex-col items-start ml-10'>
  <h1 className='font-semibold'>{name}</h1>
  <h1>{email}</h1>
</div>
       </div>
    
      </div>
    </div>
  )
}

export default UserListItem