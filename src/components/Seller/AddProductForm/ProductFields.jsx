import React, { useState } from "react";

const inputClass =
  "w-full bg-white border border-ink-200 py-2.5 px-4 rounded-xl text-ink-800 placeholder:text-ink-400 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";
const labelClass = "text-sm font-medium text-ink-500";

const fields = [
  {
    name: "itemname",
    label: "Item Name",
    type: "text",
    key: "productName",
    required: true,
  },
  { name: "itembrand", label: "Item Brand", type: "text", key: "brand" },
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
  { name: "itemcolor", label: "Item Color", type: "text", key: "color" },
  { name: "itemsize", label: "Item Size", type: "text", key: "size" },
  { name: "itemunit", label: "Item Unit", type: "text", key: "unit" },
  {
    name: "itemcategory",
    label: "Item Category",
    type: "text",
    key: "category",
    required: true,
  },
];

// product = existing product when editing, undefined when adding
const ProductFields = ({ product }) => {
  const isEdit = Boolean(product);
  const [preview, setpreview] = useState("");

  const onImageChange = (e) => {
    const file = e.target.files[0];
    setpreview(file ? URL.createObjectURL(file) : "");
  };

  const shownImage = preview || product?.mainimg;

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {isEdit && <input type="hidden" name="id" value={product._id} />}

      {fields.map((f) => (
        <div key={f.name} className="flex flex-col gap-1.5">
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
            defaultValue={product?.[f.key] ?? ""}
            className={inputClass}
          />
        </div>
      ))}

      {/* image */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="itemimg" className={labelClass}>
          Item Image{!isEdit && <span className="text-danger-500"> *</span>}
        </label>
        <div className="flex items-center gap-3">
          {shownImage && (
            <img
              src={shownImage}
              alt="Product"
              className="h-16 w-16 shrink-0 rounded-lg border border-ink-200 bg-ink-100 object-cover"
            />
          )}
          <input
            type="file"
            name="itemimg"
            id="itemimg"
            accept="image/*"
            required={!isEdit}
            onChange={onImageChange}
            className="w-full text-sm text-ink-500 bg-white border border-ink-200 rounded-xl p-1.5 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-1.5 file:font-semibold file:text-brand-600 hover:file:bg-brand-100"
          />
        </div>
        {isEdit && (
          <p className="text-xs text-ink-400">
            Leave empty to keep the current image.
          </p>
        )}
      </div>

      {/* description */}
      <div className="flex flex-col gap-1.5 md:col-span-2">
        <label htmlFor="itemdescription" className={labelClass}>
          Item Description
        </label>
        <textarea
          name="itemdescription"
          id="itemdescription"
          rows="5"
          defaultValue={product?.description || ""}
          className={`${inputClass} resize-none`}
        ></textarea>
      </div>
    </div>
  );
};

export default ProductFields;
