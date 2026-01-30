import Hero from "@/components/Hero";
import CategoryStrip from "@/components/CategoryStrip";
import Grid from "@/components/Grid";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CategoryStrip />
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-8 pb-20">
        <Grid />
      </div>
    </main>
  );
}
