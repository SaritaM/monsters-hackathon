'use client'

import { cn } from "@/lib/utils";
import { EditorProvider, useCurrentEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Bold, Italic, Strikethrough } from "lucide-react";
import { SetStateAction } from "react";

function MenuBar() {
	const {editor} = useCurrentEditor();

	if (!editor) return null;

	return <div className="flex gap-1">
		<button
			onClick={() => editor.chain().focus().toggleBold().run()}
			className={cn('border bg-white text-black', editor.isActive('bold') ? 'bg-black text-white' : '')}
			aria-label="Click to bold text"
			type="button"
		>
			<Bold />
		</button>
		<button
			onClick={() => editor.chain().focus().toggleItalic().run()}
			className={cn('border bg-white text-black', editor.isActive('italic') ? 'bg-black text-white' : '')}
			aria-label="Click to italicize text"
			type="button"
		>
			<Italic />
		</button>
		<button
			onClick={() => editor.chain().focus().toggleStrike().run()}
			className={cn('border bg-white text-black', editor.isActive('strike') ? 'bg-black text-white' : '')}
			aria-label="Click to strikethrough text"
			type="button"
		>
			<Strikethrough />
		</button>
	</div>
}

export default function Tiptap({content, setContent}: {
	content: string,
	setContent: React.Dispatch<SetStateAction<string>>
}) {
	const extensions = [StarterKit];

	return <div className="border rounded flex flex-col gap-4 p-2">
		<EditorProvider
			slotBefore={<MenuBar />}
			extensions={extensions}
			content={content}
			onUpdate={({editor}) => {setContent(editor.getHTML())}}
			immediatelyRender={false}
		/>
	</div>
}