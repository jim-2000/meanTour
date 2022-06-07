import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export default function TourFooter() {
  return (
    <MDBFooter className='text-center text-white fixed-bottom mt-7' style={{ backgroundColor: '#21081a' }}>
    <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
      © 2020 Copyright:
      <a className='text-white' href='https://mdbootstrap.com/'>
        MDBootstrap.com
      </a>
    </div>
  </MDBFooter>
  );
}