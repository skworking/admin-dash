'use client'
import { TextField } from "@mui/material";
import { Button, ColorPicker, Space } from "antd";
import { ChromePicker } from 'react-color';
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
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [colorPickerIndex, setColorPickerIndex] = useState(null);
    const [story, setStory] = useState({
        name: '',
        slug: '',
        meta: '',
        lineItems: [
            { imgSrc: '', topHeading: '', bottomHeading: '', bgColor: '', short: '', active: '', navUrl: '' },
        ]
    })
    console.log(isAuth);
    const handleChange = (e, index, field) => {
        let value = e.target.value;
        if (field === 'active') {
            value = value === 'true'; // Convert to boolean
        } else if (field === 'inactive') {
            value = value === 'true';
        }
        const updatedLineItems = [...story.lineItems];
        updatedLineItems[index][field] = value;
        setStory({ ...story, lineItems: updatedLineItems })

    };

    const handleStoryChange = (e) => {
        const { name, value } = e.target;
        setStory({ ...story, [name]: value });
    };

    const handleFileChange = async (e, index, field) => {
        const file = e.target.files[0];
        try {
            const base64Image = await convertToBase64(file);
            const updatedLineItems = [...story.lineItems];
            updatedLineItems[index][field] = base64Image;
            setStory({ ...story, lineItems: updatedLineItems });
        } catch (error) {
            console.error('Error converting image to base64:', error);
        }
        // const updatedLineItems = [...story.lineItems];
        // updatedLineItems[index][field] = URL.createObjectURL(e.target.files[0]);
        // setStory({ ...story, lineItems: updatedLineItems });
    };

    const handleAddPage = () => {
        const newPage = { imgSrc: '', topHeading: '', bottomHeading: '', bgColor: '', short: '', active: '', navUrl: '' };
        setStory(prevStory => ({
            ...prevStory,
            lineItems: [...prevStory.lineItems, newPage]
        }));
    };

    const handleRemoveLineItem = (index) => {
        const updatedLineItems = story.lineItems.filter((_, i) => i !== index);
        setStory({ ...story, lineItems: updatedLineItems });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/webstory', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${isAuth}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(story)
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                // Handle successful response
            } else {
                console.error('Failed to submit story');
                // Handle error response
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleChangeColor = (newColor, index, field) => {

        const updatedLineItems = [...story.lineItems];
        updatedLineItems[index][field] = newColor; // Get the hexadecimal color value
        setStory({ ...story, lineItems: updatedLineItems });
    }
    // const handleColorChange=(newColor,index, field)=>{
    //     const updatedLineItems = [...story.lineItems];
    //     updatedLineItems[index][field] = color.hex; // Get the hexadecimal color value
    //     setStory({ ...story, lineItems: updatedLineItems });
    // }
    console.log(story);
    const handleToggleColorPicker = (index) => {
        setShowColorPicker(!showColorPicker);
        setColorPickerIndex(index);
    };
    return (
        <>
            <div className="bg-white sm:w-2/3  p-1 flex flex-col justify-center  m-auto">
                <h2 className='text-lg font-semibold p-2 text-center'>Create Web-Story</h2>
                <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
                    <div className="sm:p-5 flex flex-col gap-2">

                        <TextField
                            id="outlined-name"
                            label="Enter webstory Name"
                            name={'name'}
                            value={story.name}
                            className='w-full '
                            onChange={handleStoryChange}
                            InputLabelProps={{
                                // shrink: true,
                            }}
                        />
                        <TextField
                            id="outlined-name"
                            label="Enter Slug Name"
                            name="slug"
                            value={story.slug}
                            className='w-full '
                            onChange={handleStoryChange}
                            InputLabelProps={{
                                // shrink: true,
                            }}
                        />
                        <TextField
                            id="outlined-name"
                            label="Enter Meta Name"
                            name={'meta'}
                            className='w-full '
                            value={story.meta}
                            onChange={handleStoryChange}
                            InputLabelProps={{
                                // shrink: true,
                            }}
                        />
                        {/* <input
                            className="w-full p-2 border-2 "
                            type="date"
                            placeholder="Date"
                            value={story.date}
                            onChange={(e) => handleChange(e, undefined, 'date')}
                        /> */}
                        {/* <div className="flex">
                            <input accept="image/*" name={story?.thumbnail}  type="file" onChange={(e) => handleFileChange(e, undefined, 'thumbnail')} />
                            {story?.thumbnail ?
                            <Image src={story.thumbnail} width={35} height={50} alt='logo' />
                            :
                            <label> Thumbnail Logo Add</label>
                            }
                        </div> */}


                        {story.lineItems.map((item, index) => (
                            <div key={index} className="flex flex-col gap-2">
                                <h2>Web-story Attributes {index + 1}</h2>
                                <div className=" flex">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, index, 'imgSrc')}
                                    />
                                    {item?.imgSrc ?
                                        <Image src={item.imgSrc} width={135} height={50} alt='logo' />
                                        :
                                        <label className="text-xl font-medium">Web-Story Image Add</label>
                                    }
                                </div>
                                <TextField
                                    id={`outlined-topHeading-${index}`}
                                    label="Enter webStory topHeading"
                                    name={item.topHeading}
                                    className='w-full '
                                    onChange={(e) => handleChange(e, index, 'topHeading')}
                                    InputLabelProps={{
                                        // shrink: true,
                                    }}
                                />
                                <TextField
                                    id={`outlined-bottomHeading-${index}`}
                                    label="Enter webStory bottomHeading"
                                    name={item.bottomHeading}
                                    className='w-full '
                                    onChange={(e) => handleChange(e, index, 'bottomHeading')}
                                    InputLabelProps={{
                                        // shrink: true,
                                    }}
                                />
                              
                                {item.bgColor ? (
                                    <Button onClick={() => handleToggleColorPicker(index)}>Change Color</Button>
                                ) : (
                                    <Button onClick={() => handleToggleColorPicker(index)}>Select Color</Button>
                                )}
                                {showColorPicker && colorPickerIndex === index && (
                                    <ChromePicker
                                        color={item?.bgColor} // Set the current color from state
                                        onChange={(newColor) => handleChangeColor(newColor.hex, index, 'bgColor')} // Handle color change
                                        className="w-full"
                                    />
                                )}
                               

                                <TextField
                                    id={`outlined-short-${index}`}
                                    label="Enter Short Description"
                                    value={item.short}
                                    className="w-full"
                                    onChange={(e) => handleChange(e, index, 'short')}
                                />
                                <select
                                    className="w-full p-2 border-2 "
                                    value={item.active ? 'true' : 'false'}
                                    onChange={(e) => handleChange(e, index, 'active')}
                                >
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                                <TextField
                                    id={`outlined-navUrl-${index}`}
                                    label="Enter Navigation URL"
                                    value={item.navUrl}
                                    className="w-full"
                                    onChange={(e) => handleChange(e, index, 'navUrl')}
                                />
                                {story.lineItems.length > 1 && (
                                    <button type="button" onClick={() => handleRemoveLineItem(index)}>Remove Page</button>
                                )}
                            </div>
                        ))}
                        <Button type="primary" className="w-1/3 " onClick={handleAddPage}>Add Page</Button>
                    </div>
                    <button type="submit" className="w-1/2 bg-blue-300  items-center m-auto">Submit</button>
                </form>
            </div>
        </>
    )
}
export default WebStory;