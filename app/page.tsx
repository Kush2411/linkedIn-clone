import { Feed } from "@/components/Feed";
import { News } from "@/components/News";
import { Sidebar } from "@/components/Sidebar";
// import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  // const user = await currentUser();
  // console.log(user);

  return (
    <div className="pt-20">
      <div className="flex max-w-6xl mx-auto justify-between gap-7">
        <Sidebar/>
        <Feed />
        <News />
      </div>
    </div>
  );
}
