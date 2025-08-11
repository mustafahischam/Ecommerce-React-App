import React from 'react'
import {  Button } from '@heroui/react'
import { CounterContext } from '../Context/CounterContext'
import { useContext } from 'react'


export default function FeedPage() {

let{counter, setCounter} = useContext(CounterContext);

  return <><h1 className='text-2xl font-bold'>Feed Page{counter}</h1> 
  <button onClick={() => setCounter(counter + 1)}>Click me</button>
  </>
  
 
  
}