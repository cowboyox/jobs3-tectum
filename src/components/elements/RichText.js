import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className='editor_topbar'>
      <div
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        h1
      </div>
      <div
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        h2
      </div>
      <div
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        h3
      </div>
      <div
        className={editor.isActive('paragraph') ? 'is-active' : ''}
        onClick={() => editor.chain().focus().setParagraph().run()}
      >
        paragraph
      </div>
      <div
        className={editor.isActive('bold') ? 'is-active' : ''}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        bold
      </div>
      <div
        className={editor.isActive('italic') ? 'is-active' : ''}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        italic
      </div>
      <div
        className={editor.isActive('strike') ? 'is-active' : ''}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        strike
      </div>
      <div
        className={editor.isActive('highlight') ? 'is-active' : ''}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
      >
        highlight
      </div>
      <div
        className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
      >
        left
      </div>
      <div
        className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
      >
        center
      </div>
      <div
        className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
      >
        right
      </div>
      <div
        className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
      >
        justify
      </div>
    </div>
  );
};

const RichText = () => {
  const editor = useEditor({
    content: '<p>Job Description goes here</p>',
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
    ],
  });

  return (
    <div className='editor_container'>
      <MenuBar editor={editor} />
      <div className='editor_con'>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichText;
