import { Header } from "@/components/header";
import { Form } from "@/components/form/form";

export default function Home() {
    return (
        <main className="flex flex-col gap-y-24">
            <Header />
            <Form initialStep={1} />
        </main>
    )
}
