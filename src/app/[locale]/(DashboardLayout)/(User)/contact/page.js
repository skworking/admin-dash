'use client'
import { useState } from "react";
import { addPost } from "@/app/lib/action";
const Contact = () => {
    const [isAuth, setIsAuth] = useState(typeof window !== 'undefined' && sessionStorage.getItem('jwt'));
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    return (
        <>
            <form action={addPost}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <label htmlFor="content">Content:</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}
export default Contact;