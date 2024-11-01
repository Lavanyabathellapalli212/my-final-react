import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, removeItem } from './Store';

function Cart() {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const itemsList = cartItems.length > 0 ? (
        cartItems.map((item) => (
            <li key={item.name}>
                {item.name}, ${(item.price * item.quantity).toFixed(2)}, Quantity: {item.quantity}
                <button onClick={() => dispatch(increment({ name: item.name }))}>+1</button>
                <button onClick={() => dispatch(decrement({ name: item.name }))}>-1</button>
                <button onClick={() => dispatch(removeItem({ name: item.name }))}>Remove</button>
            </li>
        ))
    ) : (
        "Cart is empty"
    );

    // Discount
    const [disperce, setDisPerc] = useState(0);

    const handleDisPercentage = (dvalue) => {
        setDisPerc(dvalue / 100); // Store as a fraction for calculations
    };
    const [couponCode, setCouponCode] = useState('');
    const [couponDiscountPercentage, setCouponDiscountPercentage] = useState(0);
    const handleApplyCoupon = () => {
        switch (couponCode) {
            case 'LAVANYA10':
                setCouponDiscountPercentage(10);
                break;
            case 'LAVANYA20':
                setCouponDiscountPercentage(20);
                break;
            default:
                alert("Invalid coupon code");
                setCouponDiscountPercentage(0);
        }
    };

    const calculateTotal = () => {
        const total = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        const disAmount = total * disperce; // Discount amount
        const couponAmount = total * (couponDiscountPercentage / 100); // Coupon discount as percentage
        const netAmount = total - disAmount - couponAmount;

        return {
            total,
            disAmount,
            couponAmount,
            netAmount
        };
    };

    const { total, disAmount, couponAmount, netAmount } = calculateTotal();

    return (
        <>
            <h2>This is the cart page</h2>
            <ul>{itemsList}</ul>
            <h2>Total before discount: ${total.toFixed(2)}</h2>
            <button onClick={() => handleDisPercentage(10)}>Apply 10% Discount</button>
            <button onClick={() => handleDisPercentage(20)}>Apply 20% Discount</button>
            <button onClick={() => handleDisPercentage(30)}>Apply 30% Discount</button>
            <h2>Discount Percentage: {(disperce * 100).toFixed(0)}%</h2>
            <h2>Discount Amount: ${disAmount.toFixed(2)}</h2>
            <h2>Coupon Discount: ${couponAmount.toFixed(2)}</h2>
            <h2>Net Amount: ${netAmount.toFixed(2)}</h2>
            <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"/>
            
            <button onClick={handleApplyCoupon}>Apply Coupon</button>
            
        </>
    );
}

export default Cart;