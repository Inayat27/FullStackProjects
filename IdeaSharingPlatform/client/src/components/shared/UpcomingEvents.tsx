
const UpcomingEvents = () => {
  return (
    <section className="my-2 mx-1">
      <h4 className="pb-1 text-sm">Upcoming events</h4>
      <ul className="p-2">
        <li className="py-1">
          <div className="flex  gap-2 items-center">
            <h1 className="flex flex-col   leading-3 text-xs bg-gray-600 px-2 py-1 rounded">20 <span className="text-[7px]">Dec</span></h1>
            <div className="text-xs">
              <h6>title</h6>
              <h6 className="text-[10px]">77.6k interested - 7.7k going</h6>
            </div>
          </div>
        </li>
        <li className="py-1">
          <div className="flex  gap-2 items-center">
            <h1 className="flex flex-col   leading-3 text-xs bg-gray-600 px-2 py-1 rounded">20 <span className="text-[7px]">Dec</span></h1>
            <div className="text-xs">
              <h6>title</h6>
              <h6 className="text-[10px]">50k interested - 10k going</h6>
            </div>
          </div>
        </li>
        <li className="py-1">
          <div className="flex  gap-2 items-center">
            <h1 className="flex flex-col   leading-3 text-xs bg-gray-600 px-2 py-1 rounded">20 <span className="text-[7px]">Dec</span></h1>
            <div className="text-xs">
              <h6>title</h6>
              <h6 className="text-[10px]">7k interested - 1.7k going</h6>
            </div>
          </div>
        </li>
        
        
      </ul>
    </section>
  )
}

export default UpcomingEvents
