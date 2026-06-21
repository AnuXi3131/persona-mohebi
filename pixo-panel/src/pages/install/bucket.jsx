import { Loader2, Settings, ShieldX } from "lucide-react";
import { toast } from "react-toastify";
import { functions } from "../../services/appwrite/appwrite.config";
import { BUCKET_CHECKER_ID, BUCKET_CREATOR_ID } from "../../services/appwrite";
import { useEffect, useState } from "react";
import { motion as Motion } from "motion/react";
import {
  Button,
  Loader,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Image,
} from "../../components/ui";

function Bucket() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [bucketExists, setBucketExists] = useState(false);
  const [bucketSettings, setBucketSettings] = useState(null);

  async function checkBucketState() {
    const execution = await functions.createExecution({
      functionId: BUCKET_CHECKER_ID,
    });
    const result = JSON.parse(execution.responseBody || "{}");

    setBucketExists(result.exists);
    setBucketSettings(result.settings);
  }

  useEffect(() => {
    checkBucketState().finally(() => setInitialLoading(false));
  }, []);

  async function setupBucket() {
    setActionLoading(true);

    try {
      const execution = await functions.createExecution({
        functionId: BUCKET_CREATOR_ID,
      });
      const result = JSON.parse(execution.responseBody || "{}");

      if (execution.status === "completed" && result.ok) {
        await checkBucketState();
        setBucketExists(true);
        toast.success("آپلود سنتر با موفقیت ساخته شد");
      } else {
        toast.error("آپلود سنتر از قبل وجود دارد");
      }
    } catch {
      toast.error("خطا در ساخت آپلود سنتر");
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {bucketExists
            ? "تبریک! آپلود سنتر شما آماده است"
            : "برای شروع آپلود سنتر ایجاد کنید"}
        </CardTitle>
        <CardDescription>
          با یک کلیک bucket ساخته می‌شود و سیستم آپلود فعال خواهد شد.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid-items-2 items-center">
          {initialLoading ? (
            <Loader text={"در حال بررسی وضعیت آپلود سنتر"} />
          ) : (
            <div className="bg-accent border-border space-y-12 rounded-lg border border-solid p-3 shadow-2xl shadow-black/10 md:p-6">
              <Motion.div
                key={bucketExists}
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                  damping: 100,
                }}
              >
                {bucketExists ? (
                  <div className="grid gap-6">
                    <h3 className="font-weight-bold flex items-center gap-2 text-xl">
                      <Settings />
                      <span>تنظیمات فعلی</span>
                    </h3>
                    <ul className="max-h-96 space-y-2 overflow-auto pl-4">
                      {Object.entries(bucketSettings).map(([key, value]) => (
                        <li
                          key={key}
                          className="border-border flex justify-between gap-2 border-b pb-1"
                        >
                          <span className="text-muted-foreground line-clamp-1 text-sm">
                            {String(value)}
                          </span>
                          <span>{key}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <h3 className="text-destructive font-weight-bold flex items-center gap-2 text-2xl">
                        <ShieldX size={50} />
                        <span> هیچ آپلود سنتری ساخته نشده</span>
                      </h3>
                      <p className="text-muted-foreground">
                        برای شروع، یک bucket جدید ایجاد کنید تا آپلود فعال شود.
                      </p>
                    </div>
                    <Button
                      label={
                        actionLoading
                          ? "در حال ساخت آپلود سنتر..."
                          : "ساخت آپلود سنتر"
                      }
                      icon={actionLoading && Loader2}
                      loading={actionLoading}
                      onClick={setupBucket}
                      className={"w-full"}
                    />
                  </div>
                )}
              </Motion.div>
            </div>
          )}
          <figure>
            <Image
              src={"/images/figures/bucket-js.png"}
              alt={"bucket"}
              loading={"lazy"}
              className={"w-full"}
            />
          </figure>
        </div>
      </CardContent>
    </Card>
  );
}

export default Bucket;
