import { useState, useEffect } from 'react'
import './App.css'
import { Route, Link, Routes, useNavigate } from 'react-router-dom';

function NewParty({ name, size, contact, onNameChange, onSizeChange, onContactChange, onSubmit }) {
  useEffect(() => {
    document.title = 'Waitlist Demo';
  }, []);
  return (
    <div className="w-full max-w-md space-y-8 mb-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">New party</h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Enter your name, party size, and contact information
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}>
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="name" className="sr-only">Name</label>
            <input autoCapitalize="words" defaultValue={name} onChange={e => onNameChange(e.target.value.trim())} id="name" name="name" autoComplete="off" className="relative block w-full rounded-t-md border-0 py-1.5 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" placeholder="Name"/>
          </div>
          <div>
            <label htmlFor="size" className="sr-only">Party size</label>
            <input defaultValue={size} onChange={e => onSizeChange(e.target.value.trim())} id="size" name="size" type='number' autoComplete="off" className="relative block w-full border-0 py-1.5 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" placeholder="Party size"/>
          </div>
          <div>
            <label htmlFor="contact" className="sr-only">Phone/email</label>
            <input defaultValue={contact} onChange={e => onContactChange(e.target.value.trim())} id="contact" name="contact" autoComplete="off" className="relative block w-full rounded-b-md border-0 py-1.5 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" placeholder="Phone/email"/>
          </div>
        </div>
        <div>
          <button className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

function PartyWaiting({ name, size, contact, timestamp }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    document.title = 'Waitlist Demo - Waiting';
    console.log(timestamp);
    const interval = setInterval(async () => {
      let url = `https://kamiak-io.fly.dev/waitlist/is_ready?timestamp=${timestamp}`;
      let resp = await fetch(url, {method: 'GET'})
      setReady(await resp.text() == 'true');
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full max-w-md space-y-8 mb-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
          {ready ? "Table's ready" : 'Request sent'}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          {ready ? 'Please come to your table' : 'You will be notified when your table is ready'}
        </p>
      </div>
      <form className="mt-8 space-y-6">
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="name" className="sr-only">Name</label>
            <input value={name} id="name" name="name" autoComplete="off" className="relative block w-full rounded-t-md border-0 py-1.5 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" placeholder="Name" disabled/>
          </div>
          <div>
            <label htmlFor="size" className="sr-only">Party size</label>
            <input value={size} id="size" name="size" type='number' autoComplete="off" className="relative block w-full border-0 py-1.5 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" placeholder="Party size" disabled/>
          </div>
          <div>
            <label htmlFor="contact" className="sr-only">Phone/email</label>
            <input value={contact} id="contact" name="contact" autoComplete="off" className="relative block w-full rounded-b-md border-0 py-1.5 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" placeholder="Phone/email" disabled/>
          </div>
        </div>
        <div>
          <Link to='/'>
            <button type="button" className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={async () => {
                let url = `https://kamiak-io.fly.dev/waitlist/cancel?timestamp=${encodeURIComponent(timestamp)}`;
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
}

function SignInPage({ onPasswordChange, onSubmit }) {
  return (
    <div className="w-full max-w-md space-y-8 mb-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">Hold up!</h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Verify your identity to continue
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}>
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="password" className="sr-only">Admin password</label>
            <input onChange={e => onPasswordChange(e.target.value)} id="password" name="password" type="password" autoComplete="off" className="relative block w-full rounded-md border-0 py-1.5 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" placeholder="Admin password (hint: happy day)"/>
          </div>
        </div>
        <div>
          <button className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Authenticate
          </button>
        </div>
      </form>
    </div>
  )
}

function WaitlistPage({ initialWaitlist, password }) {
  const [waitlist, setWaitlist] = useState(initialWaitlist);
  useEffect(() => {
    const interval = setInterval(refreshWaitlist, 1000);
    return () => clearInterval(interval);
  }, [])
  async function refreshWaitlist() {
    let url = `https://kamiak-io.fly.dev/waitlist/waiting?password=${encodeURIComponent(password)}`;
    let resp = await fetch(url, {method: 'GET'})
    setWaitlist(await resp.json());
  }
  return (
    <div className="w-full max-w-3xl space-y-8 mb-8 flex-1">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">Waitlist</h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Customer waiting list
        </p>
        <div className="border border-slate-300 rounded-lg overflow-hidden shadow-sm mt-6">
          <table className="table-fixed bg-white text-sm w-full">
            <thead>
              <tr className="border-b border-slate-300 bg-slate-50 rounded-tl-lg">
                <th className="text-left py-4 px-6 w-4/12">Name</th>
                <th className="text-left py-4 pr-6 w-5/12">Phone/email</th>
                <th className="text-left py-4 pr-6 w-1/12">Size</th>
                <th className="text-left py-4 pr-6 w-1/12">Ready</th>
                <th className="text-left py-4 pr-6 w-2/12"></th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(waitlist).map(function(timestamp, index) {
                  let data = waitlist[timestamp];
                  return (
                    <tr className="border-b border-slate-200 last:border-b-0" key={index}>
                      <td className="py-4 px-6 font-semibold truncate">{data.name}</td>
                      <td className="py-4 pr-6 text-slate-600 truncate">{data.contact}</td>
                      <td className="py-4 pr-6 text-slate-600">{data.size}</td>
                      <td className="py-4 pr-6 text-slate-600">{data.ready ? "Yes" : "No"}</td>
                      <td className="py-4 pr-6 text-slate-600 text-right">
                        <span
                          className="font-semibold text-indigo-600 hover:text-indigo-800 active:text-indigo-800 cursor-pointer select-none"
                          onClick={async () => {
                            let action = data.ready ? 'remove' : 'ready';
                            let url = `https://kamiak-io.fly.dev/waitlist/${action}?timestamp=${timestamp}&password=${encodeURIComponent(password)}`;
                            let resp = await fetch(url, {method: 'POST'})
                            await refreshWaitlist();
                          }}
                        >
                          {data.ready ? "Remove" : "Notify"}
                        </span>
                      </td>
                    </tr>
                  )
                })
              }
              {Object.keys(waitlist).length == 0 && (
                <tr className="border-b border-slate-200 last:border-b-0">
                  <td></td>
                  <td className="py-4 text-slate-600 text-center">No one is waiting right now...</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
      </div>
    </div>
  )
}

function Waitlist() {
  const [password, setPassword] = useState();
  const [correctPassword, setCorrectPassword] = useState(false);
  const [waitlist, setWaitlist] = useState();
  useEffect(() => {
    document.title = 'Waitlist Demo - Waitlist';
  }, []);
  return (
    !correctPassword
    ? <SignInPage
        onPasswordChange={setPassword}
        onSubmit={async () => {
          let url = `https://kamiak-io.fly.dev/waitlist/waiting?password=${encodeURIComponent(password)}`;
          fetch(url, {method: 'GET'}).then(async (resp) => {
            setWaitlist(await resp.json());
            setCorrectPassword(true);
          }).catch((e) => {
            setCorrectPassword(false);
          })
        }}
      />
    : <WaitlistPage
      initialWaitlist={waitlist}
      password={password}
    />
  )
}

function QRCodePage() {
  return (
    <div className="w-full max-w-md space-y-8 mb-8 flex flex-col items-center">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">Waitlist</h2>
        <p className="mt-2 text-center text-sm text-slate-600">Scan the QR code below to join the waiting list</p>
      </div>
      <div className='bg-white rounded-lg p-6'>
        <img src='/qrcode.png' style={{imageRendering:'pixelated'}} className='w-48 h-48'/>
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
      let resp = await fetch('https://kamiak-io.fly.dev/waitlist/num_waiting');
      let text = await resp.text();
      setCount(+text);
    }, 1000);
    return () => clearInterval(interval);
  }, [])

  return (
    <div className="flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-100">
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
          <Route path='/waiting' element={<PartyWaiting name={name} size={size} contact={contact} timestamp={timestamp}/>}></Route>
          <Route path='/waitlist' element={<Waitlist/>}></Route>
          <Route path='/qrcode' element={<QRCodePage/>}></Route>
      </Routes>
      <footer className='fixed bottom-2 p-4 text-sm text-slate-800 bg-slate-100/80 rounded-lg backdrop-blur-md'>
        <div className='flex'>
          <div className='pr-3 border-r border-slate-300'>
            {count} waiting
          </div>
          <a href="https://github.com/jwseph/waitlist" target='_blank' className='font-semibold ml-3'>Github</a>
        </div>
      </footer>
    </div>
  )
}

export default App
