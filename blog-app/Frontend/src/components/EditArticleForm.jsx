import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";

import {
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  articlePageWrapper,
} from "../styles/common";

function EditArticleForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  // article data coming from navigation
  const [article, setArticle] = useState(location.state || null);

useEffect(() => {
  if (article) return;

  const fetchArticle = async () => {
    const res = await axios.get(
      `http://localhost:4000/user-api/article/${id}`,
      { withCredentials: true }
    );
    setArticle(res.data.payload);
  };

  fetchArticle();
}, [id]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Prefill form fields
  useEffect(() => {
    if (!article) return;

    setValue("title", article.title);
    setValue("category", article.category);
    setValue("content", article.content);
  }, [article, setValue]);

  // Update article function
  const updateArticle = async (data) => {
    try {
      const response = await axios.put(
  `http://localhost:4000/author-api/articles/${id}`,
  data,
  { withCredentials: true }
);

      if (response.status === 200) {
        toast.success("Article updated successfully 🎉");
        navigate("/author-profile/articles");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update article");
    }
  };

  return (
    <div className={articlePageWrapper}>
      <div className={`${formCard} mt-10`}>
        <h2 className={formTitle}>Edit Article</h2>

        <form onSubmit={handleSubmit(updateArticle)}>
          {/* Title */}
          <div className={formGroup}>
            <label className={labelClass}>Title</label>

            <input
              className={inputClass}
              {...register("title", { required: "Title required" })}
            />

            {errors.title && (
              <p className={errorClass}>{errors.title.message}</p>
            )}
          </div>

          {/* Category */}
          <div className={formGroup}>
            <label className={labelClass}>Category</label>

            <select
              className={inputClass}
              {...register("category", { required: "Category required" })}
            >
              <option value="">Select category</option>
              <option value="technology">Technology</option>
              <option value="programming">Programming</option>
              <option value="ai">AI</option>
              <option value="web-development">Web Development</option>
            </select>

            {errors.category && (
              <p className={errorClass}>{errors.category.message}</p>
            )}
          </div>

          {/* Content */}
          <div className={formGroup}>
            <label className={labelClass}>Content</label>

            <textarea
              rows="14"
              className={inputClass}
              {...register("content", { required: "Content required" })}
            />

            {errors.content && (
              <p className={errorClass}>{errors.content.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className={submitBtn}>
            Update Article
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditArticleForm