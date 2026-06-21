import clsx from "clsx";
import Loader from "../loader/loader";
import { Editor } from "@tinymce/tinymce-react";
import {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useMemo,
  useState,
} from "react";

const RichTextEditor = forwardRef(
  (
    {
      name,
      id,
      register,
      setValue: setValueProp,
      error,
      disabled = false,
      className,
      onChange,
      dir = "rtl",
      value,
    },
    ref,
  ) => {
    const [loading, setLoading] = useState(true);
    const editorRef = useRef(null);
    const setValueRef = useRef(setValueProp);
    const nameRef = useRef(name);
    const onChangeRef = useRef(onChange);
    const latestDataRef = useRef("");

    useEffect(() => {
      setValueRef.current = setValueProp;
      nameRef.current = name;
      onChangeRef.current = onChange;
    }, [setValueProp, name, onChange]);

    useEffect(() => {
      if (register && name) register(name);
    }, [register, name]);

    const convertEditorJsToHtml = (rawValue) => {
      if (!rawValue) return "";
      if (typeof rawValue !== "string") return "";
      try {
        const parsed = JSON.parse(rawValue);
        if (!parsed?.blocks) return rawValue;
        const html = parsed.blocks
          .map((block) => {
            switch (block.type) {
              case "header":
                return `<h${block.data?.level ?? 2}>${block.data?.text ?? ""}</h${block.data?.level ?? 2}>`;
              case "paragraph":
                return `<p>${block.data?.text ?? ""}</p>`;
              case "list": {
                const tag = block.data?.style === "ordered" ? "ol" : "ul";
                const items = block.data?.items
                  ?.map((i) => `<li>${i}</li>`)
                  .join("");
                return `<${tag}>${items}</${tag}>`;
              }
              case "quote":
                return `<blockquote>${block.data?.text ?? ""}</blockquote>`;
              case "code":
                return `<pre><code>${block.data?.code ?? ""}</code></pre>`;
              case "delimiter":
                return "<hr />";
              case "image":
                return `<img src="${block.data?.file?.url ?? ""}" />`;
              default:
                return "";
            }
          })
          .join("");
        return html || rawValue;
      } catch {
        return rawValue;
      }
    };

    const normalizedValue = useMemo(
      () => convertEditorJsToHtml(value),
      [value],
    );

    const [editorData, setEditorData] = useState(normalizedValue);

    useEffect(() => {
      setEditorData(normalizedValue);
      latestDataRef.current = normalizedValue;
    }, [normalizedValue]);

    const handleEditorChange = (content) => {
      setEditorData(content);
      latestDataRef.current = content;

      if (setValueRef.current && nameRef.current) {
        setValueRef.current(nameRef.current, content, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }

      if (onChangeRef.current) {
        onChangeRef.current(content);
      }
    };

    const editorConfig = useMemo(
      () => ({
        language: "fa",
        menubar: false,
        promotion: false,
        height: 350,
        directionality: dir === "rtl" ? "rtl" : "ltr",

        plugins: [
          "lists",
          "link",
          "image",
          "table",
          "code",
          "codesample",
          "autolink",
          "directionality",
        ],

        toolbar:
          "undo redo | fontsize | styleselect | bold italic underline | " +
          "alignleft aligncenter alignright alignjustify | " +
          "bullist numlist | link image code codesample  | " +
          "table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol | ",

        content_style: /*css*/ `
          @font-face {
            font-family: "sans-regular";
            src: url("../fonts/iran-sans/IRANSans.ttf") format("truetype");
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }

          body { background:#212121; color:#fafafa; font-family:sans-regular; width:calc(100% - 2rem); overflow-x:auto; }

          a {text-decoration:underline; color:inherit;}

          img {max-width:100%; height:auto;}
        `,
      }),
      [dir],
    );

    useImperativeHandle(ref, () => ({
      getContent: () => latestDataRef.current || "",
      clear: () => {
        setEditorData("");
        latestDataRef.current = "";
        if (setValueRef.current && nameRef.current) {
          setValueRef.current(nameRef.current, "", {
            shouldDirty: true,
            shouldValidate: true,
          });
        }
      },
    }));

    return (
      <div className="grid gap-1 text-left">
        <div
          id={id}
          dir={dir}
          className={clsx(
            "rich-text-editor-wrapper relative",
            error && "rich-text-editor-error",
            disabled && "pointer-events-none opacity-60",
            className,
          )}
        >
          {loading && (
            <div className="flex-center absolute inset-0 z-10 rounded-lg">
              <Loader text={"در حال بارگزاری ادیتور..."} />
            </div>
          )}

          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            value={editorData}
            init={editorConfig}
            onEditorChange={handleEditorChange}
            onInit={(_, editor) => {
              editorRef.current = editor;
              setLoading(false);
            }}
            disabled={disabled}
          />
        </div>

        {error && (
          <span className="text-destructive text-sm">{error.message}</span>
        )}
      </div>
    );
  },
);

RichTextEditor.displayName = "RichTextEditor";

export default RichTextEditor;
