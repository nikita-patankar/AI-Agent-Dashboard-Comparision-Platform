import ToolForm from "@/components/tools/ToolForm";
import ToolTable from "@/components/tools/ToolTable";

export default function AddToolPage(){
    return (
        <div className="mx-auto max-w-4xl p-8">
            <h1 className="mb-6 text-3xl font-bold">
                Add New AI Tool
            </h1>
            <ToolForm />
        </div>
    );
}