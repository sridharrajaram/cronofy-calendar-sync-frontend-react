import React from 'react'
import Topbar from '../components/Topbar'
import Bottombar from '../components/Bottombar';
import LandingPageContent from '../components/LandingPageContent';

function LandingPage() {
  return (
    <div>
        <Topbar/>
        <LandingPageContent/>
        <Bottombar/>
    </div>
  )
}

export default LandingPage;