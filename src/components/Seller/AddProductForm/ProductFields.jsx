import React, { useEffect, useMemo, useRef, useState } from "react";

/* ---------- shared classes (use your theme tokens) ---------- */
const inputClass =
  "w-full bg-white border border-ink-200 py-2.5 px-4 rounded-xl text-ink-800 placeholder:text-ink-400 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100";
const labelClass = "text-sm font-medium text-ink-700";
const hintClass = "text-xs text-ink-400";
const sectionClass =
  "rounded-2xl border  border-ink-200 bg-ink-50/60 p-4 sm:p-5 w-full ";
const sectionTitle = "text-base font-semibold text-ink-900";

const MAX_IMAGES = 4;

/* ---------- options ---------- */
const CATEGORIES = [
  "Men",
  "Women",
  "Kids",
  "Fashion",
  "Electronic",
  "Electric",
  "Accessories",
  "Home & Living",
  "Beauty",
  "Sports",
];

const COLORS = [
  { name: "Black", hex: "#111827" },
  { name: "White", hex: "#ffffff" },
  { name: "Gray", hex: "#9ca3af" },
  { name: "Red", hex: "#ef4444" },
  { name: "Orange", hex: "#f97316" },
  { name: "Yellow", hex: "#facc15" },
  { name: "Green", hex: "#10b981" },
  { name: "Blue", hex: "#3b82f6" },
  { name: "Navy", hex: "#1e3a8a" },
  { name: "Purple", hex: "#8b5cf6" },
  { name: "Pink", hex: "#ec4899" },
  { name: "Brown", hex: "#92400e" },
];

/* ---------- plain text fields ---------- */
const textFields = [
  {
    name: "itemname",
    label: "Item Name",
    type: "text",
    key: "productName",
    required: true,
    span: true,
  },
  { name: "itembrand", label: "Item Brand", type: "text", key: "brand" },
  {
    name: "itemunit",
    label: "Item Unit",
    type: "text",
    key: "unit",
    placeholder: "pcs, pair, kg…",
  },
  {
    name: "itemprice",
    label: "Item Price (Rs)",
    type: "number",
    key: "price",
    required: true,
    min: 0,
  },
  {
    name: "itemdiscount",
    label: "Item Discount (%)",
    type: "number",
    key: "discount",
    min: 0,
    max: 100,
  },
  {
    name: "itemstock",
    label: "Item Stock",
    type: "number",
    key: "stock",
    required: true,
    min: 0,
  },
  {
    name: "itemsize",
    label: "Item Size",
    type: "text",
    key: "size",
    placeholder: "S, M, L or 42",
  },
];

