import { BsCodeSlash } from "react-icons/bs";
import {
  FaBold,
  FaHeading,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaRedo,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
} from "react-icons/fa";

const MenuBar2 = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex w-full md:flex-row flex-wrap sticky rounded-2xl mx-auto bg-[#edf2fa] justify-between items-center p-4">
      <div className="flex md:flex-row flex-wrap items-center space-x-3">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is_active" : ""}
        >
          <FaBold className="text-iconcolor" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is_active" : ""}
        >
          <FaItalic className="text-iconcolor" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is_active" : ""}
        >
          <FaUnderline className="text-iconcolor" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is_active" : ""}
        >
          <FaStrikethrough className="text-iconcolor" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is_active" : ""
          }
        >
          <FaHeading className="text-iconcolor" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is_active" : ""
          }
        >
          <FaHeading className="heading3 text-iconcolor" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is_active" : ""}
        >
          <FaListUl className="text-iconcolor" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is_active" : ""}
        >
          <FaListOl className="text-iconcolor" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "is-active" : ""}
        >
          <BsCodeSlash className="text-iconcolor" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is_active" : ""}
        >
          <FaQuoteLeft className="text-iconcolor" />
        </button>
      </div>
      <div className="flex items-center   md:mt-0  md:space-x-3">
        <button onClick={() => editor.chain().focus().undo().run()}>
          <FaUndo className="text-iconcolor" />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()}>
          <FaRedo className="text-iconcolor" />
        </button>
      </div>
    </div>
  );
};

export default MenuBar2;
