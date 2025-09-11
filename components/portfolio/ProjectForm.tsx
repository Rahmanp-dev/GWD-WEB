"use client";
import { format } from "date-fns";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { GlassCard } from "../ui/GlassCard";
import { GlassInput } from "../ui/GlassInput";
import { NeonButton } from "../ui/NeonButton";
import { GlassFormWrapper } from "../GlassFormWrapper";

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
  tags: string[];
  date: string;
  featured: boolean;
  status: string;
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
    title: "",
    slug: "",
    domain: "web",
    descriptionMarkdown: "",
    tags: [],
    date: format(new Date(), "yyyy-MM-dd"),
    featured: false,
    status: "draft",
    yearStart: new Date().getFullYear(),
    yearEnd: new Date().getFullYear(),
    mediaUrls: [], // Always initialize as an array
  });

  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title ?? "",
        slug: initial.slug ?? "",
        domain: initial.domain ?? "web",
        descriptionMarkdown: initial.descriptionMarkdown ?? "",
        tags: Array.isArray(initial.tags) ? initial.tags : [],
        date: initial.date ? format(new Date(initial.date), "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
        featured: initial.featured ?? false,
        status: initial.status ?? "draft",
        yearStart: initial.yearStart ?? new Date().getFullYear(),
        yearEnd: initial.yearEnd ?? new Date().getFullYear(),
        mediaUrls: Array.isArray(initial.mediaUrls) ? initial.mediaUrls : [], // Ensure mediaUrls is always an array
      });
    }
  }, [initial]);

  const handleTitleChange = (title: string) => {
    setForm((f) => ({
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
  
  const handleFileUpload = async (files: File[]) => {
    if (!files || files.length === 0) return;
  
    setUploading(true);
    setError(null);
    const newUrls: string[] = [];
  
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file); // API expects a single 'file'
        formData.append("folder", "portfolio"); // Specify a folder
  
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
  
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "File upload failed");
        }
  
        const { secureUrl } = await res.json(); // API returns 'secureUrl'
        if (secureUrl) {
          newUrls.push(secureUrl);
        }
      }
  
      setForm((prevState) => ({
        ...prevState,
        mediaUrls: [...prevState.mediaUrls, ...newUrls],
      }));
    } catch (err: any) {
      setError(err.message || "An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };


  const handleTags = (tags: string) => {
    setForm((f) => ({
      ...f,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    }));
  };

  const validate = () => {
    if (!form.title) return "Title is required.";
    if (!form.slug) return "Slug is required.";
    if (!form.domain) return "Domain is required.";
    if (!form.descriptionMarkdown) return "Description is required.";
    return null;
  };

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
    <GlassFormWrapper className="max-w-2xl mx-auto p-6">
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-700/60 text-white font-semibold shadow border border-red-400/60 backdrop-blur">
          {error}
        </div>
      )}
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-semibold mb-1 text-white">
            Title
          </label>
          <GlassInput
            id="title"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="slug" className="block font-semibold mb-1 text-white">
            Slug
          </label>
          <GlassInput
            id="slug"
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="domain" className="block font-semibold mb-1 text-white">
            Domain
          </label>
          <select
            id="domain"
            className="input-glass w-full"
            value={form.domain}
            onChange={(e) => setForm((f) => ({ ...f, domain: e.target.value }))}
          >
            {DOMAINS.map((d) => (
              <option key={d.value} value={d.value} className="bg-black text-white">
                {d.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold mb-1 text-white">
            Description
          </label>
          <ReactQuill
            value={form.descriptionMarkdown}
            onChange={(desc) => setForm((f) => ({ ...f, descriptionMarkdown: desc }))}
            theme="snow"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1 text-white">Media</label>
          <div
            className="border-2 border-dashed border-red-500/60 rounded-xl p-6 bg-white/10 dark:bg-[#18181c]/60 backdrop-blur-md flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition"
            onClick={() => fileInputRef.current?.click()}
            onDrop={(e) => {
              e.preventDefault();
              handleFileUpload(Array.from(e.dataTransfer.files));
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleFileUpload(Array.from(e.target.files))}
            />
            {uploading ? (
              <span className="text-gray-200">Uploading...</span>
            ) : (
              <span className="text-gray-200 text-sm">
                Drag & drop files here, or <span className="underline text-red-400">click to select</span>
              </span>
            )}
          </div>
          
          {form.mediaUrls && form.mediaUrls.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
              {form.mediaUrls.map((url, idx) => (
                <div key={idx} className="relative group rounded-lg overflow-hidden border border-white/20 bg-black/30">
                  {url.match(/\.(mp4|webm|ogg)$/i) ? (
                    <video src={url} className="w-full h-28 object-cover" controls />
                  ) : (
                    <img src={url} className="w-full h-28 object-cover" alt="media preview" />
                  )}
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-600/80 text-white rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-red-700 transition"
                    onClick={() => setForm(f => ({ ...f, mediaUrls: f.mediaUrls.filter((_, i) => i !== idx) }))}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
                <label htmlFor="yearStart" className="block font-semibold mb-1 text-white">Start Year</label>
                <GlassInput id="yearStart" type="number" value={form.yearStart} onChange={e => setForm(f => ({...f, yearStart: parseInt(e.target.value,10)}))} />
            </div>
            <div>
                <label htmlFor="yearEnd" className="block font-semibold mb-1 text-white">End Year</label>
                <GlassInput id="yearEnd" type="number" value={form.yearEnd} onChange={e => setForm(f => ({...f, yearEnd: parseInt(e.target.value,10)}))} />
            </div>
        </div>

        <div className="mb-4">
          <label htmlFor="tags" className="block font-semibold mb-1 text-white">
            Tags (comma-separated)
          </label>
          <GlassInput
            id="tags"
            value={form.tags.join(", ")}
            onChange={(e) => handleTags(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <label htmlFor="featured" className="font-semibold text-white">
            Featured Project
          </label>
          <input
            id="featured"
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
            className="w-5 h-5 accent-red-500"
          />
        </div>

        <div className="flex gap-4 mt-6 justify-end">
          <NeonButton
            type="button"
            onClick={() => handleSave("draft")}
            disabled={saving || uploading}
          >
            {saving ? "Saving..." : "Save as Draft"}
          </NeonButton>
          <NeonButton
            type="button"
            onClick={() => handleSave("published")}
            disabled={saving || uploading}
          >
            {saving ? "Publishing..." : "Publish"}
          </NeonButton>
        </div>
      </form>
    </GlassFormWrapper>
  );
}
