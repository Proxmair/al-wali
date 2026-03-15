'use client';

import { useDispatch, useSelector } from 'react-redux';

import { decrement, increment } from '@/store/slices/counterSlice';
import { RootState } from '@/store';

export default function Counter() {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
        </div>
    );
}