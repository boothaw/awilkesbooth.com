import { Post } from "./types/types";
import { Card } from "./components/Card";


async function getPosts(): Promise<Post[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API_URL}/posts?_embed`,
  );
    const raw = await response.json();
  return raw.map((post: any) => ({
    ...post,
    title: post.title.rendered,
    excerpt: post.excerpt.rendered,
    content: post.content.rendered,
  }));

}

const Home = async () => {
  const posts = await getPosts();

  const jobs = posts.filter((post) =>
    post.categories.includes(3)
  );
    const projects = posts.filter((post) =>
    post.categories.includes(4)
  );

  return (
    <div className="flex flex-col flex-1 items-center">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
          <h1>awilkesbooth.com</h1>
          <h2 className="font-bold mb-4">jobs</h2>
            <div className="cards">
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
            <h2 className="font-bold mb-4">projects</h2>
            <div className="cards">
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
