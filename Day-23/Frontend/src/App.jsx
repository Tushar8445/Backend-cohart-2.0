import React from 'react'

const App =  () => {

const data = [
  {
    id:1,
    product:"Shoe",
    company:"nike",
    quote:"this is very nice shoe and you should buy this.",
    price:12999
  },
  {
    id:2,
    product:"Shoe",
    company:"campus",
    quote:"A woman with good shoes is never ugly",
    price:9000
  },
  {
    id:2,
    product:"Shoe",
    company:"adidas",
    price:14999,
    quote:"I like Cinderella, I really do. She has a good work ethic. And she likes shoes. The Fairy Tale is all about the shoe at the end.” Amy Adams"
  },
]
  

  return (
    <main className='h-screen w-full bg-gray-900 p-4 flex flex-wrap gap-3'>
      {data.map(function(elem){
        return <div className="card h-85 w-72 bg-amber-900 rounded-md p-2 flex flex-col justify-between">
        <div className="image-container h-39 w-full bg-red-950 relative rounded-md ">
         <img src="./nike.webp" alt="shoe image" className='h-full w-full rounded-md
         object-cover object-top fit'/>
        </div>
        <div className="desc w-full bg-red-900 p-2 flex flex-col gap-2">
          <h2 className='text-md font-semibold'>{elem.name}</h2>
          <p className='font-semibold text-sm opacity-90'>{elem.company}</p>
          <h3 className='text-sm font-semibold opacity-80 italic leading-4'>{elem.quote}</h3>
        </div>
        <div className="buy-section flex m-2 justify-between">
          <p className='font-semibold  bg-emerald-800 px-2 py-1 rounded cursor-pointer'>₹ {elem.price}</p>
          <button className='bg-emerald-800 px-2 py-1 rounded font-semibold cursor-pointer'>Buy Now</button>
        </div>
      </div>
      })}
      
    </main>

  
  )
}

export default App
