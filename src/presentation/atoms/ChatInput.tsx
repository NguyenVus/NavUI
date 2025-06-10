import React, { useState, useRef, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";

export const ChatInput = ({ onSendMessage }: { onSendMessage: (msg: string) => void }) => {
    const [message, setMessage] = useState("");
    const [isComposing, setIsComposing] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const maxHeight = 150;

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            const newHeight = Math.min(textareaRef.current.scrollHeight, maxHeight);
            textareaRef.current.style.height = `${newHeight}px`;
            textareaRef.current.style.overflowY =
                textareaRef.current.scrollHeight > maxHeight ? "auto" : "hidden";
        }
    }, [message]);

    const handleSend = () => {
        if (!message.trim() || isComposing) return;

        console.log("Sending:", message);
        onSendMessage(message);
        setMessage("");
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.overflowY = "hidden";
        }
    };

    const handleAddFile = () => {
        console.log("Thêm file");
    };

    return (
        <div className="w-full max-w-3xl bg-white dark:bg-gray-900 shadow-sm rounded-4xl border px-4 py-3">
      <textarea
          ref={textareaRef}
          id="textarea"
          placeholder="Nhập tin nhắn..."
          className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 dark:bg-gray-900 rounded-lg resize-none focus:outline-none focus:ring-0 focus:border-none appearance-none transition"
          value={message}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={(e) => {
              setIsComposing(false);
              setMessage(e.currentTarget.value);
          }}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
              }
          }}
          rows={1}
          style={{ maxHeight }}
      />

            <div className="flex justify-between items-center mt-2">
                <div className=" flex items-center gap-4">
                <button
                    onClick={handleAddFile}
                    type="button"
                    className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-gray-500 transition font-semibold"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.414a4 4 0 00-5.656-5.656l-6.414 6.414a6 6 0 008.486 8.486L21 13.828"
                        />
                    </svg>

                </button>

                <button
                    onClick={() => console.log("Tools clicked")}
                    className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-gray-500 transition font-semibold"
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Tools</span>
                </button>
                </div>

                <button
                    onClick={handleSend}
                    type="button"
                    disabled={!message.trim()}
                    className="flex items-center justify-center bg-gray-900 text-white w-9 h-9 rounded-full shadow-md hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 rotate-270"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 19l7-7-7-7M5 12h14"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};
