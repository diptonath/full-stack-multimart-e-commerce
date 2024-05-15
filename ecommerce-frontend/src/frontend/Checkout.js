import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Checkout({cartItem}) {
    const [data, setData]=useState([]);
    const [address, setAddress]= useState('');
    const [payment, setPayment]= useState('');
    
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user-info'));
    const userId = user ? user.id : '';
    useEffect( async function getData(){
        if (!userId) {
            navigate('/login');
        }
        let result =await fetch('http://127.0.0.1:8000/api/checkout/'+userId);
            result= await result.json();
            setData(result);
    },[]);

    if (!data[0]) {
        navigate('/');
    }
    let total=0;
    data.map((item)=> total += parseFloat(item.price));
    let tax=total*15/100;

    function onChangeValue(e) {
        setPayment(e.target.value);
        console.log(e.target.value);
        }

    async function orderPlace(){
        const item = {userId,address,payment}
        let result =await fetch('http://127.0.0.1:8000/api/orderplace',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept-Type':'application/json',
            },
            body: JSON.stringify(item)
        });
            result= await result.json();
            if (result) {
                cartItem();
                navigate('/massage'); 
             }
        } 
  return (
    <>{console.log(total)}
        {/* search result section */}
        <div className="col-8 m-auto bg-white p-3 mt-3">
            <div className="row g-1 border-bottom">
                <h3 className="col-9">Shopping Cart</h3>
            </div>
            <div className="border-bottom">
            <table className="table table-striped table-hover">
                <tbody>
                    <tr>
                        <td>Price</td>
                        <td>৳ {total}</td>
                    </tr>
                    <tr>
                        <td>Tax (15%)</td>
                        <td>৳ {tax}</td>
                    </tr>
                    <tr>
                        <td>Delivary</td>
                        <td>৳ 100</td>
                    </tr>
                    <tr>
                        <td>Total Amount</td>
                        <td>৳ {total+tax+100}</td>
                    </tr>
                </tbody>
            </table>

            <form action="/orderplace">
                
                <div className="form-group">
                    <label for="address">Delivery Address:</label>
                    <textarea className="form-control" value={address} onChange={(e)=>setAddress(e.target.value)} id="address" cols="30" rows="2" required />
                </div>
                <div className="form-group">
                    <label for="payment">Payment Method</label>
                    <div onChange={onChangeValue}>
                        <p><input type="radio" value="cash" name="payment" /> Online Payment</p>
                        <p><input type="radio" value="cash" name="payment" /> EMI Payment</p>
                        <p><input type="radio" value="cash" name="payment" /> Cash on Delivery</p>
                    </div>
                </div>
                <button className="btn btn-info" type="button" onClick={orderPlace}>Order Now</button>
            </form>
            </div>
        </div>
    </>
  )
}
