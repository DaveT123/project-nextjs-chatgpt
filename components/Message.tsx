"use client";

import { DocumentData } from "firebase/firestore";

type Props = {
    message: DocumentData;
};

var hljs = require("highlight.js"); // https://highlightjs.org/

// Actual default values
var md = require("markdown-it")({
    highlight: function (str: string, lang: string) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return (
                    '<pre class="code-block"><code>' +
                    hljs.highlight(str, {
                        language: lang,
                        ignoreIllegals: true,
                    }).value +
                    "</code></pre>"
                );
            } catch (__) {}
        }

        return (
            '<pre class="code-block"><code>' +
            md.utils.escapeHtml(str) +
            "</code></pre>"
        );
    },
});

function Message({ message }: Props) {
    const isChatGPT = message.user.name === "ChatGPT";

    const formatMessage = (message: string) => {
        const formattedMessage = md.render(message);

        return formattedMessage;
    };

    return (
        <div className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`}>
            <div className="flex space-x-5 sm:px-10 pr-10 max-w-xs md:max-w-2xl  mx-auto">
                <img src={message.user.avatar} alt="" className="h-8 w-8" />
                <p
                    className="pt-1 text-sm w-full message-text"
                    dangerouslySetInnerHTML={{
                        __html: formatMessage(message.text),
                    }}
                ></p>
            </div>
        </div>
    );
}

export default Message;
