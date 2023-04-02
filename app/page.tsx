import CollapseSideBar from "@/components/CollapseSideBar";
import {
    BoltIcon,
    ExclamationTriangleIcon,
    SunIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-white">
            <CollapseSideBar />
            <h1 className="text-5xl font-bold sm:mb-10 my-5">ChatGPT</h1>
            <div className="flex flex-wrap items-center justify-center overflow-auto space-x-2 text-center py-8">
                <div>
                    <div className="flex flex-col items-center justify-center mb-5 pt-5">
                        <SunIcon className="h-8 w-8" />
                        <h2>Examples</h2>
                    </div>
                    <div className="space-y-2">
                        <p className="infoText">
                            &ldquo;Explain quantum computing in simple
                            terms&ldquo;
                        </p>
                        <p className="infoText">
                            &ldquo;What is the difference between a dog and a
                            cat&ldquo;
                        </p>
                        <p className="infoText">
                            &ldquo;How do I make an HTTP request in
                            Javascript?&ldquo;
                        </p>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col items-center justify-center mb-5 pt-5">
                        <BoltIcon className="h-8 w-8" />
                        <h2>Capabilities</h2>
                    </div>
                    <div className="space-y-2">
                        <p className="infoText">
                            Remembers what user said earlier in the conversation
                        </p>
                        <p className="infoText">
                            Allows user to provide follow-up corrections
                        </p>
                        <p className="infoText">
                            Trained to decline inappropriate requests
                        </p>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col items-center justify-center mb-5 pt-5">
                        <ExclamationTriangleIcon className="h-8 w-8" />
                        <h2>Examples</h2>
                    </div>
                    <div className="space-y-2">
                        <p className="infoText">
                            May occasionally generate incorrect information
                        </p>
                        <p className="infoText">
                            May occasionally produce harmful instructions or
                            biased content
                        </p>
                        <p className="infoText">
                            Limited knowledge of world and events after 2021
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
