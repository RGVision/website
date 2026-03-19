import { getExperiences } from "@/lib/db";
import ExperiencesClient from "./ExperiencesClient";

export default async function ExperiencesPage() {
    const experiences = await getExperiences();
    return <ExperiencesClient experiences={experiences} />;
}
