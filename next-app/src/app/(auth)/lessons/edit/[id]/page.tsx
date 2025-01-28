import { LessonsEdit } from "@/components/lessons/edit";
import { Authenticated } from "@refinedev/core";

export default function EditPage() {
    return (
        <Authenticated key="lessons-edit" fallback={<div>Loading...</div>}>
            <LessonsEdit />
        </Authenticated>
    );
}
