import './App.css'
import Container from './components/container'


const Field = () => (
  <div className='flex gap-2 items-center' >
    {/* text */}
    <input type="search" id="default-search" className="block w-full p-2.5 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />

    {/* select */}
    <select id="fieldType" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option selected>Type</option>
      <option value="object">Object</option>
      <option value="boolean">Boolean</option>
      <option value="string">String</option>
      <option value="integer">Integer</option>
    </select>
    {/* radio */}
    <div className="flex items-center">
      <input id="default-checkbox" type="checkbox" value="" className="w-8 h-6 text-blue-600 bg-gray-50 border-gray-300 rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
      <label htmlFor="default-checkbox" className="ml-2 text-xs font-medium text-gray-900 dark:text-gray-300">
        Required
      </label>
    </div>
    {/* Add Button */}
    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs  text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      <svg aria-hidden="true" className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
    {/* Delete Button */}

  </div>
);


function App() {

  return (
    <Container >
      {/* Card */}
      <div className='shadow-lg px-8 py-5 flex flex-col items-start' >
        {/* Title */}
        <h5>Field Names and Types</h5>
        {/* Field Container */}
        <form className='flex flex-col gap-2 bg-slate-100 px-2 py-1 items-start' >
          {/* Field */}
          <Field />
          <Field />
          <button type="submit" className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
      </div>
    </Container>
  )
}

export default App
