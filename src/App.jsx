import { useState, useEffect } from 'react'
import './App.css'
import { Route, Link, Routes, useNavigate } from 'react-router-dom';

const NewParty = ({ name, size, contact, onNameChange, onSizeChange, onContactChange, onSubmit }) => (
  <div className="w-full max-w-md space-y-8 mb-8">
    <div>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">New party</h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Enter your name, party size, and contact information
      </p>
    </div>
    <form className="mt-8 space-y-6">
      <input type="hidden" name="remember" value="true"/>
      <div className="-space-y-px rounded-md shadow-sm">
        <div>
          <label htmlFor="name" className="sr-only">Name</label>
          <input defaultValue={name} onChange={e => onNameChange(e.target.value.trim())} id="name" name="name" type="name" autoComplete="off" className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" placeholder="Name"/>
        </div>
        <div>
          <label htmlFor="size" className="sr-only">Party size</label>
          <input defaultValue={size} onChange={e => onSizeChange(e.target.value.trim())} id="size" name="size" type="size" autoComplete="off" className="relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" placeholder="Party size"/>
        </div>
        <div>
          <label htmlFor="contact" className="sr-only">Phone/email</label>
          <input defaultValue={contact} onChange={e => onContactChange(e.target.value.trim())} id="contact" name="contact" type="contact" autoComplete="off" className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" placeholder="Phone/email"/>
        </div>
      </div>
      <div>
        <button type='button' onClick={onSubmit} className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Submit
        </button>
      </div>
    </form>
  </div>
)

const Partywaiting = ({ name, size, contact, timestamp }) => (
  <div className="w-full max-w-md space-y-8 mb-8">
    <div>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Request sent</h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        You will be notified when your table is ready
      </p>
    </div>
    <form className="mt-8 space-y-6">
      <input type="hidden" name="remember" value="true"/>
      <div className="-space-y-px rounded-md shadow-sm">
        <div>
          <label htmlFor="name" className="sr-only">Name</label>
          <input value={name} id="name" name="name" type="name" autoComplete="off" className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" placeholder="Name" disabled/>
        </div>
        <div>
          <label htmlFor="size" className="sr-only">Party size</label>
          <input value={size} id="size" name="size" type="size" autoComplete="off" className="relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" placeholder="Party size" disabled/>
        </div>
        <div>
          <label htmlFor="contact" className="sr-only">Phone/email</label>
          <input value={contact} id="contact" name="contact" type="contact" autoComplete="off" className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" placeholder="Phone/email" disabled/>
        </div>
      </div>
      <div>
        <Link to='/'>
          <button type="button" className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={async () => {
              let url = `https://kamiak-io.fly.dev/waitlist/remove?timestamp=${encodeURIComponent(timestamp)}`;
              await fetch(url, {method: 'POST'});
            }}
          >
            Cancel
          </button>
        </Link>
      </div>
    </form>
  </div>
)

function Waitlist() {
  return (
    <div className="w-full max-w-md space-y-8 mb-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Waitlist</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Undergoing construction!
        </p>
      </div>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [size, setSize] = useState('')
  const [contact, setContact] = useState('')
  const [timestamp, setTimestamp] = useState()

  const navigate = useNavigate();
  
  useEffect(() => {
    const interval = setInterval(async () => {
      console.log('Refreshing count');
      let resp = await fetch('https://kamiak-io.fly.dev/waitlist/num_waiting');
      let text = await resp.text();
      setCount(+text);
    }, 1000);
    return () => clearInterval(interval);
  }, [])

  return (
    <div className="flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <Routes>
        <Route path='/' element={
          <NewParty
            name={name} size={size} contact={contact}
            onNameChange={(name) => setName(name)}
            onSizeChange={(size) => setSize(size)}
            onContactChange={(contact) => setContact(contact)}
            onSubmit={async () => {
              if (!name || !size || !contact) return;
              console.log('submit');
              let url = `https://kamiak-io.fly.dev/waitlist/create?name=${encodeURIComponent(name)}&size=${encodeURIComponent(size)}&contact=${encodeURIComponent(contact)}`;
              let resp = await fetch(url, {method: 'POST'});
              if (!resp.ok) return;
              setTimestamp(await resp.text());
              navigate('/waiting');
            }}
          />
        }></Route>
          <Route path='/waiting' element={<Partywaiting name={name} size={size} contact={contact} timestamp={timestamp}/>}></Route>
          <Route path='/waitlist' element={<Waitlist/>}></Route>
      </Routes>
      <footer className='fixed bottom-2 p-4 text-sm text-gray-800'>
        {count} waiting | <a href="https://github.com/jwseph/waitlist" target='_blank' className='font-semibold'>Github</a>
      </footer>
    </div>
  )
}

export default App
