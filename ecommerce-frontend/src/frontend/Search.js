import React from 'react';
import { Link } from 'react-router-dom';

export default function Search({searchData}) {
  return (
    <>{console.log(searchData)}
        {/* search result section */}
        <div className="col-8 m-auto veiw-h">
            <h3 className="mt-3 text-center">Item Found Aganist Your Search</h3>
            {searchData.map((item)=>
            <div className="card my-3  m-auto" style={{maxWidth: '540px'}}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={"http://127.0.0.1:8000/storage/gallery/"+item.gallery} className="img-fluid rounded-start" alt="product pic" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <Link to={"/product/"+item.id} className="text-decoration-none underline">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.description.slice(0, 75)}...</p>
                            </Link>
                            <p className="card-text"><small className="text-danger">৳ {item.price}</small></p>
                        </div>
                    </div>
                </div>
            </div>
            )}
            {!searchData[0] && <div className="text-danger fs-4 text-center">Soory, No result found!!</div>}
            
        </div>
    </>
  )
}
