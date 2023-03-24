"use client";

import useSWR from "swr";
import Select from "react-select";

const fetchModels = () => fetch("/api/getEngines").then((res) => res.json());

function ModelSelection() {
    const { data: models, isLoading } = useSWR("models", fetchModels);
    const { data: model, mutate: setModel } = useSWR("model", {
        fallbackData: "gpt-3.5-turbo",
    });

    return (
        <div className="flex flex-row items-center justify-center sm:my-4">
            <div className="flex text-white mx-2">
                <p>Model:</p>
            </div>
            <Select
                className="flex-1"
                options={models?.modelOptions}
                defaultValue={model}
                placeholder={model}
                isSearchable
                isLoading={isLoading}
                menuPosition="fixed"
                classNames={{
                    control: (state) => "border-[#434654]",
                }}
                onChange={(e) => setModel(e.value)}
            />
        </div>
    );
}

export default ModelSelection;
