'use client'
import { useState } from 'react';

const AmpStoryOpener = ({ stories }) => {
    const [selectedStory, setSelectedStory] = useState(null);

    const handleImageClick = (story) => {
        setSelectedStory(story);
    };

    const closeStory = () => {
        setSelectedStory(null);
    };

    return (
        <div className='flex gap-2 w-full'>
            {stories.map((story, index) => (
                <div className='text-center bg-cover'>
                    <img
                        key={index}
                        src={story.thumbnail}
                        alt={story.title}
                        onClick={() => handleImageClick(story)}
                        style={{ cursor: 'pointer', margin: '10px' }}
                    />
                    <p>{story.title}</p>
                </div>
            ))}
            {selectedStory && (
                <div className="amp-story-container">
                    <amp-story
                        standalone
                        title={selectedStory.title}
                        publisher="The AMP Team"
                        publisher-logo-src={selectedStory.publisherLogoSrc}
                        poster-portrait-src={selectedStory.posterPortraitSrc}
                    >
                        {selectedStory.pages.map((page, index) => (
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
                    <button onClick={closeStory}>Close Story</button>
                </div>
            )}
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
        button {
          position: absolute;
          top: 20px;
          right: 20px;
          background: white;
          border: none;
          padding: 10px;
          cursor: pointer;
        }
      `}</style>
        </div>
    );
};

export default AmpStoryOpener;
