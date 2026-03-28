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

  return (
    <div className="flex flex-col flex-1 items-center">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <h1>awilkesbooth.com</h1>
            <div className="posts">
              {posts.map((post) => {
                return (
                  <Link href={`/blog/${post.id}`} className="post" key={post.id}>
                    <h3>{post.title.rendered}</h3>
                    <p
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    ></p>
                  </Link>
                );
              })}
            </div>
      </main>
    </div>
  );
}
export default Home
