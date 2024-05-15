import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderSuccessMassage() {
  return (
    <>
    {/* search result section */}
    <div className="container veiw-h">
        <div className="alert alert-success position-absolute top-50 start-50 translate-middle" role="alert">
            <h4 className="alert-heading">Well done!</h4>
            <p>Aww yeah, you successfully place your order.</p>
            <hr/>
            <div className="mb-0 d-grid gap-2 col-7 mx-auto">
                <Link className="btn btn-info" to="/">Continue Shopping <i className="fas fa-play"></i></Link>
            </div>
        </div>
    </div>
    </>
  )
}
