import { useFormik } from 'formik';
import * as Yup from 'yup';

const DatabaseModal = function ({ setShowModal }) {
  const avaibleDBMS = ['PhpMyAdmin', 'MongoDB', 'SQL'];

  const handleClose = function (e) {
    if (e.target.classList.contains('absolute')) {
      setShowModal(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      dbms: avaibleDBMS[0],
    },
    onSubmit(values) {
      alert('inviato: ' + values);
    },
    validationSchema: Yup.object({
      name: Yup.string('deve essere una stringa')
        .matches(/^[a-zA-Z][a-zA-Z0-9 _-]*$/, 'Il nome può contenere solo lettere')
        .required('deve essere compilato'),
      dbms: Yup.string('deve essere una stringa')
        .oneOf(avaibleDBMS, 'La stringa deve essere una delle opzioni valide')
        .required('deve essere compilato'),
    }),
  });
  console.clear();

  return (
    <div
      onClick={handleClose}
      className='absolute inset-0 z-40 flex items-center justify-center bg-black bg-opacity-25'
    >
      <div className='custom-shadow w-4/5 rounded-xl bg-white px-2 md:px-8 lg:w-1/3'>
        <div className='py-8 text-xl font-semibold'>new database</div>
        <div className='mb-5'>
          <div className='mb-2'>name:</div>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            spellCheck='false'
            type='text'
            name='name'
            className='w-full rounded border-[1.5px] border-light-gray'
          />
          <p className='text-sm font-medium text-red-500'>{formik.touched.name && formik.errors.name}</p>
        </div>
        <div className='mb-4'>
          <div className='mb-2'>DBMS:</div>
          {avaibleDBMS.length > 0 ? (
            <select
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dbms}
              name='dbms'
              className='w-full rounded border-[1.5px] border-light-gray'
            >
              {avaibleDBMS.map(DBMS => (
                <option key={DBMS}>{DBMS}</option>
              ))}
            </select>
          ) : (
            <select name='dbms' className='w-full rounded border-[1.5px] border-light-gray' disabled></select>
          )}
          <p className='text-sm font-medium text-red-500'>{formik.touched.dbms && formik.errors.dbms}</p>
        </div>
        <div className='grid grid-cols-2 gap-2 py-6 text-lg font-semibold'>
          <button
            onClick={() => setShowModal(false)}
            className='w-full rounded py-2 transition-all hover:bg-light-gray'
          >
            cancel
          </button>
          <button onClick={formik.handleSubmit} className='w-full rounded bg-blue py-2 text-white'>
            create
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatabaseModal;
