import React from "react";

export default function Highlight(text: string, input: string) {
    if (input !== '') {
        const parts = text.split(new RegExp(`(${input})`, 'gi'));
        return (
            <>
                {parts.map((part, index) =>
                    part.toLowerCase() === input.toLowerCase() ? (
                        <span style={{ color: "red" }} key={index}>{part}</span>
                    ) : (
                        part
                    ),
                )}
            </>
        );
    }
    return text;
}