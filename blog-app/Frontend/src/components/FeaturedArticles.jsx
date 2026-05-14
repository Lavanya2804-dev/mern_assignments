import { Link } from "react-router-dom";
import {
  articleGrid,
  articleTitle,
  articleExcerpt,
  articleMeta,
  tagClass,
  linkClass,
  pageWrapper,
  headingClass,
} from "../styles/common";

const demoArticles = [
  {
    id: 1,
    title: "The Future of Artificial Intelligence",
    excerpt:
      "Explore how AI is transforming industries and changing the future of technology.",
    category: "Technology",
    date: "May 2026",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Mastering Modern React Development",
    excerpt:
      "Learn advanced React patterns and build scalable frontend applications.",
    category: "Development",
    date: "May 2026",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Building Beautiful User Interfaces",
    excerpt:
      "Design clean and modern interfaces using Tailwind CSS and component systems.",
    category: "Design",
    date: "May 2026",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1200&auto=format&fit=crop",
  },
];

function FeaturedArticles() {
  return (
    <section className={`${pageWrapper} pt-4`}>
      
      {/* Section Header */}
      <div className="flex items-center justify-between mb-10">

        <div>
          <p className="text-sm text-[#0066cc] font-semibold uppercase tracking-wider mb-2">
            Featured
          </p>

          <h2 className={headingClass}>
            Trending Articles
          </h2>
        </div>

      </div>

      {/* Articles Grid */}
      <div className={articleGrid}>

        {demoArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-3xl overflow-hidden border border-[#e8e8ed] hover:-translate-y-1 transition-all duration-300"
          >

            {/* Image */}
            <div className="overflow-hidden h-52">

              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />

            </div>

            {/* Content */}
            <div className="p-7 flex flex-col gap-4">

              {/* Category */}
              <span className={tagClass}>
                {article.category}
              </span>

              {/* Title */}
              <h3 className={articleTitle}>
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className={articleExcerpt}>
                {article.excerpt}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2">

                <span className={articleMeta}>
                  {article.date}
                </span>

                <Link
                  to="/"
                  className={linkClass}
                >
                  Read More →
                </Link>

              </div>

            </div>
          </div>
        ))}

      </div>

    </section>
  );
}

export default FeaturedArticles;