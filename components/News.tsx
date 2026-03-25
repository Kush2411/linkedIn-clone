import { Info } from "lucide-react";

interface NewsItem {
  heading: string;
  subHeading: string;
}

const newsItems: NewsItem[] = [
  {
    heading: "E-retailers retag health drinks",
    subHeading: "4h ago - 345 readers",
  },
  {
    heading: "AI hiring demand rises in India",
    subHeading: "6h ago - 1,120 readers",
  },
  {
    heading: "Startups focus on profitability in 2026",
    subHeading: "8h ago - 890 readers",
  },
  {
    heading: "Cloud computing jobs see 30% growth",
    subHeading: "12h ago - 2,450 readers",
  },
];

export const News = () => {
  return (
    <div className="hidden md:block w-[25%] bg-white h-fit rounded-lg border border-gray-300">
      <div className="flex items-center justify-between p-3">
        <h1 className="font-medium">LinkedIn News</h1>
        <Info size={20} />
      </div>
      <div>  
        {newsItems.map((item, index) => {
          return (
            <div
              key={index}
              className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
            >
              <h1 className="text-sm font-medium">{item.heading}</h1>
              <p className="text-xs text-gray-600">{item.subHeading}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
