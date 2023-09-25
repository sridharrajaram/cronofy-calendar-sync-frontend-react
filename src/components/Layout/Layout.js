import React from 'react'
import Topbar from '../LoginPageTopBar/Topbar'
import Bottombar from '../Bottombar/Bottombar'

function Layout({children}) {
  return (
    <div>
        <Topbar/>
        {children}
        <Bottombar/>
    </div>
  )
}

export default Layout