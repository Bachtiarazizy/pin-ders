"use client";

import { SubmitButton } from "@/components/shared/SubmitButton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BoardSchema } from "@/lib/schemas";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { Switch } from "@/components/ui/switch";
import { createBoard } from "@/actions/board-action";

export default function BoardForm() {
  const [lastResult, action] = useFormState(createBoard, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: BoardSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <Card className="mt-5">
        {/* <CardHeader>
          <CardTitle>Create Board</CardTitle>
          <CardDescription>Fill out the form to create a new board</CardDescription>
        </CardHeader> */}
        <CardContent className="mt-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input type="text" key={fields.name.key} name={fields.name.name} defaultValue={fields.name.initialValue} className="w-full" placeholder="Shop Name" />
              <p className="text-red-500">{fields.name.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <Input type="text" key={fields.description.key} name={fields.description.name} defaultValue={fields.description.initialValue} className="w-full" placeholder="Description" />
              <p className="text-red-500">{fields.description.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Private</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id={fields.isPrivate.id}
                  name={fields.isPrivate.name}
                  checked={fields.isPrivate.value === "true"}
                  onCheckedChange={(checked) => {
                    const event = new Event("input", { bubbles: true });
                    const input = document.createElement("input");
                    input.name = fields.isPrivate.name;
                    input.value = checked ? "true" : "false";
                    input.dispatchEvent(event);
                  }}
                />
                <Label htmlFor={fields.isPrivate.id}>{fields.isPrivate.value === "true" ? "Private" : "Public"}</Label>
              </div>
              <p className="text-red-500">{fields.isPrivate.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Create Board" />
        </CardFooter>
      </Card>
    </form>
  );
}
