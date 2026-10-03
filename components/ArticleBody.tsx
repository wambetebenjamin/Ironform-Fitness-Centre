export default function ArticleBody({ body }: { body: string }) {
  const blocks = body.split(/\n\n+/);
  return (
    <div className="article-content">
      {blocks.map((block, index) => block.startsWith("## ") ? <h2 key={index}>{block.slice(3)}</h2> : <p key={index}>{block}</p>)}
    </div>
  );
}
