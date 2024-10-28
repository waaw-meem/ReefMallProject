import Amenities from '@/app/component/Homepage/Amenities'
import Brands from '@/app/component/Homepage/Brands'
import HomeBanner from '@/app/component/Homepage/HomeBanner'
import LatestOffers from '@/app/component/Homepage/LatestOffers'
import Services from '@/app/component/Homepage/Services'
import React from 'react'

const HomeContainer = () => {
    return (
        <>
            <HomeBanner />
            <Brands />
            <LatestOffers />
            <Services />
            <Amenities />
        </>
    )
}

export default HomeContainer