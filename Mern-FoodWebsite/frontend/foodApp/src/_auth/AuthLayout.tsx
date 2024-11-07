import React from 'react'
import { Outlet } from 'react-router-dom'


const AuthLayout = () => {
  return (
    <>
      <section className="flex flex-col lg:flex-row w-full">
  <div className="lg:w-1/2">
    <Outlet/>
  </div>
  <div className="lg:w-1/2">
    <img
      className="w-full h-auto object-cover lg:h-full lg:w-full"
      src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
      alt=""
    />
  </div>
</section>
    </>
  )
}

export default AuthLayout
