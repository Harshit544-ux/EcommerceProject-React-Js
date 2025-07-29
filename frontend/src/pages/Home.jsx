import React from 'react'
import Hero from '../component/Hero'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'
import OurPolicy from '../component/OurPolicy'


function Home() {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
    </div>
  )
}

export default Home