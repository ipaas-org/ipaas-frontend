import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ApplicationModal = function ({ setShowModal }) {
  const [envVariablesLength, setEnvVariablesLength] = useState(0);
  const [envVariablesEl, setEnvVariablesEl] = useState(null);
  const [envVariables, setEnvVariables] = useState({});
  const avaibleLanguage = ['Nodejs', 'Java', 'Rust', 'Go'];

  const handleClose = function (e) {
    if (e.target.classList.contains('closer')) {
      setShowModal(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      repositoryLink: '',
      branch: '',
      language: '',
      port: 8080,
    },
    onSubmit(values) {
      alert('inviato: ' + values);
    },
    validationSchema: Yup.object({
      name: Yup.string('invalid name')
        .matches(
          /^[a-zA-Z][a-zA-Z0-9 _-]*$/,
          'name must not start with a number and must not have any special characters'
        )
        .required('name is required'),
      repositoryLink: Yup.string('invalid repository link')
        .matches('^(https://|http://|)(www.)?github.com/([A-Za-z0-9-/])*$', 'url must be a valid github link')
        .required('repository link is required'),
      branch: Yup.string('invalid branch')
        .oneOf(avaibleLanguage, 'branch must be available')
        .required('branch is required'),
      language: Yup.string('invalid language')
        .oneOf(avaibleLanguage, 'language must be available')
        .required('language is required'),
      port: Yup.number('invalid number')
        .integer('port must be an integer')
        .moreThan(1024, 'number must be grater than 1024')
        .lessThan(65000, 'number must be less than 65000')
        .required('port is required'),
    }),
  });

  useEffect(()=>{
    const current = new Array(envVariablesLength).fill(null).map((_, key) => (
      <EnviromentVariable key={key} envVariables={envVariables} setEnvVariables={setEnvVariables} />
    ))

  }, [envVariablesLength])

  return (
    <div
      onClick={handleClose}
      className='closer absolute inset-0 z-40 flex items-center justify-center bg-black bg-opacity-25'
    >
      <div className='custom-shadow max-h-[90%] w-[90%] overflow-y-scroll rounded-xl bg-white px-8 lg:w-1/3'>
        <div className='py-8 text-xl font-semibold'>new application</div>

        <div className='mb-5'>
          <div className='mb-2'>project name:</div>
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
        <div className='mb-5'>
          <div className='mb-1'>repository link:</div>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.repositoryLink}
            spellCheck='false'
            type='text'
            name='repositoryLink'
            className='w-full rounded border-[1.5px] border-light-gray'
          />
          <p className='text-sm font-medium text-red-500'>
            {formik.touched.repositoryLink && formik.errors.repositoryLink}
          </p>
        </div>
        <div className='mb-5'>
          <div className='mb-1'>select branch:</div>
          {/* {validator.isURL(repositoryLink) ? ( */}
          {false ? (
            <select
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.branch}
              name='branch'
              className='w-full rounded border-[1.5px] border-light-gray'
            >
              <option>master</option>
              <option>frontend</option>
              <option>backend</option>
            </select>
          ) : (
            <select name='branch' className='w-full rounded border-[1.5px] border-light-gray' disabled></select>
          )}
          <p className='text-sm font-medium text-red-500'>{formik.touched.branch && formik.errors.branch}</p>
        </div>
        <div className='mb-5'>
          <div className='mb-1'>programming language:</div>
          {avaibleLanguage.length > 0 ? (
            <select
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.language}
              name='language'
              className='w-full rounded border-[1.5px] border-light-gray'
            >
              {avaibleLanguage.map((language, key) => (
                <option key={key}>{language}</option>
              ))}
            </select>
          ) : (
            <select name='language' className='w-full rounded border-[1.5px] border-light-gray' disabled></select>
          )}
          <p className='text-sm font-medium text-red-500'>{formik.touched.language && formik.errors.language}</p>
        </div>
        <div className='mb-5'>
          <div className='mb-1'>port:</div>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.port}
            name='port'
            placeholder='8080'
            type='number'
            className='w-full rounded border-[1.5px] border-light-gray'
          />
          <p className='text-sm font-medium text-red-500'>{formik.touched.port && formik.errors.port}</p>
        </div>
        <div className='mb-4'>
          <div className='mb-1'>environment variables:</div>
          {}
          <button
            onClick={() => setEnvVariablesLength(prev => prev + 1)}
            className='w-full rounded border-[1.5px] border-light-gray py-2 transition-all hover:bg-light-gray'
          >
            new variable
          </button>
        </div>

        <div className='grid grid-cols-2 gap-2 py-6 text-lg font-semibold'>
          <button onClick={handleClose} className='closer w-full rounded py-2 transition-all hover:bg-light-gray'>
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

const EnviromentVariable = function ({ envVariables, setEnvVariables }) {
  return (
    <div className='mb-2 flex items-center gap-2'>
      <input
        placeholder='VARIABLE_NAME'
        type='text'
        spellCheck='false'
        className='w-full rounded border-[1.5px] border-light-gray'
      />
      <input
        placeholder='somevalue'
        type='text'
        spellCheck='false'
        className='w-full rounded border-[1.5px] border-light-gray'
      />
      <button type='button' className='rounded border-[1.5px] border-light-gray p-2 transition-all hover:bg-light-gray'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          className='h-6 w-6 fill-none stroke-gray'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
          />
        </svg>
      </button>
    </div>
  );
};

export default ApplicationModal;
