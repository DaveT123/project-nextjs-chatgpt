import openai from "./chatgpt";
import { ChatCompletionRequestMessage } from "openai";
import { adminDb } from "@/firebaseAdmin";

const query = async (
    prompt: string,
    chatId: string,
    model: string,
    session: any
) => {
    try {
        if (model == "gpt-3.5-turbo") {
            const promptMessage: ChatCompletionRequestMessage = {
                role: "user",
                content: prompt,
            };

            // retrieve previous messages from firestore
            const messages = await adminDb
                .collection("users")
                .doc(session?.user?.email)
                .collection("chats")
                .doc(chatId)
                .collection("messages")
                .orderBy("createdAt", "asc")
                .get();

            let reqMessage: ChatCompletionRequestMessage[] = [];

            // concat the messages
            messages?.docs.forEach((message) => {
                const singleMessage: ChatCompletionRequestMessage = {
                    role: message.data().user.role,
                    content: message.data().text,
                };
                reqMessage.push(singleMessage);
            });

            // if the previous content is too long, remove the oldest ones
            let lengthOfReqMessage = JSON.stringify(reqMessage).length;

            // 1 token = 4 characters. set limit at 95% (max 4096 tokens) to cater tokens for completion
            while (lengthOfReqMessage > 15500) {
                reqMessage.shift();
                lengthOfReqMessage = JSON.stringify(reqMessage).length;
            }

            const openaiChatCompletion = openai.createChatCompletion({
                model,
                messages: reqMessage,
            });

            const res: any = await Promise.race([
                openaiChatCompletion,
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        reject(new Error("Request timed out"));
                    }, 60000); // Timeout after 60 seconds
                }),
            ]);

            const data = res.data.choices[0].message?.content;
            return data;
        } else {
            const openaiChatCompletion = await openai.createCompletion({
                model,
                prompt,
                temperature: 0.7,
                top_p: 1,
                max_tokens: 1000,
                frequency_penalty: 0,
                presence_penalty: 0,
            });

            const res: any = await Promise.race([
                openaiChatCompletion,
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        reject(new Error("Request timed out"));
                    }, 60000); // Timeout after 60 seconds
                }),
            ]);

            const data = res.data.choices[0].text;
            return data;
        }
    } catch (err: any) {
        if (err.response) {
            console.error(`Error occurred: ${err.message}`);
            return `ChatGPT was unable to find the answer. (Error: ${err.message})`;
        } else {
            console.error(`Error occurred: ${err.message}`);
            return `No response from ChatGPT. Please try again. (Error: ${err.message})`;
        }
    }
};

export default query;
