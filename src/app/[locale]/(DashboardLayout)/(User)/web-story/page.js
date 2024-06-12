'use client'
import Link from "next/link";
import Breadcrumbs from "../../components/reuseable/bread";
import { usePathname, useRouter } from "next/navigation";
import AmpStoryOpener from "../../components/reuseable/webstory";
import storiesData from "../../../../../../public/story";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import useProductStore from "@/store/productStrore";

export default function Home() {
  const setStory=useProductStore((state)=>state.setStory)
  const pathname = usePathname()
  const router = useRouter();
  const [webstory,setWebStory]=useState([])
  const [isAuth, setIsAuth] = useState(typeof window !== 'undefined' && sessionStorage.getItem('jwt'));

  const fetchStory = async () => {
    const result = await fetch(`/api/webstory`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${isAuth}`,
        "Content-Type": "application/json"
      }
    });
    const response = await result.json();
    if(response.success){
      setWebStory(response.result)
      
    }else{
      console.log("err");
    }
  }
  useEffect(() => {
    fetchStory()
  }, [])

  const handleImageClick = (id) => {
    router.push(`/web-story/${id.replace(/ /g, '-')}`);
  };
  const handledata=(list)=>{
    console.log("call");
    setStory(list)
    router.push(`/web-story/${list.slug}`)
  }
  console.log(webstory);
  return (
    <>
      <div className="relative">
        <Breadcrumbs currentLoc={pathname} />
        <div className="sm:flex  items-center  p-2">
          <Grid container spacing={2}>
            {/* {storiesData.map((story) => (
              <Grid item xs={6} sm={2} key={story.title}>
                <div className="h-full border-2 text-start cursor-pointer">
                  <img
                    src={story.thumbnail}
                    alt={story.title}
                    onClick={() => handleImageClick(story.title)}
                    className="w-full h-96 object-fill"
                  />
                  <p className="text-xl font-semibold hover:text-blue-500">{story.title.replace(/ /g, ' ')}</p>
                  {story.date}
                </div>
              </Grid>
            ))} */}
            {webstory?.filter((story)=>story.lineItems.some(item=> item.active)).map((list)=>{
              return(
                <Grid item xs={6} sm={2} md={3} key={list._id} onClick={()=>handledata(list)}>
                  <div className="h-full border-2 text-start cursor-pointer">
                    {/* {list?.lineItems?.map((item)=>{
                      console.log(item);
                      return(
                        <div key={item._id}>
                          <Image src={item.imgSrc} alt="logo" width={100} height={96} className="w-full h-96 object-fill" />
                        </div>
                      )
                    })} */}
                  <Image src={list?.lineItems?.[0].imgSrc} alt="logo" width={100} height={96} className="w-full h-96 object-fill" />
                        
                   <p className="p-2">{list.name}</p> 
                  </div>
                </Grid>
              )
            })}
          </Grid>

        </div>
      </div>
    </>
  );
}
