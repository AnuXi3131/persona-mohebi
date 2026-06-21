import clsx from "clsx";
import { useEffect, useState } from "react";
import { motion as Motion } from "motion/react";
import { Loader2, ShieldCheck, ShieldX } from "lucide-react";
import { collections } from "../../constants/maps/collectionsMap";
import { toast } from "react-toastify";
import { functions } from "../../services/appwrite/appwrite.config";
import {
  DB_CHECKER_ID,
  DB_CREATOR_ID,
  DB_DELETOR_ID,
} from "../../services/appwrite";
import {
  Button,
  Loader,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Tooltip,
  Image,
} from "../../components/ui";

function Database() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [databaseExists, setDatabaseExists] = useState(false);

  useEffect(() => {
    async function checkDatabase() {
      try {
        const execution = await functions.createExecution({
          functionId: DB_CHECKER_ID,
        });
        const result = JSON.parse(execution.responseBody || "{}");

        setDatabaseExists(result.exists);
      } catch {
        setDatabaseExists(false);
      } finally {
        setInitialLoading(false);
      }
    }

    checkDatabase();
  }, [databaseExists]);

  async function setupDatabase() {
    setActionLoading(true);

    try {
      const execution = await functions.createExecution({
        functionId: DB_CREATOR_ID,
      });
      const result = JSON.parse(execution.responseBody || "{}");

      if (execution.status === "completed" && result.ok) {
        setDatabaseExists(true);
        toast.success("دیتابیس با موفقیت ساخته شد");
      } else {
        toast.error("دیتابیس از قبل وجود دارد");
      }
    } catch {
      toast.error("خطا در ساخت دیتابیس");
    } finally {
      setActionLoading(false);
    }
  }

  async function deleteDatabase() {
    setActionLoading(true);

    try {
      await functions.createExecution(DB_DELETOR_ID);
      setDatabaseExists(false);
      toast.success("دیتابیس با موفقیت حذف شد");
    } catch (error) {
      if (error.code === 401) {
        toast.error("دسترسی رد شد");
        return;
      }
      toast.error("خطا در حذف دیتابیس");
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {databaseExists
            ? "تبریک! دیتابیس شما آماده است"
            : "برای شروع دیتابیس را ایجاد کنید"}
        </CardTitle>
        <CardDescription>
          با یک کلیک دیتابیس نمونه ساخته می‌شود و می‌توانید مدیریت را شروع کنید.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid-items-2 items-center">
          {initialLoading ? (
            <Loader text={"در حال بررسی وضعیت دیتابیس"} />
          ) : (
            <div className="bg-accent border-border space-y-12 rounded-lg border border-solid p-3 shadow-2xl shadow-black/10 md:p-6">
              <Motion.div
                key={databaseExists}
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                  damping: 100,
                }}
                className="grid-items-2 overflow-x-auto"
              >
                {collections.map((item) => (
                  <pre key={item} className="relative flex items-center gap-2">
                    <span
                      className={clsx(
                        "absolute right-3 bottom-full z-[-1] h-full w-1",
                        databaseExists ? "bg-chart-2/20" : "bg-destructive/20",
                      )}
                    ></span>
                    <span
                      className={clsx(
                        "rounded-full p-0.5",
                        databaseExists
                          ? "bg-chart-2/20 text-chart-2"
                          : "bg-destructive/20 text-destructive",
                      )}
                    >
                      {databaseExists ? <ShieldCheck /> : <ShieldX />}
                    </span>
                    <span
                      className={`${databaseExists ? "" : "text-muted-foreground"}`}
                    >
                      {item}
                    </span>
                  </pre>
                ))}
              </Motion.div>
              {databaseExists && (
                <Tooltip
                  content={`
                    با کلیک برروی دکمه حذف دیتابیس، آپلود سنتر هم
                    حذف خواهد شد.
                `}
                  offset={75}
                >
                  <Button
                    label={
                      actionLoading ? "در حال حذف دیتابیس..." : "حذف دیتابیس"
                    }
                    varient="destructive"
                    icon={actionLoading && Loader2}
                    loading={actionLoading}
                    onClick={deleteDatabase}
                    className={
                      "text-destructive! border-destructive w-full hover:border-transparent"
                    }
                  />
                </Tooltip>
              )}
              {!databaseExists && (
                <Button
                  label={
                    actionLoading ? "در حال ساخت دیتابیس..." : "ساخت دیتابیس"
                  }
                  icon={actionLoading && Loader2}
                  loading={actionLoading}
                  onClick={setupDatabase}
                  className={"w-full"}
                />
              )}
            </div>
          )}
          <figure>
            <Image
              src={"/images/figures/database-js.png"}
              alt={"database"}
              loading={"lazy"}
              className={"w-full"}
            />
          </figure>
        </div>
      </CardContent>
    </Card>
  );
}
export default Database;
