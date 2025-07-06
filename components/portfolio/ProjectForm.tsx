"use client";
import { format } from "date-fns";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { GlassCard } from "../ui/GlassCard";
import { GlassInput } from "../ui/GlassInput";
import { NeonButton } from "../ui/NeonButton";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const DOMAINS = [
  { value: "web", label: "Web" },
  { value: "3d", label: "3D Animation" },
  { value: "security", label: "Security" },
  { value: "video", label: "Video Editing" },
  { value: "mobile", label: "Mobile" },
];

type ProjectFormState = {
  title: string;
  slug: string;
  domain: string;
  description: string;
  images: string[];
  videoUrl: string;
  tags: string[];
  date: string;
  featured: boolean;
  status: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
  };
};

export function ProjectForm({
  initial,
  onSave,
}: {
  initial?: any;
  onSave: (data: any) => void;
}) {
  const [form, setForm] = useState<ProjectFormState>({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    domain: initial?.domain ?? "web",
    description: initial?.description ?? "",
    images: Array.isArray(initial?.images) ? initial.images : [],
    videoUrl: initial?.videoUrl ?? "",
    tags: Array.isArray(initial?.tags) ? initial.tags : [],
    date: initial?.date ?? format(new Date(), "yyyy-MM-dd"),
    featured: initial?.featured ?? false,
    status: initial?.status ?? "draft",
    seo: {
      metaTitle: initial?.seo?.metaTitle ?? "",
      metaDescription: initial?.seo?.metaDescription ?? "",
      ogImage: initial?.seo?.ogImage ?? "",
    },
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    setForm((f: ProjectFormState) => ({
      ...f,
      title,
      slug:
        f.slug ||
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, ""),
    }));
  };

  // Handle image upload (upload to API, then set URLs)
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
      const formData = new FormData();
      Array.from(e.target.files).forEach((file) =>
        formData.append("files", file)
      );
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const { urls } = await res.json();
      setForm((f: ProjectFormState) => ({ ...f, images: urls }));
    }
  };

  // Handle video upload (upload to API, then set URL)
  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
      const formData = new FormData();
      formData.append("files", e.target.files[0]);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const { urls } = await res.json();
      setForm((f: ProjectFormState) => ({ ...f, videoUrl: urls[0] }));
    }
  };

  // Handle tag input (comma separated)
  const handleTags = (tags: string) => {
    setForm((f: ProjectFormState) => ({
      ...f,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    }));
  };

  // Save handler
  const handleSave = async (status: "draft" | "published") => {
    setUploading(true);
    // TODO: upload images/videos to server, get URLs
    // For now, just pass form data
    await onSave({ ...form, status });
    setUploading(false);
  };

  return (
    <GlassCard className="max-w-2xl mx-auto p-6">
      <div className="mb-4">
        <label htmlFor="title" className="block font-semibold mb-1">
          Title
        </label>
        <GlassInput
          id="title"
          aria-label="Project title"
          value={form.title}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="slug" className="block font-semibold mb-1">
          Slug
        </label>
        <GlassInput
          id="slug"
          aria-label="Project slug"
          value={form.slug}
          onChange={(e) =>
            setForm((f: ProjectFormState) => ({ ...f, slug: e.target.value }))
          }
        />
      </div>
      <div className="mb-4">
        <label htmlFor="domain" className="block font-semibold mb-1">
          Domain
        </label>
        <select
          id="domain"
          aria-label="Project domain"
          className="input-glass"
          value={form.domain}
          onChange={(e) =>
            setForm((f: ProjectFormState) => ({ ...f, domain: e.target.value }))
          }
        >
          {DOMAINS.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block font-semibold mb-1">
          Description
        </label>
        <ReactQuill
          id="description"
          aria-label="Project description"
          value={form.description}
          onChange={(desc) =>
            setForm((f: ProjectFormState) => ({ ...f, description: desc }))
          }
          theme="snow"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="images" className="block font-semibold mb-1">
          Images
        </label>
        <input
          id="images"
          aria-label="Project images"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
        />
        <div className="flex gap-2 mt-2">
          {form.images.map((img: string, i: number) => (
            <img
              key={i}
              src={img}
              alt={`Project image preview ${i + 1}`}
              className="w-20 h-20 object-cover rounded"
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="video" className="block font-semibold mb-1">
          Video
        </label>
        <input
          id="video"
          aria-label="Project video"
          type="file"
          accept="video/mp4,video/webm"
          onChange={handleVideoChange}
        />
        {form.videoUrl && (
          <video
            src={form.videoUrl}
            className="w-40 h-24 mt-2 rounded"
            muted
            loop
            preload="metadata"
            onMouseOver={(e) => (e.currentTarget as HTMLVideoElement).play()}
            onMouseOut={(e) => (e.currentTarget as HTMLVideoElement).pause()}
            poster={form.images[0] || undefined}
            aria-label="Project video preview"
          />
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="tags" className="block font-semibold mb-1">
          Tags
        </label>
        <GlassInput
          id="tags"
          aria-label="Project tags"
          value={form.tags.join(", ")}
          onChange={(e) => handleTags(e.target.value)}
          placeholder="Comma separated"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block font-semibold mb-1">
          Date
        </label>
        <GlassInput
          id="date"
          aria-label="Project date"
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm((f: ProjectFormState) => ({ ...f, date: e.target.value }))
          }
        />
      </div>
      <div className="mb-4 flex items-center gap-4">
        <label htmlFor="featured" className="font-semibold">
          Featured
        </label>
        <input
          id="featured"
          aria-label="Mark as featured project"
          type="checkbox"
          checked={form.featured}
          onChange={(e) =>
            setForm((f: ProjectFormState) => ({
              ...f,
              featured: e.target.checked,
            }))
          }
          className="w-6 h-6 accent-red-500 focus:ring-2 focus:ring-pink-300"
        />
        <span className="text-xs text-gray-500">Show on homepage</span>
      </div>
      <div className="mb-4">
        <label htmlFor="seo-title" className="block font-semibold mb-1">
          SEO Meta Title
        </label>
        <GlassInput
          id="seo-title"
          aria-label="SEO meta title"
          value={form.seo.metaTitle}
          onChange={(e) =>
            setForm((f: ProjectFormState) => ({
              ...f,
              seo: { ...f.seo, metaTitle: e.target.value },
            }))
          }
        />
        <span className="text-xs text-gray-500">
          Appears in browser tab and search results
        </span>
        <label
          htmlFor="seo-description"
          className="block font-semibold mb-1 mt-2"
        >
          SEO Meta Description
        </label>
        <GlassInput
          id="seo-description"
          aria-label="SEO meta description"
          value={form.seo.metaDescription}
          onChange={(e) =>
            setForm((f: ProjectFormState) => ({
              ...f,
              seo: { ...f.seo, metaDescription: e.target.value },
            }))
          }
        />
        <span className="text-xs text-gray-500">
          Short summary for search engines and social media
        </span>
        <label htmlFor="seo-ogimage" className="block font-semibold mb-1 mt-2">
          OG Image URL
        </label>
        <GlassInput
          id="seo-ogimage"
          aria-label="SEO OG image URL"
          value={form.seo.ogImage}
          onChange={(e) =>
            setForm((f: ProjectFormState) => ({
              ...f,
              seo: { ...f.seo, ogImage: e.target.value },
            }))
          }
        />
        <span className="text-xs text-gray-500">
          Image shown when sharing on social media
        </span>
      </div>
      <div className="flex gap-4 mt-6">
        <NeonButton
          onClick={() => handleSave("draft")}
          disabled={uploading}
          aria-label="Save as draft"
        >
          Save Draft
        </NeonButton>
        <NeonButton
          onClick={() => handleSave("published")}
          disabled={uploading}
          aria-label="Publish project"
        >
          Publish
        </NeonButton>
      </div>
    </GlassCard>
  );
}
