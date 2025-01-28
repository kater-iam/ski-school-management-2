import { LessonsShow } from "@/components/lessons/show";
import { Authenticated } from "@refinedev/core";

export default function ShowPage() {
    return (
        <Authenticated key="lessons-show" fallback={<div>Loading...</div>}>
            <LessonsShow />
        </Authenticated>
    );
}
