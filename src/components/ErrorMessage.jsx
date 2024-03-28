const ErrorMessage = function ({message}) {
  return (
    <div
      role="alert"
      className="relative flex w-full px-4 py-4 text-base bg-red-900/10 text-gray-900 border border-red-900 rounded-lg font-regular">
      <div className="mr-12 ">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;
