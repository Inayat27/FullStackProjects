import img from "../../assets/images/profile.png";
const Community = () => {
  return (
    <section className="my-2 mx-1">
      <h4 className="pb-1 text-sm">My Community</h4>
      <ul className="p-2">
        <li className="py-1">
          <div className="flex  gap-2 items-center">
            <img src={img} alt="img" className="rounded-full w-8 h-8" />
            <div className="text-xs">
              <h6>title</h6>
              <h6 className="text-[10px]">100K members</h6>
            </div>
          </div>
        </li>
        <li className="py-1">
          <div className="flex  gap-2 items-center">
            <img src={img} alt="img" className="rounded-full w-8 h-8" />
            <div className="text-xs">
              <h6>title</h6>
              <h6 className="text-[10px]">100K members</h6>
            </div>
          </div>
        </li>
        <li className="py-1">
          <div className="flex  gap-2 items-center">
            <img src={img} alt="img" className="rounded-full w-8 h-8" />
            <div className="text-xs">
              <h6>title</h6>
              <h6 className="text-[10px]">100K members</h6>
            </div>
          </div>
        </li>
        
      </ul>
    </section>
  );
};

export default Community;
