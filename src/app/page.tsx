import { Post, SiteInfo } from "./types/types";
import { Card } from "./components/Card";
import { Animations } from "./components/Animations";

// WordPress leaves behind paragraphs like <p>&nbsp;</p> or <p></p> for blank
// editor lines; strip them so we don't render empty spacing in the cards.
function stripEmptyParagraphs(html: string): string {
  return html.replace(/<p[^>]*>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, '');
}

async function getPosts(): Promise<Post[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API_URL}/posts?_embed`,
    { cache: 'no-store' }
  );
    const raw = await response.json();
  return raw.map((post: any) => ({
    ...post,
    title: post.title.rendered,
    excerpt: stripEmptyParagraphs(post.excerpt.rendered),
    content: stripEmptyParagraphs(post.content.rendered),
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
          <div className="title-card rounded-sm mb-4 p-4 w-full gap-4">
            <div className="flex w-full justify-between items-center">
              <h1 className="text-2xl font-bold">{siteInfo.name}</h1>
              <h2 className="mb-0">Software Engineer</h2>
            </div>
             <div className="flex w-full justify-between items-center gap-8">
              <p className="mb-0 w-[70%]">{siteInfo.description}</p>
              <div className="flex justify-end items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/wilkes-booth-56310bb4/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.114 20.452H3.558V9h3.556v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/boothaw"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="inline-flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.42-1.305.763-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.469-2.38 1.236-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.696.825.578C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          {/* <div className="title-card rounded-sm mb-4 p-4">
            <h2 className="text-lg font-bold mb-0">jobs</h2>
          </div>   */}
            <div className="cards gap-4 flex flex-col">
              {jobs.map((post) => {
                const tags = post._embedded?.['wp:term']?.flat().filter(t => t.taxonomy === 'post_tag') ?? [];  
                return (
                    <Card
                      key={post.id}
                      post={post}
                      tags={tags}
                      isProject={false}
                    />
                );
              })}
            </div>
            {/* <div className="title-card rounded-sm mb-4 p-4">
              <h2 className="text-lg font-bold mb-0">projects</h2>
            </div>   */}
            <div className="cards gap-4 flex flex-col">
              {projects.map((post) => {
                const tags = post._embedded?.['wp:term']?.flat().filter(t => t.taxonomy === 'post_tag') ?? [];
                return (
                   <Card
                      key={post.id}
                      post={post}
                      tags={tags}
                      isProject={true}
                    />
                );
              })}
            </div>
      </main>
    </div>
  );
}
export default Home
