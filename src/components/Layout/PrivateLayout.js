import React from 'react'
import PrivateTopbar from '../PrivatePageTopBar/PrivateTopbar'
import Bottombar from '../Bottombar/Bottombar'

function PrivateLayout({children}) {
  return (
    <div>
        <PrivateTopbar/>
        {children}
        <Bottombar/>
    </div>
  )
}

export default PrivateLayout