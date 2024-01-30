const Loading = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <h2 className="text-xl md:text-3xl font-bold ">
        <span className="bg-gray-800 text-white px-1 rounded-md shadow-lg mr-0.5" >Air</span>borne
      </h2>
      {/* <span className='loading loading-ring loading-lg' /> */}
      <div className="flex mt-1">
        <span className="loading loading-ball loading-lg"></span>
        <span className="loading loading-ball loading-lg"></span>
        <span className="loading loading-ball loading-lg"></span>
        <span className="loading loading-ball loading-lg"></span>
      </div>

    </div>
  );
};
export default Loading;
