import { Post, Term } from "../types/types";

interface CardProps {
 post: Post;
 tags: Term[];
 isProject?: boolean;
}

export function Card({post, tags, isProject}: CardProps) {
  const firstPMatch = post.content.match(/<p[^>]*>([\s\S]*?)<\/p>/);
  const firstP = firstPMatch ? firstPMatch[1] : '';
  const restContent = firstPMatch
    ? post.content.slice(firstPMatch.index! + firstPMatch[0].length)
    : post.content;

  return (
    <div className={`card rounded-sm post- mb-4 p-4`} >
      {isProject ? (
        <>
          <h2 className="mb-4 flex justify-between items-center"><strong>{post.title}</strong></h2>
          <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </>
      ) : (
        <>
          <h2 className="mb-4 flex justify-between items-center" dangerouslySetInnerHTML={{ __html: firstP }} />
          <p className="font-bold mb-4 text-brand-foreground-opacity"><strong>{post.title}</strong></p>
          <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          <div dangerouslySetInnerHTML={{ __html: restContent }} />
        </>
      )}
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map(tag => (
          <span key={tag.id} className="text-xs px-2 py-1 rounded tag">
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}
