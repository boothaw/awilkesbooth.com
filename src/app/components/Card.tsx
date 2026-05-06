import { Post, Term } from "../types/types";

interface CardProps {
 post: Post;
 tags: Term[];
}

export function Card({post, tags}: CardProps) {
  // const tags = tags;

  return (
    <div className={`card rounded-sm post- mb-4 p-4`} >
      <h2 className="font-bold text-xl mb-4">{post.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
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