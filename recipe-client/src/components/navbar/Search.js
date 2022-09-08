import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai'
import { BsFillMicFill } from 'react-icons/bs'
import SpeechRecognition, {
    useSpeechRecognition } from "react-speech-recognition"

function Search() {
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();
    const handleOnChange = (event) => {
        setSearchInput(event.target.value)
    }

    const handleOnSubmit = () => {
        navigate(`/search/${searchInput}`);
    }

    const commands = [
        {
          command: ["Search *", "Search for *"],
            callback: (searchKeyword) => {
                setSearchInput(searchKeyword)
                navigate(`/search/${searchInput}`);
            }
        }
    ];

    // const startListening = () => SpeechRecognition.startListening({ continuous: true });
    useSpeechRecognition({ commands });

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null;
    }

    return (
        <>
            <form onSubmit={handleOnSubmit} className="d-flex flex-row align-items-center">
                <AiOutlineSearch size={30} />
                <input type="text" onChange={handleOnChange} placeholder="Search recipe" className="form-control me-2 ms-2"></input>
                <input type="submit" value="Search" className="btn btn-outline-success" />
            </form>
            {/* <button
            onTouchStart={startListening}
            onMouseDown={startListening}
            onTouchEnd={SpeechRecognition.stopListening}
            onMouseUp={SpeechRecognition.stopListening}
            className="btn"    
            ><BsFillMicFill /></button> */}
             <button onClick={SpeechRecognition.startListening} className="btn ms-2"><BsFillMicFill /></button>
        </>

    )
}

export default Search