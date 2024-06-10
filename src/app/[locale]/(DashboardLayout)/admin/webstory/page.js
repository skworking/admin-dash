'use client'
import { TextField } from "@mui/material";
import { Button } from "antd";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};
const WebStory = () => {
    const [isAuth, setIsAuth] = useState(typeof window !== 'undefined' && sessionStorage.getItem('jwt'));
    const [story, setStory] = useState({
        title: '',
        date: '',
        thumbnail: '',
        publisherLogoSrc: '',
        pages: [
            { imgSrc: '', heading: '' },
            { imgSrc: '', heading: '' }
        ]
    })

    const handleChange = (e, index, field) => {
        const value = e.target.value;
        if (index !== undefined) {
            const pages = [...story.pages];
            pages[index][field] = value;
            setStory({ ...story, pages });
        } else {
            setStory({ ...story, [field]: value });
        }
    };

    const handleFileChange = async (e, index, field) => {
        const file = e.target.files[0];
        if (file) {
            const base64 = await convertToBase64(file);
            if (index !== undefined) {
                const pages = [...story.pages];
                pages[index][field] = base64;
                setStory({ ...story, pages });
            } else {
                setStory({ ...story, [field]: base64 });
            }
        }
    };

    const handleAddPage = () => {
        const newPage = { imgSrc: '', heading: '' };
        setStory(prevStory => ({
            ...prevStory,
            pages: [...prevStory.pages, newPage]
        }));
    };

    const handleRemovePage = (index) => {
        setStory(prevStory => ({
            ...prevStory,
            pages: prevStory.pages.filter((_, i) => i !== index)
        }));
    };
    const handleSubmit =async (e) => {
        e.preventDefault();
        await axios.post('/api/webstory',story,{
            headers:{
                  'Authorization': `Bearer ${isAuth}`,
                  'Content-Type': 'multipart/form-data'
            }
        })
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })

        // You can send the data to the backend here if needed
    };
    return (
        <>
            <div className="bg-white sm:w-2/3  p-1 flex flex-col justify-center  m-auto">
                <h2 className='text-lg font-semibold p-2 text-center'>Create Web-Story</h2>
                <form className="flex flex-col gap-2 p-2">
                    <div className="sm:p-5 flex flex-col gap-2">

                        <TextField
                            id="outlined-Title"
                            label="Enter Title Name"
                            name={story.title}
                            className='w-full '
                            onChange={(e) => handleChange(e, undefined, 'title')}
                            InputLabelProps={{
                                // shrink: true,
                            }}
                        />
                        <input
                            className="w-full p-2 border-2 "
                            type="date"
                            placeholder="Date"
                            value={story.date}
                            onChange={(e) => handleChange(e, undefined, 'date')}
                        />
                        <div className="flex">
                            <input accept="image/*" name={story?.thumbnail}  type="file" onChange={(e) => handleFileChange(e, undefined, 'thumbnail')} />
                            {story?.thumbnail ?
                            <Image src={story.thumbnail} width={35} height={50} alt='logo' />
                            :
                            <label> Thumbnail Logo Add</label>
                            }
                        </div>

                        <div className=" flex">
                            <input accept="image/*" name={story?.publisherLogoSrc} type="file" onChange={(e) => handleFileChange(e, undefined, 'publisherLogoSrc')} />
                            {story?.publisherLogoSrc?
                            <Image src={story.publisherLogoSrc} width={35} height={50} alt='logo' />
                            :
                            <label>publisherLogoSrc Image</label>
                            }
                        </div>

                        {story.pages.map((page, index) => (
                            <div key={index} className="flex flex-col gap-2">
                                <h2>Web-story {index + 1}</h2>
                                <div className=" flex">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, index, 'imgSrc')}
                                    />
                                    {page?.imgSrc ?
                                    <Image src={page.imgSrc} width={35} height={50} alt='logo' />
                                    :
                                    <label>web-story Image Add</label>
                                    }
                                </div>
                                <TextField
                                    id="outlined-heading"
                                    label="Enter webStory Heading"
                                    name={page.heading}
                                    className='w-full '
                                    onChange={(e) => handleChange(e, index, 'heading')}
                                    InputLabelProps={{
                                        // shrink: true,
                                    }}
                                />
                                {story.pages.length > 1 && (
                                    <button type="button" onClick={() => handleRemovePage(index)}>Remove Page</button>
                                )}
                            </div>
                        ))}
                        <Button type="primary" className="w-1/3 "  onClick={handleAddPage}>Add Page</Button>
                    </div>
                    <Button type="primary" onClick={handleSubmit} className="w-1/2  items-center m-auto">Submit</Button>
                </form>
            </div>
        </>
    )
}
export default WebStory;