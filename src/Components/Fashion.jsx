import React from 'react'

import WomensPage from './Womens'
import ProductList from './ProductList'
import FeedbackComponent from './Feedback'
export default function Fashion() {
  return (
    <div>
        <img src="images/wal2.png" alt="Saving" className="w-full h-auto mb-8" />
        <ProductList/>
      <WomensPage/>
      {/* <FeedbackComponent/> */}
    </div>
  )
}
