'use client'
import axios from 'axios';
import { useParams, redirect  } from 'next/navigation';
import {Button, message} from 'antd'
import { useEffect } from 'react';

const EditStory=()=>{
    const params=useParams();
    
  const [story, setStory] = useState(null);
  useEffect(() => {
    // Fetch product data based on the ID
    // Replace this with your actual fetch logic
    const fetchProduct = async (id) => {
      try {
        const response = await fetch(`/api/webstorylist/search?_id=${id}`); // Assuming your API endpoint
        const data = await response.json();
      
        setStory(data.record);
        if (data.record) {
        
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
 
    if (!!params.id) {
      console.log("call",params.id);
      fetchProduct(params.id);
    }
  }, [params.id]);
  return(
    <>
    </>
  )
}
export default EditStory;