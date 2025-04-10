import { useState } from 'react';
import styles from './Controls.module.css';

export function Controls({onSend}) {

    const [content , setContent] = useState("");

    function handleContentChange(event) {
        setContent(event.target.value);
    }

    function handleContentSend() {
        if (content.length > 0  ){
            onSend(content);
            setContent("");
        }
    }

    function handleEnterPress (event) {
        if(event.key === 'Enter' && !event.shiftKey){
                event.preventDefault();
                handleContentSend();
        }
    }

    return (
        <>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=send"
            />
            <div className={styles.Controls}>
                <div className={styles.TextAreaContainer}>
                    <textarea
                        className={styles.TextArea}
                        name="messageInput"
                        id="messageInput"
                        placeholder="Message Ai"
                        onChange={handleContentChange}
                        onKeyDown={handleEnterPress}
                    ></textarea>
                </div>

                <button className={styles.Button} onClick={handleContentSend}>
                    <span className="material-symbols-outlined">send</span>
                </button>
            </div>
        </>
    );
}

function SendIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor" // Use currentColor to inherit fill
            width="24px"
            height="24px"
        >
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
    );
}