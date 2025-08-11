import React, { useContext } from 'react'
import { CounterContext } from '../Context/CounterContext'

export default function ProfilePage() {
  const { counter, setCounter } = useContext(CounterContext)
  return (
    <>
      <h1 className="text-2xl font-bold">Profile Page {counter}</h1>
      <button onClick={() => setCounter(counter + 1)}>Click me</button>
    </>
  )
}