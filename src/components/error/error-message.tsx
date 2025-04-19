import { FC } from "react";

type RequestFailProps = {
  error: Error;
  retryRequest: () => void;
};

export const RequestFail: FC<RequestFailProps> = ({ retryRequest, error }) => {
  console.error(error)

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold text-red-600">Request Failed</h1>
      <p className="mt-2 text-gray-600">
        {error.message}
      </p>
      <button
        onClick={retryRequest}
        className="px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600"
      >
        Retry
      </button>
    </div>
  );
};
