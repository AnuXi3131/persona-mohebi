import clsx from "clsx";
import { memo, useEffect, useState } from "react";
import { getViews } from "../../../services/api/getViews";
import { toast } from "react-toastify";
import { Empty, Loader } from "..";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  YAxis,
  XAxis,
  ResponsiveContainer,
} from "recharts";

/**
 *
 * @property {number} value
 */
function ViewChart({ value, className }) {
  const navigate = useNavigate();
  const daysCount = value || 1;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadChartData = async () => {
      setLoading(true);
      try {
        await getViews(daysCount).then((res) => setData(res));
      } catch {
        toast.error("خطا در بارگزاری اطلاعات");
      } finally {
        setLoading(false);
      }
    };

    loadChartData();
  }, [daysCount]);

  if (!data.length) {
    return loading ? (
      <Loader text={"در حال بارگزاری داده ها..."} className={"h-96"} />
    ) : (
      <Empty
        title={"دیتابیس شناسایی نشد"}
        description={"برای ثبت بازدید ها ابتدا دیتابیس را راه اندازی کنید"}
        actionButton={true}
        actionLabel="راه اندازی دیتابیس"
        onAction={() => navigate("/admin/install")}
      />
    );
  }

  return (
    <div>
      {loading ? (
        <Loader text={"در حال بارگزاری داده ها..."} className={"h-96"} />
      ) : (
        <div className={clsx(className)}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid
                stroke="var(--color-border)"
                strokeDasharray="3 3"
                opacity={0.3}
              />

              <XAxis
                dataKey="date"
                tick={{
                  fill: "var(--color-muted-foreground)",
                  fontSize: 12,
                }}
                axisLine={{ stroke: "var(--color-border)" }}
                tickLine={{ stroke: "var(--color-border)" }}
              />
              <YAxis
                width={"auto"}
                allowDecimals={false}
                tick={{
                  fill: "var(--color-muted-foreground)",
                  fontSize: 12,
                }}
                axisLine={{ stroke: "var(--color-border)" }}
                tickLine={{ stroke: "var(--color-border)" }}
              />

              <Tooltip
                contentStyle={{
                  background: "var(--color-popover)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-popover-foreground)",
                  borderRadius: "0.5rem",
                  boxShadow: "0 0 20px rgba(0,0,0,0.3)",
                }}
                labelStyle={{
                  color: "var(--color-primary)",
                  fontWeight: 500,
                }}
                itemStyle={{
                  color: "var(--color-foreground)",
                  fontSize: 13,
                }}
                formatter={(daysCount) => [`${daysCount} بازدید`, "تعداد"]}
              />

              <Line
                type="monotone"
                dataKey="count"
                stroke="var(--color-foreground)"
                strokeWidth={2}
                dot={{
                  r: 5,
                  strokeWidth: 2,
                  stroke: "var(--color-background)",
                  fill: "var(--color-foreground)",
                }}
                activeDot={{
                  r: 7,
                  fill: "var(--color-primary)",
                  stroke: "var(--color-background)",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default memo(ViewChart);
