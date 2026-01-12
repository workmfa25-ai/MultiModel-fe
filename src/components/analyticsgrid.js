import StatCard from './statcard';

export default function AnalyticsGrid() {
  return (
    <div className="col-span-2 grid grid-cols-3 gap-4">
      <StatCard title="Documents" value="1,204" />
      <StatCard title="Images" value="876" />
      <StatCard title="Audio" value="342" />
      <StatCard title="Videos" value="119" />
      <StatCard title="Embeddings" value="2.4M" />
      <StatCard title="Search QPS" value="38" />
    </div>
  );
}
