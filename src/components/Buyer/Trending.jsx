import img from "../../assets/s1.jpg";

const Trending = () => {
  return (
    <>
      <div className="w-full h-fit bg-ink-50 flex items-center justify-center flex-col gap-3 md:gap-4 lg:gap-5">
        <h1 className="uppercase font-extrabold text-4xl md:text-6xl text-center pt-9">
          Trending
        </h1>
        <p className="w-[85%] md:w-[80%] md:text-[20px] lg:text-2xl lg:w-[68%] text-center text-[17px]">
          Classic silhouettes and cutting-edge innovation to build your game
          from the ground up.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 w-[80%] gap-4 h-fit place-items-center">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((ele, index) => {
            return (
              <div className="h-40 w-30 flex gap-2 justify-center items-center flex-col">
                <img src={img} alt="" className="w-full h-fit" />
                <h3>Air Jordan 1</h3>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Trending;
