import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Product({cartItem}) {
    const [data, setData]=useState([]);
    const [qty, setQty] = useState(1);

    const navigate = useNavigate();
    const { id } = useParams();

    const user = JSON.parse(localStorage.getItem('user-info'));
    const userId =  user ? user.id : '';

    useEffect( async ()=>{
        let result =await fetch('http://127.0.0.1:8000/api/detail/'+id);
        result= await result.json();
        setData(result);
    },[id])

    
    const productId = data.id;
    async function addToCart(){
        if (!userId) {
            navigate('/login');
        }
        let item ={userId, productId, qty};
        let result = await fetch("http://127.0.0.1:8000/api/add_to_cart",{
            method: 'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        cartItem();
        console.log(result);
      }

  return (
    <>
    {console.log(productId)}
        {/* Product-page */}
        <div className="row my-4 container bg-light m-auto">
            <div className="col-12 col-md-6">
                <img src={"http://127.0.0.1:8000/storage/gallery/"+data.gallery} alt="Product image" className="card-img" /> 
            </div>
            <div className="col-12 col-md-6 mt-5">
                <h4>{data.name}</h4> 
                <div className="ratings text-warning">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-half-alt"></i>
                    <i className="fa fa-star-o"></i>
                    (2)
                </div>
                <p><b>Brand: </b> Sony</p>
                <p><b>Category: </b> {data.category}</p>
                <p><b>Price: </b>৳ {data.price}</p>
                <p> 
                        
                        <label for="qu"><b>Quantity:</b> </label> 
                        <input className="form-control-sm text-center me-3" id="qty" type="number" value={qty} onChange={(e)=>setQty(e.target.value)} min="1" style={{maxWidth: '5rem'}} required />
                        <br/>
                        <button className="btn btn-outline-info mt-3" onClick={addToCart} type="button" id="button-addon1" >
                            <i className="fas fa-cart-plus px-2"></i> Add To Cart
                        </button>
                    
                    </p> 
            </div>
            <div className="col-12 bg-light mt-3 border-top">
                <div className="p-3 details-2 ">
                    <h4 className="fw-bold">Product Details</h4>
                    <p>{data.description}</p>
                </div>
            </div>
        </div>
    </>
  )
}
