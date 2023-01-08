const ErrorMessage = function ({ message }) {
  return (
    <div className='px-8 py-6'>
      c'è stato un errore nel fetchare i contenuti:
      <br />
      {message.message}
    </div>
  );
};

export default ErrorMessage;
