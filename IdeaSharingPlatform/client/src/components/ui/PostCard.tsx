
import img from '../../assets/react.svg'

const PostCard = ({ title, content }: { title: string; content: string }) => {
  return (
    // <div className="h-12">

    <div
      className="flex flex-col  justify-center items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 my-2 w-full "
    >
      {/* <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src="/docs/images/blog/image-4.jpg"
        alt=""
      /> */}
      <div className="flex flex-col justify-center items-center  p-4 leading-normal">
      <img
        className="object-cover w-full rounded-t-lg h-full md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src={img}
        alt="jk"
      />
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {content}
        </p>
      </div>
    </div>

    // </div>
  );
};

export default PostCard;
