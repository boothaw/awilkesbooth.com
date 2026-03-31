import Image from "next/image";
import Link from "next/link";

interface Term {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  categories: number[];
  tags: number[];
  _embedded?: {
    'wp:term': Term[][];
  };
}

async function getPosts(): Promise<Post[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API_URL}/posts?_embed`,
  );
  const posts: Post[] = await response.json();
  return posts;
}

const Home = async () => {
  const posts = await getPosts();

  console.log(posts)

  const jobs = posts.filter((post) =>
    post.categories.includes(3)
  );
    const projects = posts.filter((post) =>
    post.categories.includes(4)
  );

  return (
    <div className="flex flex-col flex-1 items-center">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <h1>awilkesbooth.com</h1>
          <h2 className="font-bold mb-4">jobs</h2>
            <div className="cards">
              {jobs.map((post) => {
                const tags = post._embedded?.['wp:term']?.flat().filter(t => t.taxonomy === 'post_tag') ?? [];
                return (
                  <div className={`card post-${post.id} mb-4 p-4`} key={post.id}>
                    <h3 className="font-bold">{post.title.rendered}</h3>
                    <div
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    ></div>
                    <div
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                    ></div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map(tag => (
                        <span key={tag.id} className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <h2 className="font-bold mb-4">projects</h2>
            <div className="cards">
              {projects.map((post) => {
                const tags = post._embedded?.['wp:term']?.flat().filter(t => t.taxonomy === 'post_tag') ?? [];
                return (
                  <div className={`card post-${post.id} mb-4 p-4`} key={post.id}>
                    <h3 className="font-bold">{post.title.rendered}</h3>
                    <div
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    ></div>
                    <div
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                    ></div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map(tag => (
                        <span key={tag.id} className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
      </main>
    </div>
  );
}
export default Home
