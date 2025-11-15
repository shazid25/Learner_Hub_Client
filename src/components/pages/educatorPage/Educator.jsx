import React from 'react'
import { Outlet } from 'react-router-dom';

const Educator = () => {
  return (
    <div>
      <h2>Educator pAGE</h2>

      <div>

        {<Outlet />}

      </div>

    </div>
  )
}

export default Educator;
