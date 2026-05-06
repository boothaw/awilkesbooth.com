import { Post, SiteInfo } from "./types/types";
import { Card } from "./components/Card";
import { Animations } from "./components/Animations";


async function getPosts(): Promise<Post[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API_URL}/posts?_embed`,
    { cache: 'no-store' }
  );
    const raw = await response.json();
  return raw.map((post: any) => ({
    ...post,
    title: post.title.rendered,
    excerpt: post.excerpt.rendered,
    content: post.content.rendered,
  }));
}

async function getSiteInfo(): Promise<SiteInfo> {
  const wpRoot = process.env.NEXT_PUBLIC_WP_API_URL!.replace(/\/wp\/v2\/?$/, '');
  const response = await fetch(
    `${wpRoot}/`,
    { cache: 'no-store' }
  );
  const raw = await response.json();
  console.log('siteinfo', raw.name)
  return { name: raw.name, description: raw.description };
}

const Home = async () => {
  // DEV ONLY: artificial delay to preview loading.tsx — remove before deploying
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const posts = await getPosts();

  const jobsCategoryId = Number(process.env.NEXT_PUBLIC_JOBS_CATEGORY_ID);
  const projectsCategoryId = Number(process.env.NEXT_PUBLIC_PROJECTS_CATEGORY_ID);

  const jobs = posts.filter((post) =>
    post.categories.includes(jobsCategoryId)
  );
  const projects = posts.filter((post) =>
    post.categories.includes(projectsCategoryId)
  );

  const siteInfo = await getSiteInfo();

  return (
    <div className="flex flex-col flex-1 items-center body">
        <Animations />
      <main className="flex flex-1 w-full flex-col items-center justify-between gap-4 max-w-[90%] py-16 md:max-w-3xl">
        
          <div className="title-card rounded-md mb-4 p-4">
            <h1 className="text-2xl font-bold">{siteInfo.name}</h1>
            <p>{siteInfo.description}</p>
          </div>
          {/* <div className="title-card rounded-md mb-4 p-4">
            <h2 className="text-lg font-bold mb-0">jobs</h2>
          </div>   */}
            <div className="cards gap-8 flex flex-col">
              {jobs.map((post) => {
                const tags = post._embedded?.['wp:term']?.flat().filter(t => t.taxonomy === 'post_tag') ?? [];  
                return (
                    <Card
                      key={post.id}
                      post={post}
                      tags={tags}
                    />
                );
              })}
            </div>
            {/* <div className="title-card rounded-md mb-4 p-4">
              <h2 className="text-lg font-bold mb-0">projects</h2>
            </div>   */}
            <div className="cards gap-8 flex flex-col">
              {projects.map((post) => {
                const tags = post._embedded?.['wp:term']?.flat().filter(t => t.taxonomy === 'post_tag') ?? [];
                return (
                   <Card
                      key={post.id}
                      post={post}
                      tags={tags}
                    />
                );
              })}
            </div>
      </main>
    </div>
  );
}
export default Home
