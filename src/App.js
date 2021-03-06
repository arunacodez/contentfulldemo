import "./App.css";
import {useEffect,useState} from 'react';
import { client } from "./client";

function App() {

  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(false);


  useEffect(() => {
    setloading(true);
    client.getEntries({ content_type: "products" })
      .then((response) => {
        console.log(response.items);
        setproducts(response.items);
        setloading(false);
      })
      .catch(console.error,setloading(false));
  }, []);

  if(loading){
    return (
      <div>Loading</div>
    )
   
  }

  return (

    <div className="container">
      <h1>Products</h1>
      <div className="row">
        {products.length > 0 ? products.map(({fields:{description,image,name}})=>(
          <div className="items"> 
            <div className="box">
              <div className="imgsect">
                <img src={image.fields.file.url} />
              </div>
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
        </div>
        )): (
          <div>
            No products
          </div>

        )}
        
      </div>


    </div>

  )



}

export default App;
