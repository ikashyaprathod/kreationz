import Hero from "@/components/Hero";
import CategoryStrip from "@/components/CategoryStrip";
import Grid from "@/components/Grid";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>
}) {
  const params = await searchParams;
  const category = params.category || 'All';
  const sort = params.sort || 'Popular';

  return (
    <main className="min-h-screen">
      <Hero />
      <CategoryStrip />
      <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <Grid category={category} sort={sort} />
      </div>
    </main>
  );
}
