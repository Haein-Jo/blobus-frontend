import { useNavigate } from "react-router";

const useMypageTag = () => {
  const navigate = useNavigate();

  const makeBtn = (name, onClick) => {
    return (
      <button
        className="bg-white w-24 py-[calc(0.5rem-2px)] border-2 border-gray-300 rounded text-base text-nowrap hover:bg-[#DDDDDD] transition duration-500"
        onClick={onClick}
      >
        {name}
      </button>
    );
  };

  const makeBtn2 = (name, onClick) => {
    return (
      <button
        className="bg-white w-24 py-2 border-2 border-gray-300 rounded text-base text-nowrap hover:border-yellow-500 transition duration-500"
        onClick={onClick}
      >
        {name}
      </button>
    );
  };

  const makeSelect = (name, open, setOpen, list, setList, moveToList) => {
    return (
      <div className="flex flex-col justify-center items-center relative">
        <div
          className={`w-20 p-2 border-2 border-gray-300 rounded cursor-pointer hover:text-black transition duration-500`}
          onClick={() => setOpen({ ...open, [name]: !open[name] })}
        >
          {name}
        </div>
        {open[name] && (
          <div className="bg-white w-full mt-[.1rem] border text-sm flex flex-col justify-center items-center absolute top-10 left-0 z-10">
            {/* {name === "키워드" && (
              <input
                className="w-full p-2 border border-gray-500 rounded text-center"
                type="text"
                placeholder="입력 후 엔터"
                onKeyUp={(e) => {
                  if (e.key === "Enter" && e.target.value.trim() !== "") {
                    setList({ ...list, [e.target.value.trim()]: true });
                    e.target.value = "";
                  }
                }}
              />
            )} */}
            {Object.keys(list).map((key) => (
              <div
                key={key}
                className="w-full border flex justify-center items-center"
              >
                <div
                  className={`w-full p-2 cursor-pointer transition duration-500 ${
                    list[key] ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => {
                    if (key === "전체") {
                      setList(
                        Object.fromEntries(
                          Object.keys(list).map((key) => [key, !list["전체"]])
                        )
                      );
                    } else {
                      const updatedList = { ...list, [key]: !list[key] };

                      if (name !== "키워드") {
                        updatedList["전체"] = Object.keys(updatedList)
                          .filter((key) => key !== "전체")
                          .every((key) => updatedList[key]);
                      }

                      setList(updatedList);
                    }
                    moveToList(1);
                  }}
                >
                  {key}
                </div>
                {/* {name === "키워드" && (
                  <div
                    className="w-4 ml-1 rounded-full text-base text-red-500 cursor-pointer"
                    onClick={() => {
                      const updatedList = { ...list };
                      delete updatedList[key];
                      setList(updatedList);
                    }}
                  >
                    x
                  </div>
                )} */}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const makeBookTab = (name, value, category, setCategory, moveToList) => {
    return (
      <div
        className={`w-20 p-2 border-2 rounded-full ${
          value === category
            ? "border-yellow-500"
            : "border-gray-300 cursor-pointer hover:border-yellow-500 transition duration-500"
        }`}
        onClick={() => {
          setCategory(value);
          moveToList(1);
        }}
      >
        {name}
      </div>
    );
  };

  const makeDocTab = (name, value, board, setBoard, isType, moveToList) => {
    return (
      <div
        className={`w-20 p-2 border-2 rounded-full ${
          (isType ? value === board.type : value === board.category)
            ? "border-yellow-500"
            : "border-gray-300 cursor-pointer hover:border-yellow-500 transition duration-500"
        }`}
        onClick={() => {
          isType
            ? setBoard({ ...board, type: value })
            : setBoard({ ...board, category: value });
          moveToList(1);
        }}
      >
        {name}
      </div>
    );
  };

  const makeList = (data) => {
    return (
      <>
        <div className="w-full text-base text-nowrap flex flex-wrap justify-start items-start">
          {data.dtoList.length === 0 ? (
            <div className="w-full py-20 text-2xl">
              해당하는 게시물이 없습니다.
            </div>
          ) : (
            data.dtoList.map((dto, index) => (
              <div
                key={index}
                className={`bg-white w-[calc(100%/4-0.75rem)] h-44 ${
                  index % 4 === 0
                    ? "mr-2 my-2"
                    : index % 4 === 3
                    ? "ml-2 my-2"
                    : "m-2"
                } px-3 pb-3 border border-gray-200 rounded-md text-xs flex flex-col justify-center items-center space-y-2 ${
                  dto.link &&
                  "cursor-pointer hover:shadow-md transition duration-500"
                }`}
                onClick={() =>
                  dto.mainCategory === "지역" && dto.link
                    ? window.open(dto.link)
                    : dto.link && navigate(dto.link)
                }
              >
                <div className="w-full text-sm flex justify-between items-center">
                  <div
                    className={`-mt-1 px-2 py-1 rounded-b-md text-white ${
                      new Date() - new Date(dto.endDate) > 0 &&
                      dto.startDate &&
                      dto.endDate
                        ? "bg-gray-500"
                        : dto.mainCategory === "청년"
                        ? "bg-blue-500"
                        : dto.mainCategory === "기업"
                        ? "bg-red-500"
                        : dto.mainCategory === "지역"
                        ? "bg-green-500"
                        : "bg-gray-200"
                    }`}
                  >
                    {new Date() - new Date(dto.endDate) < 0
                      ? "D" +
                        Math.round(
                          (new Date() - new Date(dto.endDate)) /
                            24 /
                            60 /
                            60 /
                            1000,
                          0
                        )
                      : !(dto.startDate && dto.endDate)
                      ? "상시"
                      : "마감"}
                  </div>

                  <div
                    className={`px-2 py-1 border-x-2 border-b-2 rounded-b-xl ${
                      dto.mainCategory === "청년"
                        ? "border-blue-500 text-blue-500"
                        : dto.mainCategory === "기업"
                        ? "border-red-500 text-red-500"
                        : dto.mainCategory === "지역"
                        ? "border-green-500 text-green-500"
                        : "border-gray-500 text-gray-500"
                    }`}
                  >
                    {dto.mainCategory} / {dto.subCategory}
                  </div>
                </div>

                <div className="w-full text-xl text-left  font-semibold truncate">
                  {dto.title}
                </div>
                <div className="w-full h-10 text-sm text-left text-gray-600 text-wrap text-ellipsis font-normal overflow-hidden ">
                  {dto.content || "　"}
                </div>

                <div className="w-full text-xs text-gray-500 font-light flex justify-start items-center space-x-1">
                  {!dto.startDate && !dto.endDate ? (
                    "상시"
                  ) : (
                    <>
                      <div>{dto.startDate}</div>
                      <div>~</div>
                      <div>{dto.endDate}</div>
                    </>
                  )}
                </div>
                <div className="w-full text-xs text-left text-gray-500 font-normal truncate">
                  {dto.place}
                </div>
              </div>
            ))
          )}
        </div>
      </>
    );
  };
  return { makeBtn, makeBtn2, makeSelect, makeBookTab, makeDocTab, makeList };
};

export default useMypageTag;
