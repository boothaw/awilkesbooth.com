import Image from "next/image";
import Link from "next/link";

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
}

async function getPosts(): Promise<Post[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API_URL}/posts`,
  );
  const posts: Post[] = await response.json();
  return posts;
}

const Home = async () => {
  const posts = await getPosts();

  console.log(posts)

  return (
    <div className="flex flex-col flex-1 items-center">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <h1>awilkesbooth.com</h1>
          <h2 className="font-bold mb-4">jobs</h2>
            <div className="posts">
              {posts.filter((post) => post.categories.includes(3)).map((post) => {
                return (
                  <div className={`post post-${post.id} mb-4`} key={post.id}>
                    <h3 className="font-bold">{post.title.rendered} - {post.categories[0]}</h3>
                    <div
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    ></div>
                  </div>
                );
              })}
            </div>
            <h2 className="font-bold mb-4">projects</h2>
            <div className="posts">
              {posts.filter((post) => post.categories.includes(4)).map((post) => {
                return (
                  <div className={`post post-${post.id} mb-4`} key={post.id}>
                    <h3 className="font-bold">{post.title.rendered} - {post.categories[0]}</h3>
                    <div
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    ></div>
                  </div>
                );
              })}
            </div>
      </main>
    </div>
  );
}
export default Home
