import { useEffect, useMemo, useRef } from "react";
import { useTable } from "../../../contexts";
import { motion as Motion } from "motion/react";
import TableAction from "./table-action";
import { storage } from "../../../services/appwrite/appwrite.config";
import { STORAGE_ID } from "../../../services/appwrite";
import { Image } from "..";

function shortId(id) {
  if (!id) {
    return "در حال تولید...";
  }

  return id.slice(0, 4) + "..." + id.slice(-4);
}

function imageCell(fileId) {
  // if (!fileId) return null;

  return (
    <Image
      src={storage.getFileDownload({ bucketId: STORAGE_ID, fileId: fileId })}
      alt={""}
      loading={"lazy"}
      className={
        "border-border mx-auto aspect-square w-12 min-w-10 overflow-hidden rounded-lg border border-solid object-cover"
      }
    />
  );
}

function TableBody() {
  const {
    visibleColumns,
    searchText,
    data,
    fileType,
    loading,
    setQueryLength,
    stopFetching,
    allColumns,
  } = useTable();
  const lastTrRef = useRef(null);

  const filtredData = useMemo(() => {
    if (!searchText) return data;

    return data.filter((row) => {
      return allColumns.some((key) => {
        const value = String(row[key] ?? "").toLowerCase();
        return value.includes(searchText.trim());
      });
    });
  }, [data, searchText, allColumns]);

  useEffect(() => {
    if (!lastTrRef.current) return;
    if (loading) return;

    const observer = new IntersectionObserver(
      (entreis) => {
        const entry = entreis[0];
        if (entry.isIntersecting && stopFetching) {
          setQueryLength((prev) => prev + 5);
        }
      },
      {
        rootMargin: "100px",
      },
    );

    observer.observe(lastTrRef.current);
    return () => observer.disconnect();
  }, [filtredData, loading, setQueryLength, stopFetching]);

  function tableLoadingState() {
    return (
      <tr>
        {visibleColumns.map((_, index) => {
          return (
            <td key={index} className="p-3">
              <div className="bg-muted h-12 animate-pulse rounded-lg" />
            </td>
          );
        })}
        <td className="p-3">
          <div className="bg-muted h-12 animate-pulse rounded-lg" />
        </td>
      </tr>
    );
  }

  return (
    <Motion.tbody
      key={searchText}
      initial={{ opacity: 0, filter: "blur(6px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.3, ease: "easeInOut", damping: 100 }}
      className="text-muted-foreground w-full text-center"
    >
      {filtredData.map((row, index) => {
        const isLast = index === data.length - 1;

        if (loading) {
          return tableLoadingState(visibleColumns);
        }

        return (
          <tr
            key={row.id}
            ref={isLast ? lastTrRef : null}
            className="hover:bg-accent/50 border-border border-b border-solid duration-200"
          >
            {visibleColumns.map((key, index) => {
              const value = row[key];
              let content;

              if (key === "file" && fileType === "image") {
                content = imageCell(row[key]);
              } else if (key === "id") {
                content = shortId(row[key]);
              } else if (value !== undefined && value !== "") {
                content = String(value).slice(0, 50);
              } else {
                content = <span className="text-destructive">بدون مقدار</span>;
              }

              return (
                <td key={index} className="p-3 text-nowrap">
                  {content}
                </td>
              );
            })}

            <TableAction dbRow={row} />
          </tr>
        );
      })}
    </Motion.tbody>
  );
}
export default TableBody;
