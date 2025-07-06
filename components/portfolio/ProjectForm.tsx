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
  descriptionMarkdown: string;
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
  yearStart: number;
  yearEnd: number;
  mediaUrls: string[];
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
    descriptionMarkdown: initial?.descriptionMarkdown ?? "",
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
    yearStart: initial?.yearStart ?? new Date().getFullYear(),
    yearEnd: initial?.yearEnd ?? new Date().getFullYear(),
    mediaUrls: Array.isArray(initial?.mediaUrls) ? initial.mediaUrls : [],
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

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
      setForm((f: ProjectFormState) => ({ ...f, mediaUrls: urls }));
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
      setForm((f: ProjectFormState) => ({ ...f, mediaUrls: urls }));
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

  // Validation helper
  const validate = () => {
    if (!form.title) return "Title is required.";
    if (!form.slug) return "Slug is required.";
    if (!form.domain) return "Domain is required.";
    if (!form.yearStart || !form.yearEnd) return "Year range is required.";
    if (!form.mediaUrls || form.mediaUrls.length === 0) return "At least one media URL is required.";
    if (!form.descriptionMarkdown) return "Description is required.";
    return null;
  };

  // Save handler
  const handleSave = async (status: "draft" | "published") => {
    setError(null);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setSaving(true);
    try {
      await onSave({ ...form, status });
    } catch (err: any) {
      setError(err?.message || err?.error || "Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <GlassCard className="max-w-2xl mx-auto p-6">
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-700/60 text-white font-semibold shadow border border-red-400/60 backdrop-blur">
          {error}
        </div>
      )}
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
          value={form.descriptionMarkdown}
          onChange={(desc) =>
            setForm((f: ProjectFormState) => ({ ...f, descriptionMarkdown: desc }))
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
          {form.mediaUrls.map((img: string, i: number) => (
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
        {form.mediaUrls.length > 0 && (
          <video
            src={form.mediaUrls[0]}
            className="w-40 h-24 mt-2 rounded"
            muted
            loop
            preload="metadata"
            onMouseOver={(e) => (e.currentTarget as HTMLVideoElement).play()}
            onMouseOut={(e) => (e.currentTarget as HTMLVideoElement).pause()}
            poster={form.mediaUrls[0] || undefined}
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
        <label className="block font-semibold mb-1">Media Upload</label>
        <div
          className="border-2 border-dashed border-red-500/60 rounded-xl p-6 bg-white/10 dark:bg-[#18181c]/60 backdrop-blur-md flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition"
          tabIndex={0}
          role="button"
          aria-label="Upload media"
          onClick={() => fileInputRef.current?.click()}
          onDrop={async (e) => {
            e.preventDefault();
            const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/') || f.type.startsWith('video/'));
            if (files.length === 0) return;
            const formData = new FormData();
            files.forEach(file => formData.append('files', file));
            const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
            const { urls } = await res.json();
            setForm(f => ({ ...f, mediaUrls: [...(f.mediaUrls || []), ...urls] }));
          }}
          onDragOver={e => e.preventDefault()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={async (e) => {
              if (!e.target.files) return;
              const files = Array.from(e.target.files).filter(f => f.type.startsWith('image/') || f.type.startsWith('video/'));
              if (files.length === 0) return;
              const formData = new FormData();
              files.forEach(file => formData.append('files', file));
              const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
              const { urls } = await res.json();
              setForm(f => ({ ...f, mediaUrls: [...(f.mediaUrls || []), ...urls] }));
            }}
          />
          <span className="text-gray-200 text-sm mb-2">Drag & drop images or videos here, or <span className="underline text-red-400">click to select</span></span>
          <span className="text-xs text-gray-400">Accepted: JPG, PNG, GIF, MP4, WebM, etc.</span>
        </div>
        {form.mediaUrls && form.mediaUrls.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
            {form.mediaUrls.map((url, idx) => (
              <div key={url} className="relative group rounded-lg overflow-hidden border border-white/20 bg-black/30">
                {url.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video src={url} className="w-full h-28 object-cover" controls />
                ) : (
                  <img src={url} className="w-full h-28 object-cover" alt="media" />
                )}
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-600/80 text-white rounded-full w-7 h-7 flex items-center justify-center shadow hover:bg-red-700 transition"
                  aria-label="Remove media"
                  onClick={() => setForm(f => ({ ...f, mediaUrls: f.mediaUrls.filter((_, i) => i !== idx) }))}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
        <span className="text-xs text-gray-400 mt-2 block">You can upload multiple files. First media will be used as the project thumbnail.</span>
      </div>
      <div className="flex gap-4 mt-6 justify-end">
        <NeonButton
          onClick={() => handleSave("draft")}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save as Draft"}
        </NeonButton>
        <NeonButton
          onClick={() => handleSave("published")}
          disabled={saving}
        >
          {saving ? "Saving..." : "Publish"}
        </NeonButton>
      </div>
    </GlassCard>
  );
}
