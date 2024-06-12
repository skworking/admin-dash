// 'use client'
// import useProductStore from "@/store/productStrore";
// import Link from "next/link";
// import { usePathname } from 'next/navigation';
// import { useEffect, useState } from 'react';

// import storiesData from '../../../../../../../public/story';



// const StoryPage = () => {
//    const { webStory } = useProductStore();
//   const [story, setStory] = useState(null);
//   const pathname = usePathname()
//   const url = pathname.split('/')
//   const slug = url[3]
//   console.log(slug);
//   useEffect(() => {
//     if (webStory?.slug === slug) {
//       setStory(webStory);
//     }
//   }, [webStory, slug]);

//   if (!story) {
//     return <p>Loading...</p>;
//   }
//   // const story = storiesData.find(story => story.title === title.replace(/-/g,' '));
//   // if (!story) {
//   //   return <p>Story not found</p>;
//   // }

//   console.log(story);


//   return (
//     <>
//       <div className="amp-story-container" >
      
//         {/* <amp-story
//         standalone
//         title={story?.name}
//         publisher="The AMP Team"
//         publisher-logo-src={story?.publisherLogoSrc}
//         poster-portrait-src={story?.posterPortraitSrc}
//       >

        
//         {story?.lineItems?.map((page, index) => (
//           <amp-story-page auto-advance-after="15s" key={index} >
//             <amp-story-grid-layer template="fill">
//               <amp-img  amp-fx="fade-in" src={page.imgSrc} style={{width:"720px", height :"1280px"}}  layout="responsive" alt=""></amp-img>
//             </amp-story-grid-layer>
//             <amp-story-grid-layer template="vertical">
//             <h1 className={`animate-text text-xl font-bold  absolute bottom-0 text-white mb-10 text-center `}>{page.heading}</h1>
//             </amp-story-grid-layer>
//           </amp-story-page>
//         ))}
//       </amp-story> */}

//         {/* 
//         {webStory?.lineItems?.map((page, index) => {
//             console.log(page);
//             return (
//                 <div key={page._id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
//                     <p><strong>Short:</strong> {page.short}</p>
//                     <p><strong>Top Heading:</strong> {page.topHeading || "Default top Heading"}</p>
//                     <p><strong>Bottom Heading:</strong> {page.bottomHeading}</p>
//                     <p><strong>Image Source:</strong> {page.imgSrc}</p>
//                     <p><strong>Navigation URL:</strong> <a href={page.navUrl}>{page.navUrl}</a></p>
//                 </div>
//             );
//         })} */}
//         <amp-story
//           standalone
//           title={story.name}
//           publisher="The AMP Team"
//           publisher-logo-src={story?.publisherLogoSrc}
//           poster-portrait-src={story?.posterPortraitSrc}
//         >

//           {story.lineItems.map((page, index) =>  ( 
//               <amp-story-page auto-advance-after="15s" key={index} >
//                 <amp-story-grid-layer template="fill">
//                   <amp-img  amp-fx="fade-in" src={page.imgSrc} style={{width:"720px", height :"1280px"}}  layout="responsive" alt="ds"></amp-img>
//                 </amp-story-grid-layer>
//                 <amp-story-grid-layer template="vertical">
//                 <h1 className={`animate-text text-xl z-20  font-bold absolute top-14  transition-opacity opacity-50 bg-black text-white text-center `}>{page.topHeading}</h1>
//                 </amp-story-grid-layer>
//                 <amp-story-grid-layer template="vertical">
//                 <h1 className={`animate-text text-xl font-bold  absolute bottom-10 text-white mb-10 text-center `}>{page.bottomHeading}</h1>
//                 </amp-story-grid-layer>
//                 <amp-story-page-outlink layout="nodisplay">
//                 <Link href={page?.navUrl}>Discover More</Link>
//               </amp-story-page-outlink> 
//               </amp-story-page>
//             )
//           )}
//         </amp-story>


//       </div>
//       <style jsx>{`
//         .amp-story-container {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           z-index: 18;
//           background: rgba(0, 0, 0, 0.8);
//         }
//       @keyframes slideIn {
//           0% {
//             opacity: 0;
//             transform: translateX(-100%);
//           }
//           100% {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         .animate-text {
//           animation: slideIn 1s forwards;
//         }
       
        
//       `}</style>

//     </>
//   );
// };

// export default StoryPage;


'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useProductStore from "@/store/productStrore";
import Link from "next/link";

const StoryPage = () => {
  const { webStory } = useProductStore();
  const [story, setStory] = useState(null);
  const pathname = usePathname();
  const url = pathname.split('/');
  const slug = url[3];

  useEffect(() => {
    if (webStory?.slug === slug) {
      setStory(webStory);
    }
  }, [webStory, slug]);

  if (!story) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="amp-story-container">
        <amp-story
          standalone
          title={story.name}
          publisher="The AMP Team"
          // publisher-logo-src={story.publisherLogoSrc}
          // poster-portrait-src={story.posterPortraitSrc}
        >
          {story.lineItems.map((page, index) => (
            <amp-story-page auto-advance-after="15s" key={index}>
              <amp-story-grid-layer template="fill">
                <amp-img
                  amp-fx="fade-in"
                  src={page.imgSrc}
                  width="720"
                  height="1280"
                  layout="responsive"
                  alt="ds"
                ></amp-img>
              </amp-story-grid-layer>
              <amp-story-grid-layer template="vertical">
                <h1 className="animate-text text-xl z-20 font-bold absolute top-14 transition-opacity opacity-50 bg-black text-white text-center">
                  {page.topHeading}
                </h1>
              </amp-story-grid-layer>
              <amp-story-grid-layer template="vertical">
                <h1 className="animate-text text-xl font-bold absolute bottom-10 text-white mb-10 text-center">
                  {page.bottomHeading}
                </h1>
              </amp-story-grid-layer>
              {page.navUrl && (
                <amp-story-page-outlink layout="nodisplay">
                  <Link href={page.navUrl}>Discover More</Link>
                </amp-story-page-outlink>
              )}
            </amp-story-page>
          ))}
        </amp-story>
      </div>
      <style jsx>{`
        .amp-story-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 18;
          background: rgba(0, 0, 0, 0.8);
        }
        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateX(-100%);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-text {
          animation: slideIn 1s forwards;
        }
      `}</style>
    </>
  );
};

export default StoryPage;
