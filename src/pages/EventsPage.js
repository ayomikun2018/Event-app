import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json(
      { message: 'Could not fetch events.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  return defer({
    events: loadEvents(),
  });
}





//CoDE BEFORE FETCH AND SUSPENSE(THE LAST 3)
// import EventsList from '../components/EventsList';
// import {useLoaderData, json} from 'react-router-dom';

// function EventsPage() {
//     const data= useLoaderData()
//     const events= data.events
//   return (
//     <>{ <EventsList events={events} />}
//     </>
//   );
// }

// export default EventsPage;
// export async function loader(){
//     const response = await fetch('http://localhost:8080/events');

//         if (!response.ok) {
//             //throw new Response(JSON.stringify({message: 'Could not fetch events'}),{status: 500}) 
//             //OR
//             throw json(
//                 {message:'Could not fetch events' },
//                 {status: 500}
//             );
//             //once it sees the throw it'll automatically check for the errorElement defined in App.js
//         } else {
//         //   const resData = await response.json();
//         //   return resData.events;
//         //OR
//         return response;
//         }
// }