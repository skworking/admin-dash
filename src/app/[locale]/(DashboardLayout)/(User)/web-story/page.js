'use client'
import Link from "next/link";
import Breadcrumbs from "../../components/reuseable/bread";
import { usePathname, useRouter } from "next/navigation";
import AmpStoryOpener from "../../components/reuseable/webstory";
import storiesData from "../../../../../../public/story";
import { Grid } from "@mui/material";

export default function Home() {
  const pathname = usePathname()
  const router = useRouter();

  const handleImageClick = (id) => {
    router.push(`/web-story/${id.replace(/ /g, '-')}`);
  };

  return (
    <>
      <div className="relative">
        <Breadcrumbs currentLoc={pathname} />
        <div className="sm:flex  items-center  p-2">
          <Grid container spacing={2}>
            {storiesData.map((story) => (
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
            ))}
          </Grid>

        </div>
      </div>
    </>
  );
}
