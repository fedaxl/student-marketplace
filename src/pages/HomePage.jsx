import React from 'react'
import { Link } from 'react-router-dom'
import Slider from '../components/Slider'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/saleCategoryImage.jpg'

function HomePage() {
  return (
    <div className='homepage'>
      <header>
        <p className='pageHeaderHP'>The Student Marketplace</p>
      </header>

      <main>
        <p className='homepageCategoryHeading'>  This is the first Marketplace for Students in Ireland, you can either Rent, Buy or Sell your items</p>
        <div className='homepageCategories'>
        <table className='tableHomepage'>
          <thead>
          <tr>
          <th>
          <Link to='/category/sale'>
            <img
              src={sellCategoryImage}
              alt='sell'
              className='homepageCategoryImg'
            />
            <p className='homepageCategoryName'>Items for sale</p>
          </Link>
          </th>
            <th>
          <Link to='/category/rent'>
            <img
              src={rentCategoryImage}
              alt='rent'
              className='homepageCategoryImg'
            />
            <p className='homepageCategoryName'>Items for rent</p>
          </Link> </th>
          </tr>
          </thead>
          </table>
          <Slider />
        </div>
      </main>
    </div>            
  )
}

export default HomePage