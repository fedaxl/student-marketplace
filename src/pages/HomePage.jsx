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
        <table>
          <tr>
            <th>
          <Link to='/category/rent'>
            <img
              src={rentCategoryImage}
              alt='rent'
              className='homepageCategoryImg'
            />
            <p className='homepageCategoryName'>Items for rent</p>
          </Link> </th>
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
          </tr>
          </table>
        </div>
      </main>
    </div>            
  )
}

export default HomePage