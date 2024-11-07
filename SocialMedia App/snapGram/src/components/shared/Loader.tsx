import React from 'react'

import loader from '../../assets/icons/loader.svg'

const Loader = () => {
  return (
    <div className="flex-center w-full">
    <img
     src={loader}
      alt="j"
      width={24}
      height={24}
      className="animate-spin"
    />
  </div>
  )
}

export default Loader
