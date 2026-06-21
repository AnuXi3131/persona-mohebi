import clsx from "clsx";
import { motion as Motion } from "motion/react";
import { Check, Database, Upload, Wifi, WifiOff, X } from "lucide-react";
import { useEffect, useState } from "react";
import { functions } from "../../services/appwrite/appwrite.config";
import { BUCKET_CHECKER_ID, DB_CHECKER_ID } from "../../services/appwrite";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Loader,
} from "../../components/ui";

function StatusCard({ label, icon, status }) {
  const Icon = icon;

  return (
    <div className="border-border flex items-center justify-between rounded-lg border border-solid p-3 md:p-6">
      <div className="flex items-center gap-3">
        <Icon className="text-muted-foreground size-10" />
        <h4 className="text-lg">{label}</h4>
      </div>
      <div
        className={clsx(
          "flex flex-col items-center justify-center gap-1 text-center",
          status ? "text-chart-2" : "text-destructive",
        )}
      >
        <i
          className={clsx(
            "text-foreground block rounded-full p-1",
            status ? "bg-chart-2" : "bg-destructive",
          )}
        >
          {status ? <Check /> : <X />}
        </i>
        <p>{status ? "در دسترس" : "غیر فعال"}</p>
      </div>
    </div>
  );
}

function ServerStatus() {
  const [loading, setLoading] = useState(true);
  const [isDatabase, setIsDatabase] = useState(null);
  const [isBucket, setIsBucket] = useState(null);

  useEffect(() => {
    async function checkStatus() {
      try {
        const dbExe = await functions.createExecution(DB_CHECKER_ID);
        const bucketExe = await functions.createExecution(BUCKET_CHECKER_ID);

        const dbResult = JSON.parse(dbExe.responseBody || "{}");
        const bucketResult = JSON.parse(bucketExe.responseBody || "{}");

        if (dbResult.exists) setIsDatabase(true);
        if (bucketResult.exists) setIsBucket(true);
      } finally {
        setLoading(false);
      }
    }

    checkStatus();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <header className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <h3 className="text-foreground flex-1 text-lg font-medium">
              وضعیت سرور
            </h3>
            {loading ? (
              <Loader />
            ) : isDatabase && isBucket ? (
              <Button
                varient="outline"
                label={"آنلاین"}
                icon={Wifi}
                className={
                  "bg-chart-2 text-foreground! hover:bg-chart-2 cursor-auto"
                }
              />
            ) : (
              <Button
                varient="destructive"
                label={"آفلاین"}
                icon={WifiOff}
                className={
                  "text-destructive bg-destructive/20 hover:bg-destructive cursor-auto"
                }
              />
            )}
          </header>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Loader text={"در حال بررسی..."} className={"h-96"} />
        ) : (
          <Motion.div
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="grid gap-6"
          >
            <StatusCard icon={Database} label={"دیتابیس"} status={isDatabase} />
            <StatusCard icon={Upload} label={"آپلود سنتر"} status={isBucket} />
          </Motion.div>
        )}
      </CardContent>
    </Card>
  );
}
export default ServerStatus;