const splitList = (v) =>
  Array.isArray(v)
    ? v.filter(Boolean)
    : String(v || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

const Check = () => (
  <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
    <path
      d="M4 10.5l4 4 8-9"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// product = existing product when editing, undefined when adding
const ProductFields = ({ product }) => {
  const isEdit = Boolean(product);

  /* ---------- category (multi select) ---------- */
  const [categories, setCategories] = useState(product?.category || "");

  /* ---------- colors (multi select + custom) ---------- */
  const [colors, setColors] = useState(() => splitList(product?.color));
  const [custom, setCustom] = useState("#6366f1");
  const toggleColor = (c) =>
    setColors((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));
  const customColors = colors.filter((c) => !COLORS.some((x) => x.name === c));

  /* ---------- images (max 4) ---------- */
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [active, setActive] = useState(0);
  const [imgError, setImgError] = useState("");

  const previews = useMemo(
    () => files.map((f) => URL.createObjectURL(f)),
    [files],
  );
  useEffect(
    () => () => previews.forEach((u) => URL.revokeObjectURL(u)),
    [previews],
  );

  // keep the real <input> in sync so FormData(e.target) sends every file
  useEffect(() => {
    if (!inputRef.current) return;
    const dt = new DataTransfer();
    files.forEach((f) => dt.items.add(f));
    inputRef.current.files = dt.files;
  }, [files]);

  const onImageChange = (e) => {
    const picked = Array.from(e.target.files).filter((f) =>
      f.type.startsWith("image/"),
    );
    const merged = [...files, ...picked];
    setImgError(
      merged.length > MAX_IMAGES
        ? `You can add up to ${MAX_IMAGES} images.`
        : "",
    );
    setFiles(merged.slice(0, MAX_IMAGES));
  };

  const removeImage = (i) => {
    setFiles((p) => p.filter((_, idx) => idx !== i));
    setActive(0);
    setImgError("");
  };

  const existing = product?.images?.length
    ? product.images
    : product?.mainimg
      ? [product.mainimg]
      : [];
  const showing = previews.length ? previews : existing;
  const mainSrc = showing[active] || showing[0];

  return (
    <div className="flex w-full flex-col gap-5 ">
      {isEdit && <input type="hidden" name="id" value={product._id} />}

      {/* ---------------- Basic details ---------------- */}
      <section className={sectionClass}>
        <h3 className={`${sectionTitle} mb-4`}>Product details</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {textFields.map((f) => (
            <div
              key={f.name}
              className={`flex flex-col gap-1.5 ${f.span ? "sm:col-span-2 lg:col-span-3" : ""}`}
            >
              <label htmlFor={f.name} className={labelClass}>
                {f.label}
                {f.required && <span className="text-danger-500"> *</span>}
              </label>
              <input
                type={f.type}
                name={f.name}
                id={f.name}
                min={f.min}
                max={f.max}
                required={f.required}
                placeholder={f.placeholder}
                defaultValue={product?.[f.key] ?? ""}
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Category ---------------- */}
      <section className={sectionClass}>
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-1">
          <h3 className={sectionTitle}>
            Category<span className="text-danger-500"> *</span>
          </h3>
          <span className={hintClass}>Pick one or more</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const on = categories.includes(c);
            return (
              <button
                type="button"
                key={c}
                onClick={() => setCategories(c)}
                aria-pressed={on}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition active:scale-95 ${
                  on
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-ink-200 bg-white text-ink-700 hover:border-brand-300 hover:bg-brand-50"
                }`}
              >
                {on && <Check />}
                {c}
              </button>
            );
          })}
        </div>

        {/* required + submitted value (comma separated) */}
        <input
          name="itemcategory"
          value={categories}
          required
          readOnly
          tabIndex={-1}
          aria-hidden="true"
          className="sr-only"
        />
      </section>

      {/* ---------------- Colors ---------------- */}
      <section className={sectionClass}>
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-1">
          <h3 className={sectionTitle}>Colors</h3>
          <span className={hintClass}>
            {colors.length
              ? `${colors.length} selected`
              : "Select all available colors"}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
          {COLORS.map((c) => {
            const on = colors.includes(c.name);
            return (
              <button
                type="button"
                key={c.name}
                onClick={() => toggleColor(c.name)}
                aria-pressed={on}
                className={`flex items-center gap-2 rounded-xl border px-2.5 py-2 text-sm transition active:scale-95 ${
                  on
                    ? "border-brand-500 bg-brand-50 text-brand-700 ring-2 ring-brand-100"
                    : "border-ink-200 bg-white text-ink-700 hover:border-ink-300"
                }`}
              >
                <span
                  className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink-200"
                  style={{ backgroundColor: c.hex }}
                >
                  {on && (
                    <span
                      className={
                        c.name === "White" || c.name === "Yellow"
                          ? "text-ink-800"
                          : "text-white"
                      }
                    >
                      <Check />
                    </span>
                  )}
                </span>
                <span className="truncate">{c.name}</span>
              </button>
            );
          })}
        </div>

        {/* custom color */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label
            htmlFor="customcolor"
            className="text-sm font-medium text-ink-500"
          >
            Other color
          </label>
          <input
            id="customcolor"
            type="color"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            className="h-10 w-12 cursor-pointer rounded-lg border border-ink-200 bg-white p-1"
          />
          <button
            type="button"
            onClick={() =>
              !colors.includes(custom) && setColors((p) => [...p, custom])
            }
            className="rounded-xl border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition hover:bg-brand-50 hover:text-brand-700"
          >
            Add color
          </button>

          {customColors.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white py-1 pl-1.5 pr-2 text-xs text-ink-700"
            >
              <span
                className="h-5 w-5 rounded-full border border-ink-200"
                style={{ backgroundColor: c }}
              />
              {c}
              <button
                type="button"
                onClick={() => toggleColor(c)}
                aria-label={`Remove ${c}`}
                className="text-ink-400 hover:text-danger-500"
              >
                ✕
              </button>
            </span>
          ))}
        </div>

        <input type="hidden" name="itemcolor" value={colors.join(",")} />
      </section>

      {/* ---------------- Images ---------------- */}
      <section className={sectionClass}>
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-1">
          <h3 className={sectionTitle}>
            Images{!isEdit && <span className="text-danger-500"> *</span>}
          </h3>
          <span className={hintClass}>
            {files.length}/{MAX_IMAGES} added · first image is the cover
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* big preview */}
          <div className="relative col-span-2 aspect-4/3 w-full overflow-hidden rounded-2xl border border-ink-200 bg-white md:aspect-4/5 lg:aspect-4/3">
            {mainSrc ? (
              <img
                src={mainSrc}
                alt="Product preview"
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="flex h-full  flex-col items-center justify-center gap-1 p-6 text-center text-ink-400">
                <svg
                  viewBox="0 0 24 24"
                  className="h-10 w-10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="4" width="18" height="16" rx="3" />
                  <circle cx="9" cy="10" r="1.8" />
                  <path
                    d="M4 18l5-5 4 4 3-3 4 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-sm">Preview appears here</p>
              </div>
            )}
            {mainSrc && active === 0 && (
              <span className="absolute left-3 top-3 rounded-full bg-brand-600 px-2.5 py-1 text-xs font-semibold text-white">
                Cover
              </span>
            )}
          </div>

          {/* thumbnails + picker */}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-4 gap-2 md:grid-cols-2">
              {Array.from({ length: MAX_IMAGES }).map((_, i) => {
                const src = previews[i];
                if (!src) {
                  return (
                    <div
                      key={i}
                      className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-ink-300 bg-white text-xs text-ink-400"
                    >
                      {i + 1}
                    </div>
                  );
                }
                return (
                  <div
                    key={src}
                    className={`group relative aspect-square overflow-hidden rounded-xl border-2 bg-white ${
                      active === i ? "border-brand-500" : "border-ink-200"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className="h-full w-full"
                      aria-label={`Show image ${i + 1}`}
                    >
                      <img
                        src={src}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      aria-label={`Remove image ${i + 1}`}
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink-900/70 text-xs text-white transition hover:bg-danger-600"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>

            <label
              htmlFor="itemimg"
              className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed px-4 py-4 text-center text-sm transition focus-within:ring-2 focus-within:ring-brand-100 ${
                files.length >= MAX_IMAGES
                  ? "pointer-events-none border-ink-200 bg-ink-100 text-ink-400"
                  : "border-brand-300 bg-brand-50 text-brand-700 hover:bg-brand-100"
              }`}
            >
              <span className="font-semibold">
                {files.length >= MAX_IMAGES
                  ? "Image limit reached"
                  : "Upload images"}
              </span>
              <span className="text-xs text-ink-500">
                PNG or JPG · up to {MAX_IMAGES}
              </span>
              <input
                ref={inputRef}
                type="file"
                name="itemimg"
                id="itemimg"
                accept="image/*"
                multiple
                required={!isEdit && files.length === 0}
                onChange={onImageChange}
                className="sr-only"
              />
            </label>

            {imgError && (
              <p className="text-xs font-medium text-danger-600">{imgError}</p>
            )}
            {isEdit && !files.length && (
              <p className={hintClass}>
                Leave empty to keep the current images.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ---------------- Description ---------------- */}
      <section className={sectionClass}>
        <label
          htmlFor="itemdescription"
          className={`${sectionTitle} mb-3 block`}
        >
          Description
        </label>
        <textarea
          name="itemdescription"
          id="itemdescription"
          rows="5"
          placeholder="Material, fit, features, warranty…"
          defaultValue={product?.description || ""}
          className={`${inputClass} resize-y`}
        ></textarea>
      </section>
    </div>
  );
};

export default ProductFields;
