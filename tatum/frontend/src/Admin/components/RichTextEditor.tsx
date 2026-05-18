
import { useRef, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  label?: string;
}

const RichTextEditor = ({ value, onChange, label }: RichTextEditorProps) => {
  const quillRef = useRef<ReactQuill>(null);

  const modules = useMemo(() => ({
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'clean'],
    ],
  }), []);

  return (
    <div className="rich-text-editor">
      {label && <label className="form-label">{label}</label>}
      <ReactQuill 
        ref={quillRef}
        theme="snow" 
        value={value || ""} 
        onChange={onChange} 
        modules={modules}
      />
    </div>
  );
};

export default RichTextEditor;
