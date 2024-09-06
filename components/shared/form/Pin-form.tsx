"use client";

import { useForm } from "@conform-to/react";
import { useState } from "react";
import { useFormState } from "react-dom";
import { ChevronLeft, XIcon } from "lucide-react";
import { parseWithZod } from "@conform-to/zod";
import Image from "next/image";
import { createPin } from "@/actions/pin-action";
import { pinSchema } from "@/lib/schemas";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UploadDropzone } from "@/lib/uploadthing";
import { TipTapEditor } from "./Editor";
import { SubmitButton } from "../SubmitButton";

export default function PinForm() {
  const [images, setImages] = useState<string[]>([]);
  const [descriptionJson, setDescriptionJson] = useState(null);

  const [lastResult, action] = useFormState(createPin, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: pinSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>In this form you can create your product</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input type="text" key={fields.title.key} name={fields.title.name} defaultValue={fields.title.initialValue} className="w-full" placeholder="Title" />
              <p className="text-red-500">{fields.title.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <TipTapEditor json={descriptionJson} setJson={setDescriptionJson} />
              <input type="hidden" name="description" value={JSON.stringify(descriptionJson)} />
              <p className="text-red-500">{fields.description.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <input type="hidden" value={images} key={fields.images.key} name={fields.images.name} defaultValue={fields.images.initialValue as any} />
              {images.length > 0 ? (
                <div className="flex gap-5">
                  {images.map((image, index) => (
                    <div key={index} className="relative w-[100px] h-[100px]">
                      <Image height={100} width={100} src={image} alt="Product Image" className="w-full h-full object-cover rounded-lg border" />
                      <button onClick={() => handleDelete(index)} type="button" className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white">
                        <XIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImages(res.map((r) => r.url));
                  }}
                  onUploadError={() => {
                    alert("Something went wrong");
                  }}
                />
              )}
              <p className="text-red-500">{fields.images.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Create Pin" />
        </CardFooter>
      </Card>
    </form>
  );
}
