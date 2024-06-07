'use client'
import { usePathname } from 'next/navigation';
import storiesData from '../../../../../../../public/story';
import { useState } from 'react';

const StoryPage = () => {
  // const [selectedStory, setSelectedStory] = useState(null);
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

  return (
    <>
  
    <div className="amp-story-container">
      <amp-story
        standalone
        title={story.title}
        publisher="The AMP Team"
        publisher-logo-src={story.publisherLogoSrc}
        poster-portrait-src={story.posterPortraitSrc}
      >
        {story.pages.map((page, index) => (
          <amp-story-page key={index} id={page.id}>
            <amp-story-grid-layer template="fill">
              <amp-img src={page.imgSrc} width="900" height="1600" alt=""></amp-img>
            </amp-story-grid-layer>
            <amp-story-grid-layer template="vertical">
              <h1>{page.heading}</h1>
            </amp-story-grid-layer>
          </amp-story-page>
        ))}
      </amp-story>
      {/* <button onClick={closeStory}>Close Story</button> */}
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
       
      `}</style>
    </div>

    </>
  );
};

export default StoryPage;
