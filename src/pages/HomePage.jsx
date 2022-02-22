import React from 'react'
import { Link } from 'react-router-dom'
import Slider from '../components/Slider'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/saleCategoryImage.jpg'

function HomePage() {
  return (
    <div className='homepage'>
      <header>
        <p className='pageHeader'>The Student Marketplace</p>
      </header>

      <main>
        <Slider />

        <p className='homepageCategoryHeading'>Categories</p>
        <div className='homepageCategories'>
          <Link to='/category/rent'>
            <img
              src={rentCategoryImage}
              alt='rent'
              className='homepageCategoryImg'
            />
            <p className='homepageCategoryName'>Items for rent</p>
          </Link>
          <Link to='/category/sale'>
            <img
              src={sellCategoryImage}
              alt='sell'
              className='homepageCategoryImg'
            />
            <p className='homepageCategoryName'>Items for sale</p>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default HomePage