'use client'
import { usePathname } from 'next/navigation';
import storiesData from '../../../../../../../public/story';
import { useState } from 'react';

const StoryPage = () => {
  // const [selectedStory, setSelectedStory] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const pathname = usePathname()
  const url=pathname.split('/')
  const title=url[3]


  const story = storiesData.find(story => story.title === title.replace(/-/g,' '));

  if (!story) {
    return <p>Story not found</p>;
  }

  const closeStory = () => {
    setSelectedStory(null);
};
const handlePageChange = (pageIndex) => {
  setCurrentPageIndex(pageIndex);
};

  return (
    <>
  
    <div className="amp-story-container ">
     
      <amp-story
        standalone
        title={story.title}
        publisher="The AMP Team"
        publisher-logo-src={story.publisherLogoSrc}
        poster-portrait-src={story.posterPortraitSrc}
        auto-advance-after="5s"
        on="end:storyAdvance"
      >
        {story.pages.map((page, index) => (
          <amp-story-page key={index} id={`page-${index + 1}`} className="flex justify-between " >
            <amp-story-grid-layer template="fill">
              <amp-img  amp-fx="fade-in" src={page.imgSrc} style={{width:"720px", height :"1280px"}}  layout="responsive" alt=""></amp-img>
            </amp-story-grid-layer>
            <amp-story-grid-layer template="vertical">
            <h1 className={`animate-text text-xl font-bold  absolute bottom-0 text-white mb-10 text-center `}>{page.heading}</h1>
            </amp-story-grid-layer>
          </amp-story-page>
        ))}
      </amp-story>
   
 
      {/* <button onClick={closeStory}>Close Story</button> */}
    </div>
      <style jsx>{`
        .amp-story-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
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
